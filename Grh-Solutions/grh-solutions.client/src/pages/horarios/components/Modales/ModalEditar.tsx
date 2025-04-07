import { Box, Modal, Typography } from "@mui/material";
import React from "react";
import DateRangeIcon from "@mui/icons-material/DateRange";
import GrhCustomSelect from "../../../../generics/grh-generics/inputSelect";
import dayjs, { Dayjs } from "dayjs";
import GenericDatePicker from "../../../../generics/grh-generics/inputDatePicker";
import GrhTextField from "../../../../generics/grh-generics/textField";
import GrhButton from "../../../../generics/grh-generics/button";
import LogoutIcon from '@mui/icons-material/Logout';

const style = {
  position: "absolute",
  top: 0,
  right: 0,
  width: "38%",
  height: "100%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  overflowY: "auto",
  "&:focus": {
    outline: "none",
  },
};

interface EditarDetalle {
  handleClose: () => void;
}

export const EditarDetalle = ({ handleClose }: EditarDetalle) => {
  const [currentInputSelected, setCurrentInputSelected] = React.useState(0);
  const [selectedGroup, setSelectedGroup] = React.useState(0);
  const [dat, setDat] = React.useState<Dayjs | null>(dayjs());
  const [dat2, setDat2] = React.useState<Dayjs | null>(dayjs());
  const [text, setText] = React.useState("");
  const [text2, setText2] = React.useState("");

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
    <Modal open={true} onClose={handleClose}>
      <Box sx={style}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <DateRangeIcon></DateRangeIcon>
          <Box>
            <Typography variant="h6" fontWeight={"bold"} mt={"3"}>
              Editar Horario
            </Typography>
            <Typography variant="body1" mt={"-6"}>
              Editar el horario, al guardar cambios se notificaran a los
              empleados
            </Typography>
          </Box>
        </Box>
        <Box sx={{ mt: 2, display: "flex", gap: 2, alignItems: "center" }}>
          <GrhCustomSelect
            label={"Del Area"}
            options={options.map((item) => ({
              value: item.id,
              name: item.name,
            }))}
            value={currentInputSelected}
            onChange={(e) => {
              setCurrentInputSelected(e.target.value as number);
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
        <Box sx={{ mt: 0.1, display: "flex", gap: 2, alignItems: "center" }}>
          <GenericDatePicker
            sx={{
              width: "50%",
            }}
            value={dat}
            label={"fecha incial"}
            onChange={setDat}
          />
          <GenericDatePicker
            sx={{
              width: "50%",
            }}
            value={dat2}
            label={"fecha final"}
            onChange={setDat2}
          />
        </Box>
        <Box sx={{ mt: 2, display: "flex", gap: 2, alignItems: "center" }}>
          <GrhTextField
            sx={{
              width: "50%",
            }}
            label="Hora Inicial"
            value={text}
            onChange={(e) => {
              setText(e.target.value || "");
            }}
          />
          <GrhTextField
            sx={{
              width: "50%",
            }}
            label="Hora Final"
            value={text2}
            onChange={(e) => {
              setText2(e.target.value || "");
            }}
          />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-end", height: "58vh", p: 2 }}>
          <GrhButton
            onClick={handleClose}
            startIcon={<LogoutIcon  />}
            label={"Editar Horario"}
            variant='principal'
            sx={{
            width: '30%'
            }}
            id={"horario"}
          />
        </Box>
      </Box>
    </Modal>
  );
};
