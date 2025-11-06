import { FC, useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Box
} from "@mui/material";
import { Contract } from "../../../domain/models/contratos/contratos.entities";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Contract>) => void;
  initialData: Contract | null;
}

const ContratoForm: FC<Props> = ({ open, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState<Partial<Contract>>({
    titulo: "",
    tipoContrato: "",
    estado: "activo",
  });

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGuardar = () => {
    onSubmit(formData);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{initialData ? "Editar Contrato" : "Nuevo Contrato"}</DialogTitle>

      <DialogContent dividers>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Título"
            name="titulo"
            value={formData.titulo || ""}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Tipo de Contrato"
            name="tipoContrato"
            value={formData.tipoContrato || ""}
            onChange={handleChange}
            fullWidth
            select
          >
            <MenuItem value="Indefinido">Indefinido</MenuItem>
            <MenuItem value="Fijo">Fijo</MenuItem>
            <MenuItem value="Prestación de Servicios">Prestación de Servicios</MenuItem>
          </TextField>

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
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="error">
          Cancelar
        </Button>
        <Button variant="contained" onClick={handleGuardar}>
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ContratoForm;
