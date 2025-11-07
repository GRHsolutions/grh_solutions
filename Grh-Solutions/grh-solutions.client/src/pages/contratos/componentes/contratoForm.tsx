import { FC, useEffect, useState } from "react";
import {
  Drawer,
  Box,
  TextField,
  MenuItem,
  Button,
  Typography,
  IconButton,
  Select,
  InputLabel,
  FormControl,
  Chip,
  Divider,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Contract, TypeContract, Vacancy } from "../../../domain/models/contratos/contratos.entities";
import { Usuario } from "../../../domain/models/usuario/user.entities";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Contract>) => void;
  initialData: Contract | null;
  // Props para recibir los datos desde el componente padre
  perfiles?: Usuario[];
  tiposContrato?: TypeContract[];
  vacantes?: Vacancy[];
  // Opcional: loading state
  isLoading?: boolean;
}

const ContratoFormDrawer: FC<Props> = ({ 
  open, 
  onClose, 
  onSubmit, 
  initialData,
  perfiles = [],
  tiposContrato = [],
  vacantes = [],
  isLoading = false
}) => {
  const [formData, setFormData] = useState<Partial<Contract>>({
    title: "",
    estado: "borrador",
    perfil_creador: undefined,
    perfil_empleado: undefined,
    eps: "",
    estrato: 1,
    start_date: "",
    end_date: "",
    tipo_contrato: undefined,
    arl: "",
    firma_empleado: "",
    firma_empleador: "",
    vacante: undefined,
  });

  // Estado para almacenar los IDs seleccionados
  const [selectedIds, setSelectedIds] = useState({
    perfil_creador: "",
    perfil_empleado: "",
    tipo_contrato: "",
    vacante: "",
  });

  // 🔹 Cargar datos iniciales cuando se edita un contrato
  useEffect(() => {
    if (initialData) {
      // Extrae los IDs de los objetos anidados
      const perfilCreadorId = typeof initialData.perfil_creador === 'object' 
        ? initialData.perfil_creador?._id || ""
        : initialData.perfil_creador || "";

      const perfilEmpleadoId = typeof initialData.perfil_empleado === 'object'
        ? initialData.perfil_empleado?._id || ""
        : initialData.perfil_empleado || "";

      const tipoContratoId = typeof initialData.tipo_contrato === 'object'
        ? initialData.tipo_contrato?._id || ""
        : initialData.tipo_contrato || "";

      const vacanteId = typeof initialData.vacante === 'object'
        ? initialData.vacante?._id || ""
        : initialData.vacante || "";

      setSelectedIds({
        perfil_creador: perfilCreadorId,
        perfil_empleado: perfilEmpleadoId,
        tipo_contrato: tipoContratoId,
        vacante: vacanteId,
      });

      // Formatear fechas para el input type="date"
      const formatDate = (date: any) => {
        if (!date) return "";
        const d = new Date(date);
        return d.toISOString().split('T')[0];
      };

      setFormData({
        ...initialData,
        start_date: formatDate(initialData.start_date),
        end_date: formatDate(initialData.end_date),
        perfil_creador: initialData.perfil_creador,
        perfil_empleado: initialData.perfil_empleado,
        tipo_contrato: initialData.tipo_contrato,
        vacante: initialData.vacante,
      });
    } else {
      // Resetear el formulario si no hay datos iniciales
      setFormData({
        title: "",
        estado: "borrador",
        perfil_creador: undefined,
        perfil_empleado: undefined,
        eps: "",
        estrato: 1,
        start_date: "",
        end_date: "",
        tipo_contrato: undefined,
        arl: "",
        firma_empleado: "",
        firma_empleador: "",
        vacante: undefined,
      });
      setSelectedIds({
        perfil_creador: "",
        perfil_empleado: "",
        tipo_contrato: "",
        vacante: "",
      });
    }
  }, [initialData, open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: keyof typeof selectedIds, value: string) => {
    setSelectedIds({ ...selectedIds, [name]: value });
  };

  const handleGuardar = () => {
    // Preparar los datos para enviar al API
    // Solo enviar IDs, no los objetos completos
    const dataToSubmit: any = {
      ...formData,
      perfil_creador: selectedIds.perfil_creador || undefined,
      perfil_empleado: selectedIds.perfil_empleado || undefined,
      tipo_contrato: selectedIds.tipo_contrato || undefined,
      vacante: selectedIds.vacante || undefined,
    };

    // Eliminar campos que son objetos completos (el API espera IDs)
    if (typeof dataToSubmit.perfil_creador === 'object') {
      dataToSubmit.perfil_creador = selectedIds.perfil_creador;
    }
    if (typeof dataToSubmit.perfil_empleado === 'object') {
      dataToSubmit.perfil_empleado = selectedIds.perfil_empleado;
    }
    if (typeof dataToSubmit.tipo_contrato === 'object') {
      dataToSubmit.tipo_contrato = selectedIds.tipo_contrato;
    }
    if (typeof dataToSubmit.vacante === 'object') {
      dataToSubmit.vacante = selectedIds.vacante;
    }

    onSubmit(dataToSubmit);
  };

  // Función para mostrar información del perfil seleccionado
  const renderPerfilInfo = (perfilId: string) => {
    const perfil = perfiles.find(p => p._id === perfilId);
    if (!perfil) return null;
    
    return (
      <Box sx={{ mt: 1, p: 1, bgcolor: 'grey.100', borderRadius: 1 }}>
        <Typography variant="caption" color="text.secondary">
          Email: {perfil.email}
        </Typography>
        <br />
        <Typography variant="caption" color="text.secondary">
          Documento: {perfil.document}
        </Typography>
      </Box>
    );
  };

  // Función para mostrar información de la vacante seleccionada
  const renderVacanteInfo = (vacanteId: string) => {
    const vacante = vacantes.find(v => v._id === vacanteId);
    if (!vacante) return null;
    
    return (
      <Box sx={{ mt: 1, p: 1, bgcolor: 'grey.100', borderRadius: 1 }}>
        <Typography variant="caption" color="text.secondary">
          Descripción: {vacante.description || 'N/A'}
        </Typography>
        <br />
        <Typography variant="caption" color="text.secondary">
          Salario: {vacante.salary || 'N/A'}
        </Typography>
        <br />
        <Typography variant="caption" color="text.secondary">
          Modalidad: {vacante.type_modality || 'N/A'}
        </Typography>
      </Box>
    );
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box
        sx={{
          width: { xs: "100%", sm: 550 },
          padding: 3,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          position: "relative",
          overflowY: "auto",
        }}
      >
        {/* Botón cerrar */}
        <IconButton 
          onClick={onClose} 
          sx={{ position: "absolute", top: 10, right: 10, zIndex: 1 }}
        >
          <CloseIcon />
        </IconButton>

        <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }}>
          {initialData ? "Editar Contrato" : "Nuevo Contrato"}
        </Typography>

        {initialData && (
          <Alert severity="info" sx={{ mb: 2 }}>
            ID: {initialData._id}
          </Alert>
        )}

        <Divider sx={{ mb: 1 }}>Información General</Divider>

        {/* Título */}
        <TextField
          label="Título del Contrato"
          name="title"
          value={formData.title || ""}
          onChange={handleChange}
          fullWidth
          required
        />

        {/* Estado */}
        <TextField
          label="Estado"
          name="estado"
          value={formData.estado || "borrador"}
          onChange={handleChange}
          fullWidth
          select
          required
        >
          <MenuItem value="borrador">Borrador</MenuItem>
          <MenuItem value="activo">Activo</MenuItem>
          <MenuItem value="terminado">Terminado</MenuItem>
          <MenuItem value="cancelado">Cancelado</MenuItem>
        </TextField>

        <Divider sx={{ my: 1 }}>Partes del Contrato</Divider>

        {/* Perfil creador */}
        <FormControl fullWidth required>
          <InputLabel>Perfil Creador (Empleador)</InputLabel>
          <Select
            name="perfil_creador"
            value={selectedIds.perfil_creador}
            onChange={(e) => handleSelectChange("perfil_creador", e.target.value)}
            label="Perfil Creador (Empleador)"
          >
            <MenuItem value="">
              <em>Seleccione un perfil</em>
            </MenuItem>
            {perfiles.map((p) => (
              <MenuItem key={p._id} value={p._id}>
                {p.name} {p.lastname} - {p.document}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {selectedIds.perfil_creador && renderPerfilInfo(selectedIds.perfil_creador)}

        {/* Perfil empleado */}
        <FormControl fullWidth required>
          <InputLabel>Perfil Empleado</InputLabel>
          <Select
            name="perfil_empleado"
            value={selectedIds.perfil_empleado}
            onChange={(e) => handleSelectChange("perfil_empleado", e.target.value)}
            label="Perfil Empleado"
          >
            <MenuItem value="">
              <em>Seleccione un perfil</em>
            </MenuItem>
            {perfiles.map((p) => (
              <MenuItem key={p._id} value={p._id}>
                {p.name} {p.lastname} - {p.document}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {selectedIds.perfil_empleado && renderPerfilInfo(selectedIds.perfil_empleado)}

        <Divider sx={{ my: 1 }}>Tipo de Contrato y Vacante</Divider>

        {/* Tipo de contrato */}
        <FormControl fullWidth required>
          <InputLabel>Tipo de Contrato</InputLabel>
          <Select
            name="tipo_contrato"
            value={selectedIds.tipo_contrato}
            onChange={(e) => handleSelectChange("tipo_contrato", e.target.value)}
            label="Tipo de Contrato"
          >
            <MenuItem value="">
              <em>Seleccione un tipo</em>
            </MenuItem>
            {tiposContrato.map((t) => (
              <MenuItem key={t._id} value={t._id}>
                {t.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {selectedIds.tipo_contrato && (
          <Box sx={{ mt: 1, p: 1, bgcolor: 'grey.100', borderRadius: 1 }}>
            <Typography variant="caption" color="text.secondary">
              {tiposContrato.find(t => t._id === selectedIds.tipo_contrato)?.description || ''}
            </Typography>
          </Box>
        )}

        {/* Vacante */}
        <FormControl fullWidth>
          <InputLabel>Vacante Asociada</InputLabel>
          <Select
            name="vacante"
            value={selectedIds.vacante}
            onChange={(e) => handleSelectChange("vacante", e.target.value)}
            label="Vacante Asociada"
          >
            <MenuItem value="">
              <em>Sin vacante</em>
            </MenuItem>
            {vacantes.map((v) => (
              <MenuItem key={v._id} value={v._id}>
                {v.tittle}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {selectedIds.vacante && renderVacanteInfo(selectedIds.vacante)}

        <Divider sx={{ my: 1 }}>Información Laboral</Divider>

        {/* EPS */}
        <TextField
          label="EPS"
          name="eps"
          value={formData.eps || ""}
          onChange={handleChange}
          fullWidth
          required
        />

        {/* ARL */}
        <TextField
          label="ARL"
          name="arl"
          value={formData.arl || ""}
          onChange={handleChange}
          fullWidth
          required
        />

        {/* Estrato */}
        <TextField
          label="Estrato"
          name="estrato"
          type="number"
          value={formData.estrato || 1}
          onChange={handleChange}
          fullWidth
          inputProps={{ min: 1, max: 6 }}
        />

        <Divider sx={{ my: 1 }}>Fechas</Divider>

        {/* Fecha Inicio */}
        <TextField
          label="Fecha de Inicio"
          name="start_date"
          type="date"
          value={formData.start_date || ""}
          onChange={handleChange}
          fullWidth
          required
          InputLabelProps={{ shrink: true }}
        />

        {/* Fecha Fin */}
        <TextField
          label="Fecha de Fin (opcional)"
          name="end_date"
          type="date"
          value={formData.end_date || ""}
          onChange={handleChange}
          fullWidth
          InputLabelProps={{ shrink: true }}
          helperText="Dejar vacío para contratos indefinidos"
        />

        {initialData?.firma_empleado && (
          <>
            <Divider sx={{ my: 1 }}>Firmas</Divider>
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Firma del Empleado
              </Typography>
              <Box
                component="img"
                src={initialData.firma_empleado}
                alt="Firma Empleado"
                sx={{
                  width: '100%',
                  maxHeight: 150,
                  objectFit: 'contain',
                  border: '1px solid',
                  borderColor: 'grey.300',
                  borderRadius: 1,
                  bgcolor: 'white',
                }}
              />
            </Box>
          </>
        )}

        {initialData?.firma_empleador && (
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Firma del Empleador
            </Typography>
            <Box
              component="img"
              src={initialData.firma_empleador}
              alt="Firma Empleador"
              sx={{
                width: '100%',
                maxHeight: 150,
                objectFit: 'contain',
                border: '1px solid',
                borderColor: 'grey.300',
                borderRadius: 1,
                bgcolor: 'white',
              }}
            />
          </Box>
        )}

        {/* Botones */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3, gap: 2 }}>
          <Button 
            onClick={onClose} 
            color="error" 
            variant="outlined"
            fullWidth
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleGuardar} 
            variant="contained"
            fullWidth
            disabled={isLoading}
          >
            {isLoading ? "Guardando..." : "Guardar"}
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default ContratoFormDrawer;