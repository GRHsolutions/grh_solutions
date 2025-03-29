import { Box, Modal, Stack, Typography, useTheme } from "@mui/material";
import GppBadIcon from '@mui/icons-material/GppBad';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SendIcon from '@mui/icons-material/Send';
interface RechazarSolicitudProps {
  handleClose: () => void;
}

const stylefinal = {
  position: "absolute",
  transform: "translate(-50%, -50%)",
  top: "50%",
  left: "60%",
  width: 1000,
};

export const RechazarSolicitud = ({
  handleClose,
}: RechazarSolicitudProps) => {
  const theme = useTheme();

  return (
    <Modal open={true} onClose={handleClose}>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        sx={{ ...stylefinal }}
      >
        <div className="subMenuAsignar">
          <div className="labelAsig">
            <Stack
              direction="row"
              display="flex"
              spacing={1}
              alignItems="center"
              margin={1}
            >
              <GppBadIcon
                fontSize="large"
                sx={{
                  color: theme.palette.primary.contrastText,
                }}
              />

              <Box display={"flex"} flexDirection={"column"}>
                <Typography variant="h6" fontWeight={"bold"} mt={"3"}>
                  ¿Desea rechazar la solicitud?
                </Typography>
              </Box>
            </Stack>
          </div>
            <Typography display="flex">Si considera que la solicitud deberia ser rechazar.</Typography>
            <Typography display="flex">Esta acion notificara a los usuarios involucrados a la solicitud.</Typography>
          <div className="buttonContainer">
              <button className="btn cancel" onClick={handleClose}>
                <ArrowBackIcon sx={{ fontSize: 15 }} />Cancelar
              </button>
              <button className="btn" onClick={handleClose}>
                <SendIcon sx={{ fontSize: 15 }} />Rechazar
              </button>
            </div>
        </div>
      </Box>
    </Modal>
  );
};
