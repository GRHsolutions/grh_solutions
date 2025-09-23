import { useState } from "react";
import { Box, Grid2, Modal, Stack, Typography, useTheme } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import CancelIcon from "@mui/icons-material/Cancel";
import CloseIcon from "@mui/icons-material/Close";
import GrhTextField from "../../../generics/grh-generics/textField";
// import GrhCustomSelect from "../../../generics/grh-generics/inputSelect";
// import MultipleSelect from "../../../generics/grh-generics/multipleSelect";
import GrhButton from "../../../generics/grh-generics/button";
import { DragDropInput } from "../../../generics/grh-generics/DragNDrop";
import "../stiles.scss";
import { Formik } from "formik";
import { RequestForm } from "./../../../domain/models/request/request.entities";

const style = {
  position: "absolute",
  top: 0,
  right: 0,
  width: "45%",
  height: "100%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  overflowY: "auto",
  "&:focus": {
    outline: "none",
  },
};

export default function CreatedSolicitudes() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <GrhButton
        label="Crear"
        variant="principal"
        startIcon={<AddCircleOutlineIcon />}
        onClick={handleOpen}
        sx={{ width: "100%" }}
      />
      <CreatedSolicitudesModal handleClose={handleClose} open={open} />
    </div>
  );
}

interface CreatedSolicitudesModalProps {
  handleClose: () => void;
  open: boolean;
}
const CreatedSolicitudesModal = ({
  handleClose,
  open,
}: CreatedSolicitudesModalProps) => {
  const theme = useTheme();

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ ...style }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Box display="flex" alignItems="center" gap={2}>
            <SaveAltIcon sx={{ color: theme.palette.text.primary, mr: 1 }} />
            <Box>
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ color: theme.palette.text.primary, mr: 1 }}
              >
                Crear Solicitud
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Crea una nueva solicitud llenando los espacios obligatorios
              </Typography>
            </Box>
          </Box>
          <CloseIcon
            sx={{ cursor: "pointer", color: "gray" }}
            onClick={handleClose}
          />
        </Box>
        <Formik
          initialValues={
            {
              title: "",
              infoDx: "",
              file: [],
              type_request: "",
              email: "",
            } as RequestForm
          }
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({ values, setFieldValue, handleSubmit }) => {
            return (
              <form>
                <Grid2 spacing={2} container>
                  <Grid2 size={12}>
                    <GrhTextField
                      id="title"
                      label="Titulo"
                      value={values.title}
                      onChange={(e) =>
                        setFieldValue("title", e.target.value || "")
                      }
                      fullWidth
                    />
                  </Grid2>
                  <Grid2 size={12}>
                    {/* <GrhCustomSelect USAR NUEVA TABLA TYPE_REQUEST UNA TABLA DINAMICA.
              label="Tipo de solicitud"
              options={optionstype.map((item) => ({
                value: item.id,
                name: item.name,
              }))}
              value={currentInputSelected}
              onChange={(e) =>
                setCurrentInputSelected(e.target.value as number)
              }
              fullWidth
            /> */}
                  </Grid2>
                  {/* <Grid2 size={6}> PARA ESTOS DOS INPUTS TRAER DE LA TABLA USUARIOS TODOS LOS USUARIOS Y MOSTRARLOS, ESTA TABLA DEBE VERIFICAR SI ES UN EMPLEADO.
            <MultipleSelect
              label="Interesados"
              name="input"
              options={options.map((item) => ({
                id: item.id,
                nombre: item.name,
              }))}
              maxSelections={3}
              value={mult}
              setFieldValue={setFieldValue}
            />
          </Grid2>
          <Grid2 size={6}>
            <GrhCustomSelect
              label="Enviar a..."
              options={options.map((item) => ({
                value: item.id,
                name: item.name,
              }))}
              value={newInputSelected}
              onChange={(e) => setNewInputSelected(e.target.value as number)}
              fullWidth
            />
          </Grid2> */}
                  <Grid2 size={12}>
                    <GrhTextField
                      id="email"
                      label="Correo de seguimiento" // SI NO HAY UN CORREO ESCRITO DEBE MANDAR EL DEL PROPIO USUARIO, ESTO LO MANEJA DESDE EL BACKEND
                      value={values.email}
                      onChange={(e) =>
                        setFieldValue("email", e.target.value || "")
                      }
                      fullWidth
                    />
                  </Grid2>
                  <Grid2 size={12}>
                    <GrhTextField
                      id="infoDx"
                      label="Descripcion"
                      value={values.infoDx}
                      onChange={(e) =>
                        setFieldValue("infoDx", e.target.value || "")
                      }
                      fullWidth
                      multirows
                      rows={4}
                    />
                  </Grid2>
                  <Grid2 size={12}>
                    <DragDropInput
                      acceptedMimeTypes={[
                        "image/jpeg",
                        "image/png",
                        "image/gif",
                        "application/pdf",
                      ]}
                      maxSizeInKB={4000}
                      onFileSelect={(f) => {
                        setFieldValue("file", f);
                      }}
                      selectedFiles={values.file}
                      maxFiles={4}
                    />
                  </Grid2>

                  <Stack
                    direction="row"
                    spacing={2}
                    justifyContent="flex-end"
                    mt={3}
                  >
                    <GrhButton
                      label="Cancelar"
                      variant="secondary"
                      startIcon={<CancelIcon />}
                      onClick={handleClose}
                      p={1}
                    />
                    <GrhButton
                      label="Guardar"
                      variant="principal"
                      type="submit"
                      startIcon={<SaveAltIcon />}
                      onClick={(e) => {
                        e.preventDefault();
                        handleSubmit();
                      }}
                      p={1}
                    />
                  </Stack>
                </Grid2>
              </form>
            );
          }}
        </Formik>
      </Box>
    </Modal>
  );
};
