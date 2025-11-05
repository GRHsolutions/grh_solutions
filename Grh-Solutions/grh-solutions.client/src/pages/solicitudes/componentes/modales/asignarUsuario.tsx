import { Box, Modal, Divider, useTheme, Typography } from "@mui/material";
import MultipleSelect from "../../../../generics/grh-generics/multipleSelect";
import GrhButton from "../../../../generics/grh-generics/button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SendIcon from "@mui/icons-material/Send";
import React, { useEffect, useState } from "react";
import { http } from "../../../../infrastructure/axios/axios";
import { InvolvedProfile } from "../../../../domain/models/request/involved.entities";

interface AsignarUsuarioProps {
  open: boolean;
  handleClose: () => void;
  requestId: string;
  onSaved?: () => void; // callback opcional después de guardar
}

const styleasig = {
  position: "absolute",
  transform: "translate(-50%, -50%)",
  top: "50%",
  left: "50%",
  width: "50%",
};

export const AsignarUsuario = ({ open, handleClose, requestId, onSaved }: AsignarUsuarioProps) => {
  const [profiles, setProfiles] = useState<InvolvedProfile[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();

  // 🔹 Traer perfiles disponibles
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        setLoading(true);
        const res = await http.get<InvolvedProfile[]>("/api/profiles/getAll");
        setProfiles(res); // res ya es un array de perfiles
      } catch (error) {
        console.error("❌ Error al obtener perfiles", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfiles();
  }, []);

  const handleSave = async () => {
    const rawUserId = localStorage.getItem("usr_items_profile_id");
    const currentUserId = rawUserId ? JSON.parse(rawUserId) : null;

    if (!requestId || !currentUserId || selectedIds.length === 0) {
      console.warn("⚠️ Datos insuficientes para asignar usuarios");
      return;
    }

    const payload = selectedIds.map((profileId) => ({
      requestId,
      profileId,
      assignedBy: currentUserId,
      role: "editor",
    }));

    try {
      await Promise.all(payload.map((p) => http.post("/api/involved/create", p)));
      console.log("✅ Usuarios asignados correctamente");

      // 🔹 Recargar involucrados en el padre
      if (onSaved) onSaved();

      handleClose();
    } catch (error) {
      console.error("❌ Error al asignar usuarios", error);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ ...styleasig }}>
        <Box
          onClick={(e) => e.stopPropagation()}
          sx={{
            backgroundColor: theme.palette.background.paper,
            borderRadius: 2,
            padding: 4,
            boxShadow: 3,
            color: theme.palette.text.primary,
          }}
        >
          <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
            Busque al usuario al que va a asignar la solicitud
          </Typography>

          <Box
            sx={{
              fontSize: 16,
              textAlign: "left",
              color: theme.palette.text.primary,
              pb: 2,
            }}
          >
            <MultipleSelect
              label="Lista de Usuarios"
              name="input"
              options={profiles.map((item, index) => ({
                id: index, // índice numérico
                nombre: `${item.name} ${item.lastname}`,
              }))}
              value={selectedIds.map((id) => profiles.findIndex((p) => p._id === id))} // string → index
              setFieldValue={(field, value: number[]) =>
                setSelectedIds(value.map((i) => profiles[i]._id)) // index → string
              }
            />
            <Divider sx={{ my: 2, backgroundColor: theme.palette.divider, height: 2 }} />
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <GrhButton
              label="Cancelar"
              variant="secondary"
              startIcon={<ArrowBackIcon />}
              onClick={handleClose}
              sx={{ width: "20%" }}
            />
            <GrhButton
              label="Guardar"
              variant="principal"
              startIcon={<SendIcon />}
              onClick={handleSave}
              sx={{ width: "20%" }}
              disabled={selectedIds.length === 0 || loading}
            />
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
