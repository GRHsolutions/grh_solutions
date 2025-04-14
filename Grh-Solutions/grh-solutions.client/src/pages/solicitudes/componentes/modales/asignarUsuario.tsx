import { Box, Modal } from "@mui/material"
import MultipleSelect from "../../../../generics/grh-generics/multipleSelect";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SendIcon from '@mui/icons-material/Send';
import React from "react";

interface AsignarUsuarioProps {
    handleClose : () => void
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
    
    
export const AsignarUsuario = ({handleClose}: AsignarUsuarioProps)=>{
      const [mult, setMult] = React.useState<number[]>([]);
      
      const setFieldValue = (_field: string, value: number[]) => {
        setMult(value);
      };
    return (
    <Modal open={true} onClose={handleClose}>
       <Box sx={{ ...styleasig }}>
          <div className="subMenuAsignar" onClick={(e) => e.stopPropagation()}>
            <label className="labelAsig">Busque al usuario al que va a asignar la solicitud</label>
            <div className="divAsigUser">
              < MultipleSelect
                label={'Lista de Usuarios'}
                name={'input'}
                options={options.map(item => ({
                    id: item.id, 
                    nombre: item.name
                  }))} 
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
              <button className="btn cancel" onClick={handleClose}>
                <ArrowBackIcon sx={{ fontSize: 15 }} />Cancelar
              </button>
              <button className="btn" onClick={handleClose}>
                <SendIcon sx={{ fontSize: 15 }} />Asignar
              </button>
            </div>
          </div>
        </Box>
    </Modal>
    )
}