import { FC, useEffect, useState } from "react";
import {
  Drawer,
  Box,
  TextField,
  MenuItem,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Contract } from "../../../domain/models/contratos/contratos.entities";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Contract>) => void;
  initialData: Contract | null;
}

const ContratoFormDrawer: FC<Props> = ({ open, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState<Partial<Contract>>({
    title: "",
    estado: "activo",
    perfil_creador: "",
    perfil_empleado: "",
    eps: "",
    estrato: 1,
    start_date: "",
    end_date: "",
    tipo_contrato: "",
    arl: "",
    firma_empleado: "",
    firma_empleador: "",
    vacante: "",
  });

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGuardar = () => {
    onSubmit(formData);
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box
        sx={{
          width: { xs: "100%", sm: 500 },
          padding: 3,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          position: "relative",
        }}
      >
        {/* Botón X */}
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", top: 10, right: 10 }}
        >
          <CloseIcon />
        </IconButton>

        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
          {initialData ? "Editar Contrato" : "Nuevo Contrato"}
        </Typography>

        {/* Campos */}
        <TextField
          label="Título"
          name="title"
          value={formData.title || ""}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          label="Estado"
          name="estado"
          value={formData.estado || ""}
          onChange={handleChange}
          fullWidth
          select
        >
          <MenuItem value="activo">Activo</MenuItem>
          <MenuItem value="terminado">Terminado</MenuItem>
          <MenuItem value="cancelado">Cancelado</MenuItem>
        </TextField>

        <TextField
          label="Perfil Creador (ID)"
          name="perfil_creador"
          value={formData.perfil_creador || ""}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          label="Perfil Empleado (ID)"
          name="perfil_empleado"
          value={formData.perfil_empleado || ""}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          label="EPS"
          name="eps"
          value={formData.eps || ""}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          label="Estrato"
          name="estrato"
          type="number"
          value={formData.estrato || 1}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          label="Fecha Inicio"
          name="start_date"
          type="date"
          value={formData.start_date?.split("T")[0] || ""}
          onChange={handleChange}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          label="Fecha Fin"
          name="end_date"
          type="date"
          value={formData.end_date?.split("T")[0] || ""}
          onChange={handleChange}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          label="Tipo de Contrato (ID)"
          name="tipo_contrato"
          value={formData.tipo_contrato || ""}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          label="ARL"
          name="arl"
          value={formData.arl || ""}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          label="Vacante (ID)"
          name="vacante"
          value={formData.vacante || ""}
          onChange={handleChange}
          fullWidth
        />

        {/* Botones */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
          <Button onClick={onClose} color="error" variant="outlined">
            Cancelar
          </Button>
          <Button onClick={handleGuardar} variant="contained">
            Guardar
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default ContratoFormDrawer;
