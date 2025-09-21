import { useEffect, useState } from "react";
import GrhGenericTable2 from "../../../generics/grh-generics/tableWrapper2";
import BasicModal from "./Modalvista";
import { Box, CircularProgress } from "@mui/material";
import { Request } from "../../../domain/models/request/request.entities";
import dayjs from "dayjs";
import { http } from "../../../infrastructure/axios/axios"; // ✅ usa tu cliente axios con token

export default function TableSolicitudes() {
  const [current, setCurrent] = useState<Request | null>(null);
  const [solicitudes, setSolicitudes] = useState<Request[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleClose = () => setCurrent(null);

  // 🔹 Cargar solicitudes desde la API
  useEffect(() => {
    const fetchSolicitudes = async () => {
      try {
        setLoading(true);

        // ✅ con http no necesitas meter headers ni token manual
        const response = await http.get<Request[]>("/api/request/getAll");

        const mapped = response.map((sol) => ({
          ...sol,
          createdAt: dayjs(sol.createdAt),
          updatedAt: dayjs(sol.updatedAt),
        }));

        setSolicitudes(mapped);
      } catch (error) {
        console.error("Error al obtener solicitudes", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSolicitudes();
  }, []);

  const onSubmit = (row: Request) => {
    setCurrent(row);
  };

  return (
    <Box sx={{ width: "100%" }}>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <GrhGenericTable2
          maxHeight={"20rem"}
          columns={[
            {
              key: "_id",
              label: "Radicado",
              onRowClick: (value) => onSubmit(value),
              type: "string",
            },
            { key: "title", label: "Título", type: "string" },
            { key: "status", label: "Estado", type: "string" },
            { key: "type_request", label: "Tipo", type: "string" },
            { key: "createdAt", label: "Creado", type: "date" },
            { key: "updatedAt", label: "Actualizado", type: "date" },
          ]}
          data={solicitudes}
          pagination={{
            pageSize: 5,
            totalPages: 1,
            currentPage: 1,
            totalRows: solicitudes.length,
          }}
          onPageChange={(value) => {
            console.log("Cambiando página: ", value);
          }}
        />
      )}
      <BasicModal current={current} handleClose={handleClose} />
    </Box>
  );
}
