import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import { Box, DialogActions, Divider, IconButton } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

export interface SimpleDialogProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    subTitle?: string;
    text?: string;
    onConfirm: () => void
}



export default function SimpleDialog(props: SimpleDialogProps) {
    const { onClose, open, title = "Eliminar el comunicado", subTitle = "si desea proceder con esta accion es irreversible",
        text = "estas seguro de eliminar el comunicado,esto se actualizara para todos los usuarios, y se les notificara al usuario responsable de este",
        onConfirm
    } = props;

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle sx={{display:"flex", alignItems: "center",backgroundColor:"#efefef"}}>
                <Box>
                    <DeleteIcon fontSize='large' sx={{marginRight:"5px" ,marginTop:"5px"}}/>
                </Box>
                <Box sx={{display:"flex", flexDirection:"column"}}>
                    <label>{title}</label>
                    <label style={{fontSize:"15px", marginTop:"-10px"}}>{subTitle}</label>
                </Box>
                <IconButton onClick={handleClose} sx={{ position:"relative", top: -20, left: 160}}>
                <CloseIcon/>
                </IconButton>       
            </DialogTitle>
            <Divider />
            <DialogContent sx={{fontSize:"17px"}}>
                {text}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} startIcon={<CancelIcon/>} > cancelar</Button>
                <Button onClick={onConfirm} startIcon={<CheckIcon/>} variant="contained"> confirmar</Button>
            </DialogActions>
        </Dialog>
    );
}