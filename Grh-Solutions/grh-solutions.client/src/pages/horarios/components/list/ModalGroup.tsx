import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Groups3Icon from "@mui/icons-material/Groups3";
import GrhTextField from '../../../../generics/grh-generics/textField';
import GrhButton from "../../../../generics/grh-generics/button";
import LogoutIcon from '@mui/icons-material/Logout';
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
  const [text, setText] = React.useState("");
  const [currentInputSelected, setCurrentInputSelected] = React.useState(0);
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
  const [mult, setMult] = React.useState<number[]>([]);
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
          <Box sx={{  mt:2, display: "flex", gap: 2, alignItems: "center" }}>
          <GrhTextField sx={{mt:1.3}}
            label='Nombre'
            value={text}
            onChange={(e) => {
              setText(e.target.value || "");
            }}
          />
          <GrhCustomSelect 
            label={"Del Area"} 
            options={options.map(item => ({
              value: item.id, 
              name: item.name
            }))} 
            value={currentInputSelected} 
            onChange={(e) => {
              setCurrentInputSelected(e.target.value as number);
            }}
          />
          </Box>
          <Box sx={{mt: 1}}>
            <MultipleSelect sx={{mt: 4}}
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
          <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-end", height: "64vh", p: 2 }}>
          <GrhButton
            onClick={handleClose}
            startIcon={<LogoutIcon  />}
            label={"Enviar solicitud"}
            variant='principal'
            sx={{
            width: '30%'
            }}
            id={"solicitud"}
          />
        </Box>
        </Box>
      </Modal>
    </div>
  );
}
