import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import GrhGenericTable2 from "../../generics/grh-generics/tableWrapper2";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { getEmployees } from "../../domain/services/employee/employee.service";
import { useAuth } from "../../hooks/auth";
import { EmpleadoDemo } from "../../domain/models/employee/employee.entities";
import { getRoles } from "../../domain/services/Roles/Roles.service";
import { RolDemo } from "../../domain/models/role/role.entities";
import { getProfileById } from "../../domain/services/profile/profile.service";

const Empleados: React.FC = () => {
  const { auth } = useAuth();
  const [employees, setEmployees] = useState<EmpleadoDemo[]>([]);
  const [roles, setRoles] = useState<RolDemo[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Empleados - GRH Solutions";
    getEmployees(auth.token)
      .then((res) => {
        setEmployees(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [auth.token]);

  useEffect(() => {
    getRoles("", auth.token).then((res) => {
      setRoles(res.data);
    });
  }, [employees]);

  const rows = employees.map((emp) => ({
    _id: emp._id,
    name: emp.user?.email || "Sin nombre",
    area: emp.area?.name || "Sin área",
    puesto: emp.puesto?.name || "Sin puesto",
        rol: roles.find((r) => r._id === emp.user?.rol)?.name || "Sin rol",
    estado: emp.status || "Sin estado",
    activo: emp.user?.isActive ? "Sí" : "No",
    fechaCreacion: dayjs(emp.area?.createdAt).format("YYYY-MM-DD"),
    profile_id: emp.profile_id,
  }));

  return (
    <Box
      sx={{
        flexDirection: "column",
        gap: "30px",
        display: "flex",
        padding: 3,
        justifyContent: "start",
        alignItems: "start",
        height: "100%",
        width: "100%",
      }}
    >
      <Typography variant="h6">Bienvenidos al portal de Empleados</Typography>

      <Box width="100%">
        <GrhGenericTable2
          maxHeight="25rem"
          columns={[
            {
              key: "name",
              label: "Nombre (click para ver perfil)",
              type: "string",
              onRowClick: (row) => navigate(`/user/${row.profile_id}`),
            },
            {
              key: "area",
              label: "Área",
              type: "string",
            },
            {
              key: "puesto",
              label: "Puesto",
              type: "string",
            },
            {
              key: "rol",
              label: "Rol",
              type: "string",
            },
            {
              key: "estado",
              label: "Estado",
              type: "string",
            },
            {
              key: "activo",
              label: "Activo",
              type: "string",
            },
            {
              key: "fechaCreacion",
              label: "Fecha de Creación",
              type: "date",
            },
          ]}
          data={rows}
          pagination={{
            pageSize: 10,
            totalPages: 1,
            currentPage: 1,
            totalRows: employees.length,
          }}
          onPageChange={(page) => {
            console.log("Página:", page);
          }}
        />
      </Box>
    </Box>
  );
};

export default Empleados;
