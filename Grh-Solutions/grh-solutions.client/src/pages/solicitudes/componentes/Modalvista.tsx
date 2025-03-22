import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import MenuIcon from '@mui/icons-material/Menu';
import MenuSolicitudes from "./MenuSolicitudes";
import { useState } from "react";



const style = {
  position: 'absolute',
  top: '50%',
  left: '78%',
  transform: 'translate(-50%, -50%)',
  width: '40%',
  height: '92%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: '15px'
};

interface BasicModalProps {
  open: boolean
  handleClose: () => void
  name: any
}
export default function BasicModal({ open, handleClose, name }: BasicModalProps) {
  const [informacion, setInformacion] = React.useState(true);
  const [involucadros, setInvolucadros] = React.useState(false);
  const [seguimientos, setSeguimientos] = React.useState(false);
  const [menuOpen, setMenuOpen] = useState(false);


  const handleCloseModal = () => {
    handleClose();
    setMenuOpen(false);
  };

  const onSubmit = (informacion: boolean, involucadros: boolean, seguimientos: boolean) => {
    setInformacion(informacion);
    setInvolucadros(involucadros);
    setSeguimientos(seguimientos);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="divIcon">
            <NoteAltIcon sx={{ fontSize: 55, paddingTop: 2 }} />
            <label className="LabelEstado">{name.estado}</label>
            <div className='jiji'>
              <h1>Ver solicitud {name.radicado}</h1>
              <label className="LabelInfo">Vea la información actual de su solicitud</label>
            </div>
            <div className='menuSolicitudes'>
              <MenuIcon sx={{ fontSize: 40, paddingTop: 2 }} onClick={() => setMenuOpen(!menuOpen)} />
              {menuOpen && <MenuSolicitudes onClose={() => setMenuOpen(false)} />}
            </div>
          </div>

          <div className='contentButtons'>
            <button
              className="button3"
              type="button"
              onClick={() => onSubmit(true, false, false)}
            >
              informacion
            </button>
            <button
              className="button3"
              type="button"
              onClick={() => onSubmit(false, true, false)}
            >
              involucadros
            </button>
            <button
              className="button4"
              type="button"
              onClick={() => onSubmit(false, false, true)}
            >
              seguimientos
            </button>
          </div>

          <div>
            {informacion && (
              <>
                <div className='DivInformacion'>
                  <label>Informacion basica</label>
                </div>
                <div className='divInfo'>
                  <Typography variant="body1">{name.titulo}</Typography>
                  <Typography variant="body1">Tipo: {name.tipo}</Typography>
                  <Typography variant="body2">Texto de la peticion, si quiere inventese algo aqui Juan</Typography>
                </div>
              </>
            )}

            {involucadros && (
              <>
                <div className='DivInformacion'>
                  <label>Usuarios involucrados a la solicitud</label>
                </div>
                <div className='divInfo'>
                  <div className='divUsuarioIn'>
                    <label className="divUsuarioLabel">
                      <input type="checkbox" id="User1" name="User1" />
                      <AccountCircleIcon sx={{ fontSize: 40 }} />
                    </label>
                    <div className='divUsuarioInfo'>
                      <label>Pedro Gomez</label>
                      <Typography variant="body1">Creador de la solicitud</Typography>
                    </div>
                  </div>

                  <div className='divUsuarioIn'>
                    <label className="divUsuarioLabel">
                      <input type="checkbox" id="User2" name="User2" />
                      <AccountCircleIcon sx={{ fontSize: 40 }} />
                    </label>
                    <div className='divUsuarioInfo'>
                      <label>Mario Mendosa</label>
                      <Typography variant="body1">Interesado</Typography>
                    </div>
                  </div>

                  <div className='divUsuarioIn'>
                    <label className="divUsuarioLabel">
                      <input type="checkbox" id="User3" name="User3" />
                      <AccountCircleIcon sx={{ fontSize: 40 }} />
                    </label>
                    <div className='divUsuarioInfo'>
                      <label>Luisa Aldana</label>
                      <Typography variant="body1">Interesada</Typography>
                    </div>
                  </div>
                </div>
              </>
            )}

            {seguimientos && (
              <>
                <div className='DivInformacion'>
                  <label>Seguimientos creados por un asignado a la solicitud</label>
                </div>
                <div className='divInfo'>
                  {/* Seguimientos */}
                  <div className='divUsuarioIn'>
                    <InsertDriveFileIcon sx={{ fontSize: 40 }} />
                    <div className='divUsuarioInfo'>
                      <label>Se ha vuelto a pendiente</label>
                      <Typography variant="body1">Por: Carlos Mario</Typography>
                    </div>
                  </div>

                  <div className='divUsuarioIn'>
                    <InsertDriveFileIcon sx={{ fontSize: 40 }} />
                    <div className='divUsuarioInfo'>
                      <label>Se ha asignado a Carlos Mario</label>
                      <Typography variant="body1">Por: Mario Juda</Typography>
                    </div>
                  </div>

                  <div className='divUsuarioIn'>
                    <InsertDriveFileIcon sx={{ fontSize: 40 }} />
                    <div className='divUsuarioInfo'>
                      <label>Ha asignado a Mario Juda, es el primer asignado</label>
                      <Typography variant="body1">Por: Mario Castañeda</Typography>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </Box>
      </Modal>
      {menuOpen && <MenuSolicitudes onClose={() => setMenuOpen(false)} />} 
    </div>
  );
}
