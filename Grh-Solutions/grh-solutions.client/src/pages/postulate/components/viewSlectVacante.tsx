import { Modal, useTheme, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface IModalProps {
  open: boolean;
  handleClose: () => void;
}

const data = [
  { nombre: "Roberto Gómez Bolaños", fechaPostulacion: "2025-04-01" },
  { nombre: "Juan Pérez", fechaPostulacion: "2025-04-02" },
  { nombre: "María López", fechaPostulacion: "2025-04-03" },
];

export default function ViewSelectVacante({ open, handleClose }: IModalProps) {
  const theme = useTheme();

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-title" aria-describedby="modal-description">
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        height: '90%',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        borderRadius: '15px',
        display: 'flex',
        flexDirection: 'column',
        gap: 2
      }}>
        <IconButton onClick={handleClose} sx={{ position: 'absolute', top: 10, right: 10, color: theme.palette.text.primary }}>
          <CloseIcon />
        </IconButton>
        <Typography variant="h5" fontWeight="bold" color={theme.palette.text.primary} sx={{ textAlign: 'center' }}>
          Usuarios Postulados a la Vacante
        </Typography>
        <TableContainer component={Paper} sx={{ mt: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center"><Typography variant="h6" color={theme.palette.text.primary}>Nombre</Typography></TableCell>
                <TableCell align="center"><Typography variant="h6" color={theme.palette.text.primary}>Fecha de Postulación</Typography></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{row.nombre}</TableCell>
                  <TableCell align="center">{row.fechaPostulacion}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Modal>
  );
}
