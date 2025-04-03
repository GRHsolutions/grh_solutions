import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Groups3Icon from "@mui/icons-material/Groups3";
import GrhBasicMenu from "../../../../generics/grh-generics/menu";
import AcUnitIcon from '@mui/icons-material/AcUnit';
import {
    Button,
  IconButton,
  MenuItem,
  Select,
  TextField,
  useTheme,
} from "@mui/material";
import { Horarios } from "../../../../domain/models/horarios/Horarios-entities";
import formatearFecha from "../../../../utils/formatearFecha";
import { TabConfig, TabsCompo } from "../../../../generics/tabs/tabs";

const style = {
  position: "absolute",
  top: 0,
  right: 0,
  width: "45%",
  height: "100%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  overflowY: "auto",
  "&:focus": {
    outline: "none",
  },
};
interface BasicModalProps {
  current: Horarios | null;
  handleClose: () => void;
}
export default function BasicModal({ current, handleClose }: BasicModalProps) {
  const theme = useTheme();

  const tabs : TabConfig[] =[
    {
        value: "1",
        label: "detalle",
        content: (
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
            <Typography>
                Imformacion</Typography>
                <GrhBasicMenu 
              optionsPosition={{
                top: '2px',
                left: '10px'
              }}
              items={[
                {
                  icon: <AcUnitIcon />,
                  label: "Opcion del menu 1",
                  onClick: () => {console.log("pressed")},
                  visible: true,
                  disabled: false
                },
                {
                  icon: <AcUnitIcon />,
                  label: "Opcion del menu 2",
                  onClick: () => {console.log("pressed")},
                  visible: true,
                  disabled: false
                },
                {
                  icon: <AcUnitIcon />,
                  label: "Opcion del menu 3",
                  onClick: () => {console.log("pressed")},
                  visible: true,
                  disabled: false
                }
              ]}          
            />
            </Box>
            <Box sx={{
                ml:5
            }}>
              <Typography sx={{mb:0.5}}>Asignado del grupo {current?.tipoHorario.nombre}</Typography>
              <Typography sx={{mb:1}}>desde la fecha {formatearFecha(current?.fechaInicio, true, true)}  </Typography>
              <Typography sx={{mb:1}}>hasta la fecha {formatearFecha(current?.fechaFin, true, true)}</Typography>
            </Box>
          </Box>
        ),
    },
    {
        value:"2",
        label:"Grupo",
        content:(
            <Box>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 2 }}> 
                <Typography sx={{
                    display: "flex",justifyContent:"center", alignItems:"center"
                }}>
                    Listado de usuarios vinculados al horario
                </Typography>
                <GrhBasicMenu 
              optionsPosition={{
                top: '2px',
                left: '10px'
              }}
              items={[
                {
                  icon: <AcUnitIcon />,
                  label: "Opcion del menu 1",
                  onClick: () => {console.log("pressed")},
                  visible: true,
                  disabled: false
                },
                {
                  icon: <AcUnitIcon />,
                  label: "Opcion del menu 2",
                  onClick: () => {console.log("pressed")},
                  visible: true,
                  disabled: false
                },
                {
                  icon: <AcUnitIcon />,
                  label: "Opcion del menu 3",
                  onClick: () => {console.log("pressed")},
                  visible: true,
                  disabled: false
                }
              ]}          
            />
                </Box>
                <Box sx={{ border: "2px solid black", padding: 2, borderRadius: 2 }}>
                    <Typography sx={{ border: "1px solid gray", padding: 1 }}>juan rodriguez-21314324</Typography>
                    <Typography sx={{ border: "1px solid gray", padding: 1 }}>pedro gomez-134557</Typography>
                    <Typography sx={{ border: "1px solid gray", padding: 1 }}>pedro pinilla-131455</Typography>
                    <Typography sx={{ border: "1px solid gray", padding: 1 }}>danna camargo-32536467</Typography>
                    <Typography sx={{ border: "1px solid gray", padding: 1 }}>camilo diaz-21325356</Typography>
                </Box>
            </Box>
        ),
    },
  ]
  return (
    <div>
      <Modal open={current != null} onClose={handleClose}>
        <Box sx={style}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Groups3Icon
              sx={{ fontSize: 40, color: theme.palette.text.primary }}
            />
            <Box>
              <Typography
                variant="h6"
                fontWeight="bold"
                color={theme.palette.text.primary}
              >
                Horario del {formatearFecha(current?.fechaInicio, true, false)} hasta {formatearFecha(current?.fechaFin, true, false)}
              </Typography>
              <Typography variant="body2" color={theme.palette.text.primary}>
                Detalles y imformacion relevante del horario del area de indexacion
              </Typography>
            </Box>
          </Box>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <TabsCompo tabs={tabs} />
        </Box>
      </Modal>
    </div>
  );
}
