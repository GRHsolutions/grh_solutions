import { Box, Modal, Divider, useTheme, Typography } from "@mui/material";
import MultipleSelect from "../../../../generics/grh-generics/multipleSelect";
import GrhButton from '../../../../generics/grh-generics/button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SendIcon from '@mui/icons-material/Send';
import React, { useEffect, useState } from "react";
import { http } from "../../../../infrastructure/axios/axios";
import { InvolvedProfile } from "../../../../domain/models/request/involved.entities";

interface AsignarUsuarioProps {
  handleClose: () => void;
  requestId: string;
  currentUserId: string;
}

const styleasig = {
  position: 'absolute',
  transform: 'translate(-50%, -50%)',
  top: '50%',
  left: '50%',
  width: '50%',
};

export const AsignarUsuario = ({ handleClose, requestId, currentUserId }: AsignarUsuarioProps) => {
  const [profiles, setProfiles] = useState<InvolvedProfile[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();

  // 🔹 Cargar todos los perfiles
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        setLoading(true);
        const res = await http.get<InvolvedProfile[]>("/api/profiles/getAll");
        // En tu backend, la respuesta directa es un array
        setProfiles(res);
      } catch (error) {
        console.error("Error al obtener perfiles", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfiles();
  }, []);

  const handleSave = async () => {
    if (!requestId || selectedIds.length === 0) return;

    try {
      const payload = selectedIds.map((profileId) => ({
        requestId,         // 🔹 Asegúrate de que es un string válido
        profileId,
        assignedBy: currentUserId, // 🔹 Usuario que asigna
        role: "editor",            // Puedes cambiar el rol según la lógica
      }));

      // Enviar cada asignación al backend
      await Promise.all(payload.map(p => http.post("/api/involved/create", p)));

      handleClose();
    } catch (error) {
      console.error("Error al asignar usuarios", error);
    }
  };

  return (
    <Modal open={true} onClose={handleClose}>
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
          <Typography
            variant="h6"
            sx={{ mb: 2, fontWeight: 'bold' }}
          >
            Busque al usuario al que va a asignar la solicitud
          </Typography>

          <Box sx={{ fontSize: 16, textAlign: 'left', color: theme.palette.text.primary, pb: 2 }}>
            <MultipleSelect
              label={'Lista de Usuarios'}
              name={'input'}
              options={profiles.map(item => ({
                id: Number(item._id), // 🔹 MultipleSelect espera números
                nombre: `${item.name} ${item.lastname}`
              }))}
              value={selectedIds.map(id => Number(id))} // 🔹 Convertimos string a number
              setFieldValue={(field, value: number[]) => setSelectedIds(value.map(v => v.toString()))} // 🔹 Guardamos como string
            />
            <Divider sx={{ my: 2, backgroundColor: theme.palette.divider, height: 2 }} />
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <GrhButton
              label="Cancelar"
              variant="secondary"
              startIcon={<ArrowBackIcon />}
              onClick={handleClose}
              sx={{ width: '20%' }}
            />
            <GrhButton
              label="Guardar"
              variant="principal"
              startIcon={<SendIcon />}
              onClick={handleSave}
              sx={{ width: '20%' }}
              disabled={selectedIds.length === 0 || loading}
            />
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
