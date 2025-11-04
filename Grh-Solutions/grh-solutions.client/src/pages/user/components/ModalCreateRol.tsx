import {
  Box,
  Typography,
  Modal,
  IconButton,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import GrhTextField from "../../../generics/grh-generics/textField";
import GrhButton from "../../../generics/grh-generics/button";
import { Rol } from "../../../domain/models/role/role.entities";
import { Formik } from "formik";
import { createRol } from "../../../domain/services/Roles/Roles.service";
import React from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  borderRadius: "15px",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: 3,
  border: "2px solid #000",
};
interface IModalCreateRolProps {
  open: boolean;
  handleClose: () => void;
  onJustCreated: (obj: Rol) => void;
}

export default function ModalCreateRol({
  open,
  handleClose,
  onJustCreated,
}: IModalCreateRolProps) {
  const theme = useTheme();
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (v: { name: string }) => {
    setLoading(true);
    await createRol({
      name: v.name,
      permissions: [],
      isActive: true,
      _id: "",
    })
      .then((e) => {
        onJustCreated(e);
        handleClose();
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-title">
      <Box sx={style}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <AddCircleOutlineIcon
              sx={{ fontSize: 30, color: theme.palette.primary.contrastText }}
            />
            <Box>
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ color: theme.palette.primary.contrastText }}
              >
                Crear un nuevo Rol.
              </Typography>
              <Typography
                variant="caption"
                color={theme.palette.primary.contrastText}
              >
                Crea un nuevo rol sin permisos para luego asignarle.
              </Typography>
            </Box>
          </Box>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Formik
          initialValues={{
            name: "",
          }}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Box sx={{ display: "flex", gap: 2 }}>
                <GrhTextField
                  disabled={loading}
                  label="Nombre"
                  fullWidth
                  variant="standard"
                  value={values.name}
                  onChange={(e) => {
                    setFieldValue("name", e.target.value);
                  }}
                />
              </Box>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
              >
                <GrhButton
                  variant="tertiary"
                  startIcon={<ArrowBackIcon />}
                  onClick={handleClose}
                  disabled={loading}
                  label="Cancelar"
                />
                <GrhButton
                  variant="principal"
                  startIcon={<AddCircleOutlineIcon />}
                  sx={{
                    backgroundColor: "#90CAF9",
                    color: "black",
                  }}
                  disabled={loading}
                  label="Guardar"
                  type="submit"
                />
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
}
