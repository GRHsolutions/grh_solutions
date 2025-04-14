import GppGoodIcon from "@mui/icons-material/StopCircle";
import SimpleDialog from '../../../../generics/dialogGeneric/dialogo';

interface AprobarSolicitudProps {
  handleClose: () => void;
}

export const AprobarSolicitud = ({ handleClose }: AprobarSolicitudProps) => {
  return (
    <SimpleDialog
      header={{
        icon: <GppGoodIcon />,
        title: "¿Desea aprobar la solicitud?",
        subTitle: "Si considera que la solicitud debería ser aprobada.",
      }}
      text="Esta acción notificará a los usuarios involucrados en la solicitud."
      open={true}
      onClose={handleClose}
      onConfirm={handleClose}
    />
  );
};
