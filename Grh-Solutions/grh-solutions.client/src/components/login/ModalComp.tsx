import { Box, IconButton, Modal, useTheme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { SideItems } from "./SideItems";
import React from "react";
import Login from "./cases/login";
import Register from "./cases/register";

interface ModalCompProps {
  open: boolean;
  onClose: () => void;
}

const styleBox = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: "80%", md: "70%", lg: "50%" }, // Ajuste de ancho responsivo
  height: { xs: "90vh", sm: "80vh", md: "70vh" }, // Ajuste de altura responsivo
  bgcolor: "background.paper",
  boxShadow: 24,
  display: "flex",
  flexDirection: { xs: "column", sm: "row" },
  borderRadius: "8px", // Bordes redondeados
  overflow: "hidden", // Evitar desbordamiento
  "&:focus": {
    outline: "none",
  },
};

type Tabs = "register" | "login";

export const ModalComp = ({ open, onClose }: ModalCompProps) => {
  const [actual, setActual] = React.useState<Tabs>("login");
  const theme = useTheme();

  const useActual = () => {
    switch (actual) {
      case "login":
        return <Login onRegister={() => setActual('register')} />;
      case "register":
        return <Register onLogin={() => setActual('login')} />;
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={styleBox}>
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            zIndex: 1,
          }}
        >
          <CloseIcon />
        </IconButton>
        <Box
          sx={{
            width: { xs: "100%", sm: "30%" }, // Ajuste de ancho responsivo
            height: { xs: "auto", sm: "100%" },
            borderRight: { xs: "none", sm: "1px solid #ddd" },
            backgroundColor: theme.palette.background.paper,
            padding: { xs: "16px", sm: "24px" }, // Padding responsivo
          }}
        >
          <SideItems actual={actual} onSelect={setActual} />
        </Box>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: { xs: "16px", sm: "24px" }, // Padding responsivo
          }}
        >
          {useActual()}
        </Box>
      </Box>
    </Modal>
  );
};