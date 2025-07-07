import {
  Box,
  Grid2,
  IconButton,
  Modal,
  useTheme,
  Paper,
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { SideItems } from "./SideItems";
import React from "react";
import Login from "./cases/login";
import Register from "./cases/register";

interface ModalCompProps {
  open: boolean;
  onClose: () => void;
}

type Tabs = "register" | "login";

export const ModalComp = ({ open, onClose }: ModalCompProps) => {
  const [actual, setActual] = React.useState<Tabs>("login");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));

  const useActual = () => {
    switch (actual) {
      case "login":
        return <Login onRegister={() => setActual("register")} />;
      case "register":
        return <Register onLogin={() => setActual("login")} />;
    }
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: {
      xs: "95vw",
      sm: "90vw", 
      md: "80vw",
      lg: "80vw",
      xl: "80vw"
    },
    maxWidth: "1600px",
    height: {
      xs: "95vh",
      sm: "90vh",
      md: "90vh",
      lg: "90vh"
    },
    maxHeight: "800px",
    outline: "none",
    borderRadius: 3,
    overflow: "hidden",
    boxShadow: theme.shadows[24],
  };

  return (
    <Modal 
      open={open} 
      onClose={onClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper elevation={24} sx={modalStyle}>
        {/* Close Button */}
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            zIndex: 10,
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[2],
            "&:hover": {
              backgroundColor: theme.palette.action.hover,
            },
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* Main Content */}
        <Box sx={{ height: "100%", display: "flex" }}>
          {isMobile ? (
            // Mobile Layout - Stacked
            <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
              {/* Mobile Navigation */}
              <Box
                sx={{
                  borderBottom: `1px solid ${theme.palette.divider}`,
                  backgroundColor: theme.palette.background.default,
                  minHeight: "80px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <SideItems actual={actual} onSelect={setActual} />
              </Box>
              
              {/* Mobile Content */}
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  p: 3,
                  overflow: "auto",
                }}
              >
                {useActual()}
              </Box>
            </Box>
          ) : (
            // Desktop/Tablet Layout - Side by side
            <Grid2 container sx={{ height: "100%", width: "100%" }}>
              {/* Sidebar */}
              <Grid2
                size={isTablet ? 4 : 3.5}
                sx={{
                  backgroundColor: theme.palette.background.default,
                  borderRight: `1px solid ${theme.palette.divider}`,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  minHeight: "100%",
                }}
              >
                <SideItems actual={actual} onSelect={setActual} />
              </Grid2>

              {/* Main Content */}
              <Grid2
                size={isTablet ? 8 : 8.5}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  p: {
                    xs: 2,
                    sm: 3,
                    md: 4,
                  },
                  overflow: "auto",
                  backgroundColor: theme.palette.background.paper,
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    height: '100%',
                    maxWidth: actual === "register" ? "800px" : "500px",
                    overflowY: actual === 'register' ? "auto"  : "hidden",
                    overflowX: "hidden",
                    maxHeight: actual === 'register' ? "600px" : "500px",
                    pt: actual === 'register' ? 2 : undefined,
                  }}
                >
                  {useActual()}
                </Box>
              </Grid2>
            </Grid2>
          )}
        </Box>
      </Paper>
    </Modal>
  );
};