import StopCircleIcon from "@mui/icons-material/StopCircle";
import SimpleDialog from '../../../../generics/dialogGeneric/dialogo';
import { http } from "../../../../infrastructure/axios/axios";

interface EliminarSolicitudProps {
  open: boolean;
  handleClose: () => void;
  requestId: string;
  onDeleted?: () => void;
}

export const EliminarSolicitud = ({
  open,
  handleClose,
  requestId,
  onDeleted,
}: EliminarSolicitudProps) => {
  const handleConfirm = async () => {
    if (!requestId) {
      window.alert("No hay una solicitud seleccionada.");
      return;
    }
    try {
      await http.put(`/api/request/update?id=${requestId}`, {
        status: "eliminada",
      });

      if (onDeleted) onDeleted();
      handleClose();
    } catch (error: any) {
      console.error("Error al eliminar solicitud:", error);
      const msg =
        error?.response?.data?.message ||
        "Ocurrió un error al eliminar la solicitud.";
      window.alert(msg);
    }
  };

  return (
    <SimpleDialog
      header={{
        icon: <StopCircleIcon />,
        title: "¿Desea eliminar la solicitud?",
        subTitle: "Si considera que la solicitud debería ser eliminada.",
      }}
      text="Esta acción notificará a los usuarios involucrados en la solicitud."
      open={open}
      onClose={handleClose}
      onConfirm={handleConfirm}
    />
  );
};
