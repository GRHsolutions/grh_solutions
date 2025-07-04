import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Groups3Icon from "@mui/icons-material/Groups3";
import GrhTextField from "../../../../generics/grh-generics/textField";
import GrhButton from "../../../../generics/grh-generics/button";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  IconButton,
  MenuItem,
  Select,
  TextField,
  useTheme,
} from "@mui/material";
import MultipleSelect from "../../../../generics/grh-generics/multipleSelect";
import GrhCustomSelect from "../../../../generics/grh-generics/inputSelect";

const style = {
  position: "absolute",
  top: 0,
  right: 0,
  width: "45%",
  height: "100%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  overflowY: "auto",
  "&:focus": {
    outline: "none",
  },
};

interface IModalOptionsProps {
  open: boolean;
  handleClose: () => void;
}
export default function ModalGroup({ open, handleClose }: IModalOptionsProps) {
  const theme = useTheme();
  const [areasOptions, setAreasOptions] = React.useState<
    { value: string; name: string }[]
  >([]);
  const [usersOptions, setUsersOptions] = React.useState<
    { value: string; name: string }[]
  >([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token") || "";
      try {
        const [areasRes, usersRes] = await Promise.all([
          fetch("http://localhost:3000/api/area/getAllNoPage", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch("http://localhost:3000/api/user/getAll", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const areas = await areasRes.json();
        const users = await usersRes.json();

        setAreasOptions(
          areas.map((a: any) => ({ value: a._id, name: a.name }))
        );
        setUsersOptions(
          users.map((u: any) => ({
            value: u._id,
            name: `${u.firstName} ${u.middleName} ${u.lastName} ${u.secondLastName}`,
          }))
        );
      } catch (err) {
        console.error("Error cargando áreas o usuarios:", err);
      }
    };

    fetchData();
  }, []); // ← se ejecuta solo al montar el modal

  const [text, setText] = React.useState("");
  const [currentInputSelected, setCurrentInputSelected] =
    React.useState<string>("");
  const [mult, setMult] = React.useState<string[]>([]);
  console.log("usersOptions:", usersOptions);
  console.log("mult:", mult);
  const setFieldValue = (_f: string, v: string[]) => setMult(v);

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/group/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name: text.trim(),
          users: mult.map(String),
          area: String(currentInputSelected),
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        console.error("Error al crear grupo:", data.message);
        return;
      }

      console.log("Grupo creado:", data);
      // Puedes cerrar el modal y limpiar inputs:
      handleClose();
      setText("");
      setMult([]);
      setCurrentInputSelected("");
    } catch (error) {
      console.error("Error al enviar solicitud:", error);
    }
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Groups3Icon
                sx={{ fontSize: 40, color: theme.palette.text.primary }}
              />
              <Box>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  color={theme.palette.text.primary}
                >
                  Crea un nuevo grupo
                </Typography>
                <Typography variant="body2" color={theme.palette.text.primary}>
                  para facilitar la opcion de horarios
                </Typography>
              </Box>
            </Box>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box sx={{ mt: 2, display: "flex", gap: 2, alignItems: "center" }}>
            <GrhTextField
              sx={{ mt: 1.3 }}
              label="Nombre"
              value={text}
              onChange={(e) => {
                setText(e.target.value || "");
              }}
            />
            <GrhCustomSelect
              label="Del Área"
              options={areasOptions}
              value={currentInputSelected}
              onChange={(e) =>
                setCurrentInputSelected(e.target.value as string)
              }
            />
          </Box>
          <Box sx={{ mt: 1 }}>
            {/* <MultipleSelect
              label="Listado de usuarios"
              name="users"
              // options={usersOptions} 
              // value={mult} 
              setFieldValue={setFieldValue}
            /> */}
          </Box>
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
              onClick={handleSubmit}
              startIcon={<LogoutIcon />}
              label={"Enviar solicitud"}
              variant="principal"
              sx={{
                width: "30%",
              }}
              id={"solicitud"}
            />
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
