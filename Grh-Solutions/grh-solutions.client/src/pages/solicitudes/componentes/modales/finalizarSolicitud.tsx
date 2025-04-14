import StopCircleIcon from "@mui/icons-material/StopCircle";
import SimpleDialog from '../../../../generics/dialogGeneric/dialogo';

interface FinalizarSolicitudProps {
  handleClose: () => void;
}

export const FinalizarSolicitud = ({ handleClose }: FinalizarSolicitudProps) => {
  return (
    <SimpleDialog
      header={{ 
        icon: <StopCircleIcon />,
        title: '¿Desea finalizar la solicitud?',
        subTitle: 'Si considera que la solicitud deberia ser finalizada.',
      }}
      text="Esta acción notificará a los usuarios involucrados en la solicitud."
      open={true}
      onClose={handleClose}
      onConfirm={handleClose}
    />
  );
};
