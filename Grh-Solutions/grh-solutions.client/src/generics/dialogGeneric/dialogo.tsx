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
  import GrhButton from "../grh-generics/button";
  import React from "react";
  
  export interface SimpleDialogHeaderProps {
    icon: React.ReactNode;
    title?: string;
    subTitle?: string;
  }
  
  export interface SimpleDialogProps {
    open: boolean;
    onClose: () => void;
    header?: SimpleDialogHeaderProps;
    text?: string;
    onConfirm: () => void;
  }
  
  export default function SimpleDialog(props: SimpleDialogProps) {
    const {
      open,
      onClose,
      onConfirm,
      header = {
        icon: null,
        title: "Eliminar el comunicado",
        subTitle: "si desea proceder con esta acción es irreversible",
      },
      text = "¿Estás seguro de eliminar el comunicado? Esto se actualizará para todos los usuarios, y se notificará al usuario responsable.",
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
              <Typography variant="body2" sx={{ mt: -0.5 }}>
                {header.subTitle}
              </Typography>
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
  