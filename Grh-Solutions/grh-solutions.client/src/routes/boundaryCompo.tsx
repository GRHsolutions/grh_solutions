import { Box, Button, Modal, Typography, Fade, useTheme } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useNavigate } from "react-router-dom";

export interface BoundaryRouteProps {
  redirect?: string; // Ruta a la que redirigir en caso de un error
}

const BoundaryRoute = ({ redirect = "/" }: BoundaryRouteProps) => {
  const navigate = useNavigate();
  const theme = useTheme();

  const handleClose = () => {
    navigate(redirect);
  };

  return (
    <Modal open={true} onClose={handleClose} closeAfterTransition>
      <Fade in={true}>
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
              backgroundColor: theme.palette.warning.light,
              color: theme.palette.warning.contrastText,
              width: 80,
              height: 80,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 2,
            }}
          >
            <ErrorOutlineIcon sx={{ fontSize: 40 }} />
          </Box>

          <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.primary.contrastText }}>
            Ruta no reconocida
          </Typography>

          <Typography variant="body1" sx={{ mb: 2, color: "text.secondary" }}>
            Lo sentimos, no hemos podido encontrar la ruta solicitada.
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


export default BoundaryRoute;