import React, {} from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import PersonIcon from '@mui/icons-material/Person';
import HistoryIcon from '@mui/icons-material/History';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import GppGoodIcon from '@mui/icons-material/GppGood';
import GppBadIcon from '@mui/icons-material/GppBad';
import MultipleSelect from "../../../generics/grh-generics/multipleSelect";
import { Box, Modal } from "@mui/material";
interface MenuSolicitudesProps {
  onClose: () => void;
}

const options = [{ id: 1, name: "Mario" },
{ id: 2, name: "Migel" },
{ id: 3, name: "Jose" },
{ id: 4, name: "Alguien" },
{ id: 5, name: "Juan" }
]

const styleasig = {
  position: 'absolute',
  transform: 'translate(-50%, -50%)',
  top: '50%',
  left: '60%',
  width: 1000,
};
const stylehis = {
  position: 'absolute',
  transform: 'translate(-50%, -50%)',
  left: '74%',
  width: 1000,

};
const styledoc = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1400,
  height: 950,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const stylefinal = {
  position: 'absolute',
  transform: 'translate(-50%, -50%)',
  top: '50%',
  left: '50%',
  width: 700,
};
const MenuSolicitudes: React.FC<MenuSolicitudesProps> = ({ onClose }) => {

  const [mult, setMult] = React.useState<number[]>([]);
  const setFieldValue = (_field: string, value: number[]) => {
    setMult(value);
  };
  const [openAsig, setOpenA] = React.useState(false);
  const handleOpenAsig = () => {
    setOpenA(true);
  };
  const handleCloseAsig = () => {
    setOpenA(false);
  };
  const [openHistory, setOpenH] = React.useState(false);
  const handleOpenHistory = () => {
    setOpenH(true);
  };
  const handleCloseHistory = () => {
    setOpenH(false);
  };

  const [open, setOpen] = React.useState(false);
  const handleOpenDoc = () => {
    setOpen(true);
  };
  const handleCloseDoc = () => {
    setOpen(false);
  };
  const [openFinal, setOpenF] = React.useState(false);
  const handleOpenFinal = () => {
    setOpenF(true);
  };
  const handleCloseFinal = () => {
    setOpenF(false);
  };
  return (
    <>
      <div className="menuContainer">
        <h3>Opciones</h3>
        <ul>
          <li onClick={handleOpenAsig}>
            <PersonIcon sx={{ fontSize: 18, marginRight: 2, verticalAlign: "middle" }} />
            <span>Asignar Usuario</span>
          </li>
          <li onClick={handleOpenHistory}>
            <HistoryIcon sx={{ fontSize: 18, marginRight: 2, verticalAlign: "middle" }} />
            <span>Ver historial</span>
          </li>
          <li onClick={handleOpenDoc}>
            <FileOpenIcon sx={{ fontSize: 18, marginRight: 2, verticalAlign: "middle" }} />
            <span>Ver documentos</span>
          </li>
          <li onClick={handleOpenFinal}>
            <StopCircleIcon sx={{ fontSize: 18, marginRight: 2, verticalAlign: "middle" }} />
            <span>Finalizar</span>
          </li>
          <li onClick={onClose}>
            <GppGoodIcon sx={{ fontSize: 18, marginRight: 2, verticalAlign: "middle" }} />
            <span>Aprobar</span>
          </li>
          <li onClick={onClose}>
            <GppBadIcon sx={{ fontSize: 18, marginRight: 2, verticalAlign: "middle" }} />
            <span>Rechazar</span>
          </li>
        </ul>
      </div>

      <Modal
        open={openAsig}
        onClose={handleCloseAsig}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...styleasig }}>
          <div className="subMenuAsignar" onClick={(e) => e.stopPropagation()}>
            <label className="labelAsig">Busque al usuario al que va a asignar la solicitud</label>
            <div className="divAsigUser">
              <h1>Lista de Usuarios</h1>
              < MultipleSelect

                label={'Input multiple select'}
                name={'input'}
                options={options}
                value={mult}
                setFieldValue={setFieldValue}
                sx={{
                  width: '55rem'
                }} />

              <div className="dividerContainer">
                <hr className="divider" />
              </div>
            </div>
            <div className="buttonContainer">
              <button className="btn cancel" onClick={handleCloseAsig}>
                <ArrowBackIcon sx={{ fontSize: 15 }} />Cancelar
              </button>
              <button className="btn" onClick={handleCloseAsig}>
                <SendIcon sx={{ fontSize: 15 }} />Asignar
              </button>
            </div>
          </div>
        </Box>
      </Modal>

      <Modal
        open={openHistory}
        onClose={handleCloseHistory}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...stylehis }}>
          <div className="subMenuHistorial" onClick={(e) => e.stopPropagation()}>
            <div className="historialHeader">
              <h1 className="historialTitle">Historial</h1>
              <button className="closeButtonHistory" onClick={handleCloseHistory}>
                <CloseIcon sx={{ fontSize: 20 }} />
              </button>
            </div>

            <div className="historialContent">
              <InsertDriveFileIcon className="historialIcon" sx={{ fontSize: 40 }} />
              <div className="historialText">
                <label>Se ha creado la solicitud</label>
                <label>Por: Carlos Mario</label>
                <label>El día 28/12/2025</label>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
      <div>
        <Modal
          open={open}
          onClose={handleCloseDoc}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box sx={{ ...styledoc, width: 1400 }}>
            <div className="subMenudocumento">
              <div className="documentolHeader">
                <h1 className="documentoTitle">Documento</h1>
                <button className="closeButtonDoc" onClick={handleCloseDoc}>
                  <CloseIcon sx={{ fontSize: 20 }} />
                </button>
              </div>

              <div className="docContent">
                <div className="pdfPreview">
                  <div className="pdfSimulated">
                    <div className="pdfHeader">Previsualización del Documento</div>
                    <div className="pdfPage"></div>
                    <div className="pdfFooter">Página 1</div>
                  </div>
                </div>
                <div className="docInfo">

                  <div className="docText">
                    <div className="docInfoRow">
                      <InsertDriveFileIcon sx={{ fontSize: 40 }} />
                      <div className="docNameType">
                        <label><strong>Nombre:</strong> Documento de Ejemplo</label>
                        <label><strong>Tipo:</strong> PDF</label>
                        <label><strong>Peso:</strong> 2MB</label>
                      </div>
                    </div>
                  </div>

                  <div className="docText">
                    <div className="docInfoRow">
                      <InsertDriveFileIcon sx={{ fontSize: 40 }} />
                      <div className="docNameType">
                        <label><strong>Nombre:</strong> Documento de Ejemplo 2</label>
                        <label><strong>Tipo:</strong> PDF</label>
                        <label><strong>Peso:</strong> 5MB</label>
                      </div>
                    </div>
                  </div>

                  <div className="docText">
                    <div className="docInfoRow">
                      <InsertDriveFileIcon sx={{ fontSize: 40 }} />
                      <div className="docNameType">
                        <label><strong>Nombre:</strong> Documento de Ejemplo 3</label>
                        <label><strong>Tipo:</strong> PDF</label>
                        <label><strong>Peso:</strong> 15MB</label>
                      </div>
                    </div>
                  </div>


                </div>
              </div>
            </div>
          </Box>
        </Modal>

        <Modal
        open={openFinal}
        onClose={handleCloseFinal}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...stylefinal }}>
          <div className="subMenuFinal" onClick={(e) => e.stopPropagation()}>
              <h1 className="FinalTitle">¿Desea dar por finalizada la solicitud?</h1>
              <button className="closeButtonFinal" onClick={handleCloseFinal}>
                <CloseIcon sx={{ fontSize: 20 }} />
              </button>
              <div className="FinalText">
                <label>Si considera que la solicitud ya ha concluido.</label>
                <label>Esta acion notificara a los usuarios involucrados.</label>
              </div>
            </div>
        </Box>
      </Modal>

      </div>
    </>
  );
};

export default MenuSolicitudes;
