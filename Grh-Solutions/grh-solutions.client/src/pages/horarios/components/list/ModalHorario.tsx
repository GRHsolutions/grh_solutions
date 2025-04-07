import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@mui/material/Modal";
import GrhCustomSelect from "../../../../generics/grh-generics/inputSelect";
import Groups3Icon from "@mui/icons-material/Groups3";
import LogoutIcon from '@mui/icons-material/Logout';
import {
  IconButton,
  MenuItem,
  Select,
  TextField,
  useTheme,
} from "@mui/material";
import GenericDatePicker from "../../../../generics/grh-generics/inputDatePicker";
import dayjs, { Dayjs } from "dayjs";
import GrhButton from "../../../../generics/grh-generics/button";

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
export default function ModalHorario({
  open,
  handleClose,
}: IModalOptionsProps) {
  const [selectedArea, setSelectedArea] = React.useState(0);
  const [selectedGroup, setSelectedGroup] = React.useState(0);
  const theme = useTheme();
  const [dat, setDat] = React.useState<Dayjs | null>(dayjs());
  const [dat2, setDat2] = React.useState<Dayjs | null>(dayjs());
  const options2 = [
    {
      id2: 1,
      name2: "Grupo principal diurno",
    },
    {
      id2: 2,
      name2: "Grupo principal nocturno",
    },
  ];
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
                  Crea un horario
                </Typography>
                <Typography variant="body2" color={theme.palette.text.primary}>
                  asigna un horario para un grupo ya existente
                </Typography>
              </Box>
            </Box>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box sx={{ mt: 2, display: "flex", gap: 2, alignItems: "center" }}>
            <GrhCustomSelect
              label={"Del Area"}
              options={options.map((item) => ({
                value: item.id,
                name: item.name,
              }))}
              value={selectedArea}
              onChange={(e) => {
                setSelectedArea(e.target.value as number);
              }}
            />
            <GrhCustomSelect
              label={"El grupo"}
              options={options2.map((item) => ({
                value: item.id2,
                name: item.name2,
              }))}
              value={selectedGroup}
              onChange={(e) => {
                setSelectedGroup(e.target.value as number);
              }}
            />
          </Box>
          <Box sx={{ mt: 2, display: "flex", gap: 2, alignItems: "center" }}>
            <GenericDatePicker
              value={dat}
              label={"fecha incial"}
              onChange={setDat} name={""}            />
            <GenericDatePicker
              value={dat2}
              label={"fecha final"}
              onChange={setDat2} name={""}            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-end", height: "64vh", p: 2 }}>
          <GrhButton
            onClick={handleClose}
            startIcon={<LogoutIcon  />}
            label={"publicar horario"}
            variant='principal'
            sx={{
            width: '30%'
            }}
            id={"horario"}
          />
        </Box>
        </Box>
      </Modal>
    </div>
  );
}
