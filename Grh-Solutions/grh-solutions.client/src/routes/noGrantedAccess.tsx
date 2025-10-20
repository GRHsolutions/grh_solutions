import { Box, Button, Modal, Typography, Fade, useTheme } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";

export interface NoGrantedAccesProps {
  redirect?: string;
  noGrantedTo?: string;
}

export const NoGrantedAcces = ({ redirect = "/", noGrantedTo = "Unhandled" }: NoGrantedAccesProps) => {
  const navigate = useNavigate();
  const theme = useTheme();

  const handleClose = () => {
    navigate(redirect);
  };

  return (
    <Modal open={true} onClose={handleClose} closeAfterTransition>
      <Fade in={true} >
        <Box
          sx={{
            position: "absolute" as const,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: theme.palette.background.paper,
            borderRadius: 3,
            boxShadow: 24,
            width: 420,
            p: 4,
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Box
            sx={{
              backgroundColor: theme.palette.error.light,
              color: theme.palette.error.contrastText,
              width: 80,
              height: 80,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 2,
            }}
          >
            <LockOutlinedIcon sx={{ fontSize: 40 }} />
          </Box>

          <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.primary.contrastText }}>
            Acceso restringido
          </Typography>

          <Typography variant="body1" sx={{ mb: 2, color: "text.secondary" }}>
            No tienes permisos para acceder al módulo{" "}
            <strong>{noGrantedTo}</strong>.
          </Typography>

          <Button
            variant="contained"
            onClick={handleClose}
            sx={{
              textTransform: "none",
              px: 4,
              borderRadius: 2,
              backgroundColor: theme.palette.primary.main,
              "&:hover": {
                backgroundColor: theme.palette.primary.dark,
              },
            }}
          >
            Volver al inicio
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
};
