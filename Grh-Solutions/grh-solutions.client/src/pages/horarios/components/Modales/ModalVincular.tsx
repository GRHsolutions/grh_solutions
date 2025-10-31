import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Groups3Icon from "@mui/icons-material/Groups3";
import GrhTextField from "../../../../generics/grh-generics/textField";
import GrhButton from "../../../../generics/grh-generics/button";
import LogoutIcon from "@mui/icons-material/Logout";
import { Grid2, IconButton, useTheme } from "@mui/material";
import MultipleSelect from "../../../../generics/grh-generics/multipleSelect";
import { Usuario } from "../../../../domain/models/usuario/user.entities";
import { putGroup } from "../../../../domain/services/grupos/grupos.service";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../../../hooks/auth";
import { UpdateGroupDto } from "../../../../domain/models/group/group.entities";

const style = {
  position: "absolute",
  top: 0,
  right: 0,
  width: "40%",
  height: "100%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  overflowY: "auto",
  "&:focus": { outline: "none" },
};

interface VincularProps {
  open: boolean;
  handleClose: () => void;
  users: Usuario[];
  groupId: string; // 👈 id del grupo actual
  areaId: string; // 👈 área asociada
  groupName: string; // 👈 nombre del grupo actual
}

export default function Vincular({
  open,
  handleClose,
  users,
  groupId,
  areaId,
  groupName,
}: VincularProps) {
  const theme = useTheme();
  const { auth } = useAuth();

  const formik = useFormik({
    initialValues: {
      userIds: [] as string[],
      observaciones: "",
    },
    validationSchema: Yup.object({
      userIds: Yup.array().min(1, "Debes seleccionar al menos un usuario"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        await Promise.all(
          values.userIds.map((userId) => {
            const payload: UpdateGroupDto = {
              name: groupName,
              userId,
              area: areaId,
            };
            return putGroup(groupId, payload, auth.token);
          })
        );

        alert("Usuarios vinculados correctamente ✅");
        resetForm();
        handleClose();
      } catch (error) {
        console.error(error);
        alert("Error al vincular los usuarios ❌");
      }
    },
  });

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {/* Encabezado */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Groups3Icon sx={{ fontSize: 40, color: theme.palette.text.primary }} />
            <Box>
              <Typography variant="h6" fontWeight="bold" color={theme.palette.text.primary}>
                Vincular nuevo usuario
              </Typography>
              <Typography variant="body2" color={theme.palette.text.primary}>
                Al vincular un nuevo usuario, se notificará a los empleados.
              </Typography>
            </Box>
          </Box>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Selector de usuarios */}
        <Box sx={{ mt: 4 }}>
          <MultipleSelect
            sx={{ mt: 2 }}
            label="Listado de usuarios"
            name="userIds"
            options={users.map((item, index) => ({
              id: index,
              nombre: `${item.primerNombre || ""} ${item.primerApellido || ""} (${item.email})`,
            }))}
            value={formik.values.userIds}
            setFieldValue={formik.setFieldValue}
            error={formik.errors.userIds as string}
            touched={formik.touched.userIds}
          />
        </Box>

        {/* Campo de observaciones */}
        <Box sx={{ mt: 4, width: "100%" }}>
          <Grid2 size={12}>
            <GrhTextField
              label="Observaciones"
              name="observaciones"
              value={formik.values.observaciones}
              rows={4}
              multirows
              onChange={formik.handleChange}
              sx={{
                width: "100%",
                "& .MuiInputBase-root": {
                  height: "100%",
                },
              }}
            />
          </Grid2>
        </Box>

        {/* Botón enviar */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-end",
            height: "64vh",
            p: 2,
          }}
        >
          <GrhButton
            onClick={formik.handleSubmit}
            startIcon={<LogoutIcon />}
            label="Enviar solicitud"
            variant="principal"
            sx={{ width: "30%" }}
            id="solicitud"
          />
        </Box>
      </Box>
    </Modal>
  );
}
