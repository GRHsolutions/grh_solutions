import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  Box,
  Typography,
  IconButton,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";
import React from "react";
import GrhButton from "../../../../generics/grh-generics/button";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

  export interface SimpleDialogHeaderProps {
    icon: React.ReactNode;
    title?: string;
    subTitle?: string;
  }
  
  export interface ModalDesvincularProps {
    open: boolean;
    onClose: () => void;
    header?: SimpleDialogHeaderProps;
    text?: string;
    onConfirm: () => void;
  }
  
export default function ModalDesvincular (props:ModalDesvincularProps ) {
  const {
    open,
    onClose,
    onConfirm,
    header = {
      icon: null,
      title: "Desea desvincular al usuario?",
    },
    text = "Si lo desvincula por error en la información del grupo en este Horario.",
  } = props;

  const theme = useTheme();

  return (
    <Dialog onClose={onClose} open={open} fullWidth maxWidth="sm">
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          p: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ fontSize: 32, mr: 2 }}>{header.icon}</Box>
          <Box>
            <Typography variant="h6">{header.title}</Typography>
          </Box>
        </Box>

        <IconButton
          onClick={onClose}
          sx={{
            color: theme.palette.primary.contrastText,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Divider />

      <DialogContent sx={{ fontSize: "17px", py: 3 }}>
        <Typography>{text}</Typography>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <GrhButton
          onClick={onClose}
          startIcon={<CancelIcon />}
          label="Cancelar"
          variant="secondary"
          p="2.4"
        />
        <GrhButton
          onClick={onConfirm}
          startIcon={<CheckIcon />}
          label="Confirmar"
          variant="principal"
          p="2.4"
        />
      </DialogActions>
    </Dialog>
  );
}
  

  