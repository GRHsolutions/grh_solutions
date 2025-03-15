import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import react from '@vitejs/plugin-react-swc';
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
  const [informacion, setInformacion] = React.useState(true)
  const [involucadros, setInvolucadros] = React.useState(false)
  const [seguimientos, setSeguimientos] = React.useState(false)
  const onSubmit = (informacion: boolean, involucadros: boolean, seguimientos: boolean) => {
    setInformacion(informacion)
    setInvolucadros(involucadros)
    setSeguimientos(seguimientos)
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
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
            {informacion &&
              <>
                <div className='DivInformacion'>
                  <label>Informacion basica</label>
                </div>
                <div className='divInfo'>

                </div>
              </>

            }
            {involucadros && <label>esto es para los involucrados</label>}
            {seguimientos && <label>esto es para los seguimiento</label>}

          </div>
        </Box>
      </Modal>
    </div>
  );
}
