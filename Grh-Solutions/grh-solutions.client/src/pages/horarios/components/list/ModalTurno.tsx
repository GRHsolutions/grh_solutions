import * as React from "react";
import {
  Box,
  Typography,
  Modal,
  IconButton,
  Tooltip,
  useTheme,
  Button,
  ButtonProps,
  Snackbar,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Groups3Icon from "@mui/icons-material/Groups3";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import { ReactElement, useState } from "react";

import { Horarios } from "../../../../domain/models/horarios/Horarios.entities";
import formatearFecha from "../../../../utils/formatearFecha";
import { TabConfig, TabsCompo } from "../../../../generics/tabs/tabs";
import GrhButton from "../../../../generics/grh-generics/button";
import GrhBasicMenu from "../../../../generics/grh-generics/menu";

import { EditarDetalle } from "../Modales/ModalEditar";
import { InasistenciaDetalle } from "../Modales/ModalInasistencia";
import { PeticionesDetalle } from "../Modales/ModalPeticiones";
import ModalUsuarios from "../Modales/ModalUsuario";
import ModalDesvincular from "../Modales/ModalDesvincular";
import Vincular from "../Modales/ModalVincular";
import { Profile } from "../../../../domain/models/profile/profile.entities";
import { deleteUserFromGroup } from "../../../../domain/services/grupos/grupos.service";

const style = (theme: any) => ({
  position: "absolute",
  top: 0,
  right: 0,
  width: "45%",
  height: "100%",
  bgcolor: theme.palette.background.paper,
  boxShadow: theme.shadows[8],
  p: 4,
  overflowY: "auto",
  "&:focus": {
    outline: "none",
  },
  borderLeft: `2px solid ${theme.palette.divider}`,
});

interface BasicModalProps {
  current: Horarios | null;
  handleClose: () => void;
  users: Profile[];
  token: string;
  setReload?: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IconButtonSmallProps extends ButtonProps {
  icon: ReactElement;
}

interface PersonaItemProps {
  nombre: string;
  documento: string;
  onClick1?: () => void;
  onClick2?: () => void;
}

export function IconButtonSmall({
  icon,
  color = "primary",
  variant = "outlined",
  ...props
}: IconButtonSmallProps) {
  const theme = useTheme();
  return (
    <Button
      variant={variant}
      color={color}
      sx={{
        minWidth: "auto",
        padding: "2px 4px",
        borderColor: theme.palette.divider,
        "&:hover": {
          backgroundColor: theme.palette.action.hover,
        },
      }}
      {...props}
    >
      {icon}
    </Button>
  );
}

export function PersonaItem({
  nombre,
  documento,
  onClick1,
  onClick2,
}: PersonaItemProps) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        border: `1px solid ${theme.palette.divider}`,
        padding: 1,
        mb: 1,
        borderRadius: 1,
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Typography color={theme.palette.text.primary}>
        {nombre} - {documento}
      </Typography>
      <Box sx={{ display: "flex", gap: 1 }}>
        {/* <Tooltip title="Generar una inasistencia">
          <IconButtonSmall icon={<CloseIcon />} color="error" onClick={onClick1} />
        </Tooltip> */}
        <Tooltip title="Desvincular">
          <IconButtonSmall
            icon={<ArrowDownwardIcon />}
            color="error"
            onClick={onClick2}
          />
        </Tooltip>
      </Box>
    </Box>
  );
}

