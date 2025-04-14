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
  width: "40%",
  height: "100%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  overflowY: "auto",
  "&:focus": {
    outline: "none",
  },
};
interface VincularProps {
  open: boolean;
  handleClose: () => void;
}
export default function Vincular({ open, handleClose }: VincularProps) {
  const theme = useTheme();
  const [mult, setMult] = React.useState<number[]>([]);
  const [text, setText] = React.useState("");

  const options = [
    {
      id: 1,
      name: "Martin Rodriguez",
    },
    {
      id: 2,
      name: "Rosalba Salazar",
    },
    {
      id: 3,
      name: "Gemita Mendez",
    },
    {
      id: 4,
      name: "Miguel Ballesteros",
    },
    {
      id: 5,
      name: "Juan Diaz",
    },
  ];
  const setFieldValue = (_field: string, value: number[]) => {
    setMult(value);
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
                  Vincular nuevo usuario.
                </Typography>
                <Typography variant="body2" color={theme.palette.text.primary}>
                  Al vincular un nuevo usuario, se le notificara a los empleados{" "}
                </Typography>
              </Box>
            </Box>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box sx={{ mt: 1 }}>
            <MultipleSelect
              sx={{ mt: 4 }}
              label={"listado de usuarios"}
              name={"input"}
              options={options.map((item) => ({
                id: item.id,
                nombre: item.name,
              }))}
              value={mult}
              setFieldValue={setFieldValue}
            />
          </Box>
          <Box sx={{ mt: 2, display: "flex", gap: 2, alignItems: "center" }}>
            <GrhTextField
              label="justificacxion de la asignacion"
              value={text}
              onChange={(e) => {
                setText(e.target.value || "");
              }}
              sx={{
                width: "100%",
                "& .MuiInputBase-root": {
                  height: "100%",
                },
              }}
            />
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
              onClick={handleClose}
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
