import React from "react";
import { Errors } from "../domain/models/error/error.entities";
import dayjs from "dayjs";
import { PageParams, UseQueryParams } from "../hooks/queryParams";
import { GrhPagination } from "../generics/grh-generics/tableWrapper2";

interface CurrentProps {
  item: Contratos | null;
  action: "create" | "view" | "delete" | "none" | string;
}

// Definición de tipos
interface ContratosItems {
  Contratos: Contratos[];
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
  const [Contratos, setContratos] = React.useState<Contratos[]>([]);
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
              id: 1,
              tipoContrato: {
                id: 1,
                nombre: "Contrato de trabajo",
                descripcion: "Contrato de trabajo",
                horaInicial: "08:00",
                horaFinal: "17:00",
              },
              fechaInicio: dayjs("2021-03-20"),
              fechaFin: dayjs("2021-03-28"),
              creadoPor: {
                id: 1,
                primerNombre: "Pedro",
                segundoNombre: "Pedro",
                primerApellido: "",
                segundoApellido: "",
                correo: "pedro.sanchez@gmail.com",
                photo: null,
                area: {
                  id: 41,
                  nombre: "Contabilidad"
                }
              },
              grupo: {
                id: 1,
                nombre: "Turno diurno",
                usuarios: [
                  {
                    id: 1,
                    primerNombre: "Pedro",
                    segundoNombre: "Pedro",
                    primerApellido: "",
                    segundoApellido: "",
                    correo: "",
                    photo: null,
                    area: {
                      id: 41,
                      nombre: "Contabilidad"
                    }
                  }
                ]
              }
            }
          ]);
        } catch (error) {
          setStatus({ statusCode: 500, message: "Error al cargar las noticias" });
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