export default function BasicModal({ current, handleClose, users, token, setReload }: BasicModalProps) {
  const theme = useTheme();
  const [dialog, setDialog] = React.useState(false);
  const [dialog2, setDialog2] = React.useState(false);
  const [selectedUserId, setSelectedUserId] = React.useState<string | null>(null);
  const [mdo, setMdo] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleCls = () => setMdo("");
  const handleCls2 = () => setMdo("");
  const handleOpenVincular = () => setOpen(true);
  const handleCloseVincular = () => setOpen(false);
  const handleDesvincularConfirm = async () => {
    if (!selectedUserId || !current?.group?._id) return;

    try {
      await deleteUserFromGroup(current.group._id, selectedUserId, token);
      setDialog2(false);
      setSelectedUserId(null);
      setOpenAlert(true);
      if (setReload) setReload((prev) => !prev);
    } catch (error) {
      console.error("Error al desvincular usuario:", error);
    }
  };

  const handleOpenDesvincular = (userId: string) => {
    setSelectedUserId(userId);
    setDialog2(true);
  };
  const tabs: TabConfig[] = [
    {
      value: "1",
      label: "Detalle",
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
            <Typography color={theme.palette.text.primary}>
              Información
            </Typography>
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
                // {
                //   icon: <AcUnitIcon />,
                //   label: "Inasistencia",
                //   onClick: () => setMdo("Inasistencia"),
                //   visible: true,
                //   disabled: false,
                // },
                // {
                //   icon: <AcUnitIcon />,
                //   label: "Peticiones",
                //   onClick: () => setMdo("Peticiones"),
                //   visible: true,
                //   disabled: false,
                // },
              ]}
            />
          </Box>
          <Box sx={{ ml: 5 }}>
            <Typography sx={{ mb: 0.5 }} color={theme.palette.text.secondary}>
              Asignado del grupo {current?.scheduleType?.name}
            </Typography>
            <Typography sx={{ mb: 1 }} color={theme.palette.text.secondary}>
              Desde la fecha{" "}
              {formatearFecha(current?.start_date, true, true)}
            </Typography>
            <Typography sx={{ mb: 1 }} color={theme.palette.text.secondary}>
              Hasta la fecha {formatearFecha(current?.end_date, true, true)}
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
            <Typography color={theme.palette.text.primary}>
              Listado de usuarios vinculados al horario
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "flex-end",
                mt: 2,
                width: "100%",
              }}
            >
              <GrhButton
                startIcon={<AcUnitIcon />}
                label="Vincular usuario"
                variant="principal"
                onClick={handleOpenVincular}
                sx={{
                  width: "200px",
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                }}
              />
              <Vincular
                handleClose={handleCloseVincular}
                open={open}
                users={users}
                groupId={current?.group?._id}
                areaId={current?.group?.area}
                groupName={current?.group?.name}
                setReload={setReload}
              />
            </Box>
          </Box>
          <Box
            sx={{
              border: `2px solid ${theme.palette.divider}`,
              padding: 1,
              borderRadius: 2,
              backgroundColor: theme.palette.background.paper,
            }}
          >
            {current?.group?.users.map((userId: string) => {
              const user = users.find((u) => u._id === userId || u.user === userId);
              return (
                <PersonaItem
                  key={userId}
                  nombre={user ? user.name.trim() + " " + user.lastname : "Usuario desconocido"}
                  documento={user?.document || "Sin documento"}
                  onClick1={() => setDialog(true)}
                  onClick2={() => handleOpenDesvincular(userId)}
                />
              );
            })}

          </Box>
          <ModalDesvincular
            header={{
              title: "¿Desea desvincular al usuario?",
              icon: <AcUnitIcon />,
            }}
            open={dialog2}
            onClose={() => setDialog2(false)}
            onConfirm={handleDesvincularConfirm}
          />

          <ModalUsuarios
            header={{
              title: "¿Desea generar una inasistencia al usuario?",
              icon: <AcUnitIcon />,
            }}
            open={dialog}
            onClose={() => setDialog(false)}
            onConfirm={() => setDialog(false)}
          />
        </Box>
      ),
    },
  ]
  return (
    <div>
      <Modal open={!!current} onClose={handleClose}>
        <Box sx={style(theme)}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Groups3Icon sx={{ fontSize: 40, color: theme.palette.primary.main }} />
              <Box>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  color={theme.palette.text.primary}
                >
                  Horario del{" "}
                  {formatearFecha(current?.start_date, true, false)} hasta{" "}
                  {formatearFecha(current?.end_date, true, false)}
                </Typography>
                <Typography variant="body2" color={theme.palette.text.secondary}>
                  Detalles e información relevante del horario del área de
                  indexación
                </Typography>
              </Box>
            </Box>
            <IconButton onClick={handleClose} color="inherit">
              <CloseIcon />
            </IconButton>
          </Box>
          <TabsCompo tabs={tabs} />
        </Box>
      </Modal>
      {mdo === "Editar" && <EditarDetalle handleClose={handleCls} current={current} token={token} setReload={setReload} />}
      {mdo === "Inasistencia" && (
        <InasistenciaDetalle handleClose={handleCls2} current={null} />
      )}
      {mdo === "Peticiones" && (
        <PeticionesDetalle handleClose={handleCls2} current={null} />
      )}
      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={() => setOpenAlert(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={() => setOpenAlert(false)} severity="success" sx={{ width: "100%" }}>
          Usuarios desvinculados correctamente.
        </Alert>
      </Snackbar>

    </div>
  );
}
