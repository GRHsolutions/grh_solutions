import CloseIcon from "@mui/icons-material/Close";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { Box, IconButton, Modal } from "@mui/material";

interface HistorialSolicitudesProps {
  handleClose: () => void;
}

const stylehis = {
  position: "absolute",
  left: "74%",
  width: 1000,
};

export const HistorialSolicitudes = ({
  handleClose,
}: HistorialSolicitudesProps) => {
  return (
    <Modal open={true} onClose={handleClose}>
      <Box sx={{ ...stylehis }}>
        <div className="subMenuHistorial" onClick={(e) => e.stopPropagation()}>
          <div className="historialHeader">
            <h1 className="historialTitle">Historial</h1>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>

          <div className="historialContent">
            <InsertDriveFileIcon
              className="historialIcon"
              sx={{ fontSize: 40 }}
            />
            <div className="historialText">
              <label>Se ha creado la solicitud</label>
              <label>Por: Carlos Mario</label>
              <label>El día 28/12/2025</label>
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
};
