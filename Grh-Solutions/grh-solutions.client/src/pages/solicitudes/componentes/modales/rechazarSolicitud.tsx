import GppBadIcon from '@mui/icons-material/GppBad';
import SimpleDialog from '../../../../generics/dialogGeneric/dialogo';

interface RechazarSolicitudProps {
  handleClose: () => void;
}

export const RechazarSolicitud = ({ handleClose }: RechazarSolicitudProps) => {
  return (
    <SimpleDialog
      header={{
        icon: <GppBadIcon />,
        title: "¿Desea rechazar la solicitud?",
        subTitle: "Si considera que la solicitud debería ser rechazada.",
      }}
      text="Esta acción notificará a los usuarios involucrados en la solicitud."
      open={true}
      onClose={handleClose}
      onConfirm={handleClose}
    />
  );
};
