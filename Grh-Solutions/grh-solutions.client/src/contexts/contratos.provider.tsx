import React from "react";
import { Errors } from "../domain/models/error/error.entities";
import { PageParams, UseQueryParams } from "../hooks/queryParams";
import { GrhPagination } from "../generics/grh-generics/tableWrapper2";
import { Contracts } from "../domain/models/contratos/contratos.entities";
import dayjs from "dayjs";

interface CurrentProps {
  item: Contracts | null;
  action: "create" | "view" | "delete" | "none" | string;
}

// Definición de tipos
interface ContratosItems {
  Contratos: Contracts[];
  status: Errors | null;
  reload: () => void;
  current: CurrentProps;
  setCurrent: (select: CurrentProps) => void;
  params: PageParams;
  pagination: GrhPagination;
  setPagination: (pag: GrhPagination) => void;
}

// Creación del contexto
export const ContratosContext = React.createContext<ContratosItems | undefined>(
  undefined
);

// Proveedor del contexto
export const ContratosProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [Contratos, setContratos] = React.useState<Contracts[]>([]);
  const [status, setStatus] = React.useState<Errors | null>(null);
  const [useReload, setReload] = React.useState(false);
  const [current, setCurrent] = React.useState<CurrentProps>({
    item: null,
    action: "none"
  });
  const [param, setParam] = React.useState<PageParams>({
    type: undefined,
    action: undefined,
    id: undefined
  });
  const [pagination, setPagination] = React.useState<GrhPagination>({
    currentPage: 0,
    totalPages: 10,
    totalRows: 100,
    pageSize: 2
  });

  const { queryParams } = UseQueryParams();

  React.useEffect(() => {
    setParam({
      type: queryParams["type"],
      action: queryParams["action"],
      id: queryParams["id"] ? parseInt(queryParams["id"]) : undefined
    });
  }, [queryParams]);

  React.useEffect(() => {
    if(param.id && param.action){
      //BUSCAR POR EL ID
      setCurrent({
        item: null,
        action: param.action || "none"
      })
    }
    
  }, [param]);

  React.useEffect(() => {
      const fetchContratos = async () => {
        try {
          setContratos([
            {
              id: "1",
              title: "Contrato laboral para un egresado del sena",
              contractType: "laboral",
              createdAt: dayjs('02-02-2010'),
              involved: []
            }
          ]);
        } catch (error) {
          setStatus({ statusCode: 500, message: "Error al cargar los contratos" });
        }
      };
    fetchContratos();
  }, [useReload]);

  const handleReload = () => {
    setReload(!useReload);
  };

  const SelectItem = (sel: CurrentProps) => {
    setCurrent(sel);
  };

  const value: ContratosItems = {
    Contratos: Contratos,
    status,
    reload: handleReload,
    current: current,
    setCurrent: SelectItem,
    params: param,
    pagination: pagination,
    setPagination: setPagination
  };

  return <ContratosContext.Provider value={value}>{children}</ContratosContext.Provider>;
};
