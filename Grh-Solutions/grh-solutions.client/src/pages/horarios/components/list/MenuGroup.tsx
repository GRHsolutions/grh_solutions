import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Box } from "@mui/material";
import ModalGroup from "./ModalGroup";
import ModalHorario from "./ModalHorario";
import Groups3Icon from "@mui/icons-material/Groups3";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

export default function PositionedMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [modalType, setModalType] = React.useState<string | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleOpenModal = (type: string) => {
    setModalType(type);
    handleClose();
  };
  const handleCloseModal = () => {
    setModalType(null);
  };
  return (
    <div>
      <Button
        sx={{
          backgroundColor: "#ff5722",
          color: "white",
        }}
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        color="primary"
      >
        Crear
      </Button>
      <Menu
        sx={{ mt: 5.5 }}
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Box sx={{ textAlign: "center" }}>Opciones</Box>
        <MenuItem
          onClick={() => handleOpenModal("Group")}
          sx={{           
            gap: 1,
            border: "1px solid #ccc",
            borderRadius: "4px",
            margin: "4px",
            paddingX: "30px",
          }}
        >
          <Groups3Icon></Groups3Icon>
          Grupo
        </MenuItem>
        <MenuItem
          onClick={() => handleOpenModal("Horario")}
          sx={{
            gap: 1,
            border: "1px solid #ccc",
            borderRadius: "4px",
            margin: "4px",
            paddingX: "30px",
          }}
        >
          <CalendarMonthIcon></CalendarMonthIcon>
          Horario
        </MenuItem>
      </Menu>
      {modalType === "Group" && (
        <ModalGroup open={true} handleClose={handleCloseModal} />
      )}
      {modalType === "Horario" && (
        <ModalHorario open={true} handleClose={handleCloseModal} />
      )}
    </div>
  );
}
