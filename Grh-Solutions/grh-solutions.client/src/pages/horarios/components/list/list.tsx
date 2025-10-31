import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useHorarios } from "../../../../hooks/horarios";
import GrhGenericTable2 from "../../../../generics/grh-generics/tableWrapper2";
import BasicModal from "./ModalTurno";
import { Horarios } from "../../../../domain/models/horarios/Horarios.entities";
import { useAuth } from "../../../../hooks/auth";
import { getSchedules, getUsersAll } from "../../../../domain/services/horarios/horarios.service";
import { Usuario } from "../../../../domain/models/usuario/user.entities";

export const ListHorario = () => {
  const { pagination, setPagination } = useHorarios();
  const [current, setCurrent] = useState<Horarios | null>(null);
  const [horariosItems, setHorariosItems] = useState<Horarios[]>([]);
  const [reload, setReload] = useState<boolean>(false);
  const { auth } = useAuth();
  const [users, setUsers] = useState<Usuario[]>([]);

  const handleClose = () => setCurrent(null);

  useEffect(() => {
    getSchedules(auth.token).then((res) => {
      setHorariosItems(res.data || []);
      setReload(false);
    });
  }, [reload, auth.token]);

  useEffect(() => {
    getUsersAll(auth.token).then((res) => {
      setUsers(res.data || []);
      setReload(false);

    })
  }, [auth.token]);
  const ChangeCurrentPage = (page: number) => {
    setPagination({
      ...pagination,
      currentPage: page,
    });
  };

  const onSubmit = (horario: Horarios) => {
    setCurrent(horario);
  };

  return (
    <Box width="100%">
      <GrhGenericTable2
        columns={[
          {
            key: "group.name",
            label: "Grupo",
            onRowClick: (value) => onSubmit(value),
            type: "string",
          },
          {
            key: "scheduleType.name",
            label: "Tipo de turno",
            type: "string",
          },
          {
            key: "start_date",
            label: "Fecha de inicio",
            type: "date",
          },
          {
            key: "end_date",
            label: "Fecha de finalización",
            type: "date",
          },
        ]}
        data={horariosItems}
        pagination={pagination}
        onPageChange={ChangeCurrentPage}
        maxHeight="40rem"
      />
      <BasicModal
       current={current} 
       handleClose={handleClose} 
       users={users}
       />
    </Box>
  );
};
