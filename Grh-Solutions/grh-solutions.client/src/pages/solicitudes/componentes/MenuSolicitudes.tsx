import React, { useState } from "react";
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
import { Box, Button, Modal } from "@mui/material";
import '@react-pdf-viewer/core/lib/styles/index.css';

interface MenuSolicitudesProps {
  onClose: () => void;
}

const options = [{
  id: 1,
  name: "Mario"
},{
  id: 2,
  name: "Migel"
},{
  id: 3,
  name: "Jose"
},{
  id: 4,
  name: "Alguien"
},{
  id: 5,
  name: "Juan"
}
]

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

function ChildModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button onClick={handleOpen}>Open Child Modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...styledoc, width: 200 }}>
          <h2 id="child-modal-title">Text in a child modal</h2>
          <p id="child-modal-description">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </p>
          <Button onClick={handleClose}>Close Child Modal</Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}


const MenuSolicitudes: React.FC<MenuSolicitudesProps> = ({ onClose }) => {
  const [activeSubMenu, setActiveSubMenu] = useState<string>("");
  const [mult, setMult] = React.useState<number[]>([]);
  const closeSubMenu = () => {
    setActiveSubMenu("");
  };

  const setFieldValue = (_field: string, value: number[]) => {
    setMult(value);
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const documents = [
    { id: 1, name: 'Documento 1', type: 'PDF', size: '1 MB', fileUrl: '/path/to/document1.pdf' },
    { id: 2, name: 'Documento 2', type: 'PDF', size: '2 MB', fileUrl: '/path/to/document2.pdf' },
    // Agrega más documentos aquí
  ];

  return (
    <>
      <div className="menuContainer">
        <h3>Opciones</h3>
        <ul>
          <li onClick={() => setActiveSubMenu("asignar")}>
            <PersonIcon sx={{ fontSize: 18, marginRight: 2, verticalAlign: "middle" }} />
            <span>Asignar Usuario</span>
          </li>
          <li onClick={() => setActiveSubMenu("historial")}>
            <HistoryIcon sx={{ fontSize: 18, marginRight: 2, verticalAlign: "middle" }} />
            <span>Ver historial</span>
          </li>
          <li onClick={handleOpen}>
            <FileOpenIcon sx={{ fontSize: 18, marginRight: 2, verticalAlign: "middle" }} />
            <span>Ver documentos</span>
          </li>
          <li onClick={onClose}>
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

      {activeSubMenu === "asignar" && (
        <div className="overlay" onClick={closeSubMenu}>
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
             }}     />

              <div className="dividerContainer">
                <hr className="divider" />
                <CloseIcon className="dividerIcon" sx={{ fontSize: 15 }} />
              </div>
            </div>
            <div className="buttonContainer">
              <button className="btn cancel" onClick={closeSubMenu}>
                <ArrowBackIcon sx={{ fontSize: 15 }} />Cancelar
              </button>
              <button className="btn" onClick={closeSubMenu}>
                <SendIcon sx={{ fontSize: 15 }} />Asignar
              </button>
            </div>
          </div>
        </div>
      )}

      {activeSubMenu === "historial" && (
        <div className="overlay" onClick={closeSubMenu}>
          <div className="subMenuHistorial" onClick={(e) => e.stopPropagation()}>

            <div className="historialHeader">
              <h1 className="historialTitle">Historial</h1>
              <button className="closeButton" onClick={closeSubMenu}>
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
        </div>
      )}
    <div>
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...styledoc, width: 1400 }}>
          <div className="subMenudocumento">
            <div className="documentolHeader">
              <h1 className="documentoTitle">Documento</h1>
              <button className="closeButtonDoc" onClick={handleClose}>
                <CloseIcon sx={{ fontSize: 20 }} />
              </button>
            </div>
            <div className="docContent">
              <InsertDriveFileIcon className="doclIcon" sx={{ fontSize: 40 }} />
              <div className="docText">
                <label>Nombre:</label>
                <label>Tipo:</label>
                <label>Peso</label>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>




    </>
  );
};

export default MenuSolicitudes;
