import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Groups3Icon from "@mui/icons-material/Groups3";
import GrhBasicMenu from "../../../../generics/grh-generics/menu";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import { IconButton, useTheme } from "@mui/material";
import { Horarios } from "../../../../domain/models/horarios/Horarios-entities";
import formatearFecha from "../../../../utils/formatearFecha";
import { TabConfig, TabsCompo } from "../../../../generics/tabs/tabs";
import GrhButton from "../../../../generics/grh-generics/button";
import { ReactElement, useState } from "react";
import { EditarDetalle } from "../Modales/ModalEditar";
import { InasistenciaDetalle } from "../Modales/ModalInasistencia";
import { PeticionesDetalle } from "../Modales/ModalPeticiones";
import * as React from "react";
import Stack from "@mui/material/Stack";
import Button, { ButtonProps } from "@mui/material/Button";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { ModalUsuarios } from "../Modales/ModalUsuario";
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

interface IconButtonSmallProps extends ButtonProps {
  icon: ReactElement;
}

interface PersonaItemProps {
  nombre: string;
  documento: string;
  onClick1?:() => void;
  onClick2?:() => void;
}

export function PersonaItem({ nombre, documento,onClick1,onClick2 }: PersonaItemProps) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        border: "1px solid gray",
        padding: 1,
        mb: 1,
      }}
    >
      <Typography>
        {nombre} - {documento}
      </Typography>
      <Box sx={{ display: "flex", gap: 1 }}>
        <IconButtonSmall icon={<CloseIcon />} color="error" onClick={onClick1}/>
        <IconButtonSmall icon={<ArrowDownwardIcon />} color="error" onClick={onClick2}/>
      </Box>
    </Box>
  );
}
export function IconButtonSmall({
  icon,
  color = "primary",
  variant = "outlined",
  ...props
}: IconButtonSmallProps) {
  return (
    <Button
      variant={variant}
      color={color}
      sx={{
        minWidth: "auto",
        padding: "2px 4px",
      }}
      {...props}
    >
      {icon}
    </Button>
  );
}
export default function BasicModal({ current, handleClose }: BasicModalProps) {
  const theme = useTheme();
  const [mdo, setMdo] = useState("");

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose2 = () => setOpen(false);

  const handleCls = () => {
    setMdo("");
  };

  const handleCls2 = () => {
    setMdo("");
  };

  const tabs: TabConfig[] = [
    {
      value: "1",
      label: "detalle",
      content: (
        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            <Typography>Imformacion</Typography>
            <GrhBasicMenu
              optionsPosition={{
                top: "2px",
                left: "10px",
              }}
              items={[
                {
                  icon: <AcUnitIcon />,
                  label: "Editar",
                  onClick: () => setMdo("Editar"),
                  visible: true,
                  disabled: false,
                },
                {
                  icon: <AcUnitIcon />,
                  label: "Inasistencia",
                  onClick: () => setMdo("Inasistencia"),
                  visible: true,
                  disabled: false,
                },
                {
                  icon: <AcUnitIcon />,
                  label: "Peticiones",
                  onClick: () => setMdo("Peticiones"),
                  visible: true,
                  disabled: false,
                },
              ]}
            />
          </Box>
          <Box
            sx={{
              ml: 5,
            }}
          >
            <Typography sx={{ mb: 0.5 }}>
              Asignado del grupo {current?.tipoHorario.nombre}
            </Typography>
            <Typography sx={{ mb: 1 }}>
              desde la fecha {formatearFecha(current?.fechaInicio, true, true)}{" "}
            </Typography>
            <Typography sx={{ mb: 1 }}>
              hasta la fecha {formatearFecha(current?.fechaFin, true, true)}
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      value: "2",
      label: "Grupo",
      content: (
        <Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Listado de usuarios vinculados al horario
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "flex-end",
              }}
            >
              <GrhButton
                startIcon={<AcUnitIcon />}
                label="vincular usuario"
                variant="principal"
                sx={{
                  width: "200px",
                }}
              />
            </Box>
          </Box>
          <Box sx={{ border: "2px solid black", padding: 1, borderRadius: 2 }}>
            <PersonaItem nombre="juan rodriguez" documento="21314324"
            onClick1={ handleOpen} />
            <PersonaItem nombre="pedro gomez" documento="134557"  onClick1={ handleOpen}/>
            <PersonaItem nombre="pedro pinilla" documento="131455"  onClick1={ handleOpen}/>
            <PersonaItem nombre="danna camargo" documento="32536467"  onClick1={ handleOpen}/>
            <PersonaItem nombre="camilo diaz" documento="21325356"  onClick1={ handleOpen}/>
          </Box>
          <ModalUsuarios open={open} handleClose={handleClose2} />
        </Box>
      ),
    },
  ];

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
                  Horario del{" "}
                  {formatearFecha(current?.fechaInicio, true, false)} hasta{" "}
                  {formatearFecha(current?.fechaFin, true, false)}
                </Typography>
                <Typography variant="body2" color={theme.palette.text.primary}>
                  Detalles y imformacion relevante del horario del area de
                  indexacion
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
      {mdo == "Editar" && <EditarDetalle handleClose={handleCls} />}
      {mdo == "Inasistencia" && (
        <InasistenciaDetalle handleClose={handleCls2} current={null} />
      )}
      {mdo == "Peticiones" && (
        <PeticionesDetalle handleClose={handleCls2} current={null} />
      )}
    </div>
  );
}
