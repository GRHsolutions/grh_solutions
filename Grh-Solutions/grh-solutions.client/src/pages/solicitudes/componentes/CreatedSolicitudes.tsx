import { useState } from "react";
import {
  Box,
  Modal,
  Grid,
  Stack,
  Typography,
  useTheme,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import CancelIcon from "@mui/icons-material/Cancel";
import CloseIcon from "@mui/icons-material/Close";
import GrhTextField from "../../../generics/grh-generics/textField";
import GrhButton from "../../../generics/grh-generics/button";
import { DragDropInput, DragNDropVariables } from "../../../generics/grh-generics/DragNDrop";
import { Formik } from "formik";
import { RequestForm } from "./../../../domain/models/request/request.entities";
import { http } from "../../../infrastructure/axios/axios";
import "../stiles.scss";

const style = {
  position: "absolute" as const,
  top: 0,
  right: 0,
  width: "40%",
  maxWidth: "500px",
  height: "100%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 3,
  overflowY: "auto",
  "&:focus": { outline: "none" },
};

const requestTypes = [
  "Vacaciones",
  "Maternidad",
  "Préstamos",
  "Cita médica",
  "Capacitación",
  "Permiso personal",
  "Reunión especial",
  "Otro",
];

export default function CreatedSolicitudes() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <GrhButton
        label="Crear"
        variant="principal"
        startIcon={<AddCircleOutlineIcon />}
        onClick={() => setOpen(true)}
        sx={{ width: "100%" }}
      />
      <CreatedSolicitudesModal
        open={open}
        handleClose={() => setOpen(false)}
        loading={loading}
        setLoading={setLoading}
      />
    </div>
  );
}

interface CreatedSolicitudesModalProps {
  handleClose: () => void;
  open: boolean;
  setLoading?: (v: boolean) => void;
  loading?: boolean;
}

const CreatedSolicitudesModal = ({
  handleClose,
  open,
  setLoading,
  loading,
}: CreatedSolicitudesModalProps) => {
  const theme = useTheme();

  const handleSubmitForm = async (values: RequestForm) => {
    try {
      setLoading?.(true);

      // 🔹 Perfil logeado
      const rawUserId = localStorage.getItem("usr_items_profile_id");
      const currentUserId = rawUserId ? JSON.parse(rawUserId) : null;

      if (!currentUserId) {
        alert("No se pudo obtener el perfil logueado.");
        return;
      }

      // 🔹 Transformar files a dragNDropSchema
      const mappedFiles = (values.files || []).map((f) => ({
        id: f.id,
        name: f.name,
        type: f.type,
        size: f.size,
        base64: f.base64,
      }));

      const payload = {
        title: values.title,
        type_request: values.type_request,
        infoDx: values.infoDx,
        file: mappedFiles,         // el backend espera "file"
        createdBy: currentUserId,  // ⚠️ obligatorio
        status: "pendiente",
      };

      // 🔹 Crear solicitud
      const newRequest: { _id: string } = await http.post("/api/request/create", payload, { headers: { "Content-Type": "application/json" } });

      if (newRequest._id) {
        // 🔹 Crear involved automáticamente
        await http.post("/api/involved/create", {
          requestId: newRequest._id,
          profileId: currentUserId,
          assignedBy: currentUserId,
          role: "peticionante",
        }, { headers: { "Content-Type": "application/json" } });

        await http.post("/api/history", {
          requestId: newRequest._id,
          profileId: currentUserId,
          description: "Se creó la solicitud",
          createdAt: new Date().toISOString(),
        }, { headers: { "Content-Type": "application/json" } });
      }

      alert("Solicitud creada correctamente");
      handleClose();

      // 🔹 Recargar página completa
      window.location.reload();
    } catch (err: any) {
      console.error("Error al crear solicitud:", err);
      alert(err?.message || "Error al crear la solicitud");
    } finally {
      setLoading?.(false);
    }
  };


  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ ...style }}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Box display="flex" alignItems="center" gap={2}>
            <SaveAltIcon sx={{ color: theme.palette.text.primary }} />
            <Box>
              <Typography variant="h6" fontWeight="bold" sx={{ color: theme.palette.text.primary }}>
                Crear Solicitud
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Completa los campos obligatorios para enviar tu solicitud
              </Typography>
            </Box>
          </Box>
          <CloseIcon sx={{ cursor: "pointer", color: "gray" }} onClick={handleClose} />
        </Box>

        {/* Formik Form */}
        <Formik
          initialValues={{
            title: "",
            type_request: "",
            infoDx: "",
            files: [],
          } as unknown as RequestForm}
          onSubmit={handleSubmitForm}
        >
          {({ values, setFieldValue, handleSubmit }) => (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <GrhTextField
                    id="title"
                    label="Título"
                    value={values.title}
                    onChange={(e) => setFieldValue("title", e.target.value)}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="type_request_label">Tipo de solicitud</InputLabel>
                    <Select
                      labelId="type_request_label"
                      id="type_request"
                      value={values.type_request}
                      onChange={(e) => setFieldValue("type_request", e.target.value)}
                    >
                      {requestTypes.map((type) => (
                        <MenuItem key={type} value={type}>
                          {type}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <GrhTextField
                    id="infoDx"
                    label="Descripción"
                    value={values.infoDx}
                    onChange={(e) => setFieldValue("infoDx", e.target.value)}
                    fullWidth
                    multirows
                    rows={4}
                  />
                </Grid>

                <Grid item xs={12}>
                  <DragDropInput
                    acceptedMimeTypes={["image/jpeg", "image/png", "image/gif", "application/pdf"]}
                    maxSizeInKB={4000}
                    onFileSelect={(files: DragNDropVariables[]) => setFieldValue("files", files)}
                    selectedFiles={values.files}
                    maxFiles={4}
                  />
                </Grid>

                {/* Buttons */}
                <Grid item xs={12}>
                  <Stack direction="row" spacing={2} justifyContent="flex-end">
                    <GrhButton
                      label="Cancelar"
                      variant="secondary"
                      startIcon={<CancelIcon />}
                      onClick={handleClose}
                      p={1}
                    />
                    <GrhButton
                      label={loading ? "Guardando..." : "Guardar"}
                      variant="principal"
                      type="submit"
                      startIcon={<SaveAltIcon />}
                      disabled={loading}
                      p={1}
                    />
                  </Stack>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};
