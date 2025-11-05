import GppBadIcon from "@mui/icons-material/GppBad";
import SimpleDialog from "../../../../generics/dialogGeneric/dialogo";
import { http } from "../../../../infrastructure/axios/axios";

interface RechazarSolicitudProps {
  open: boolean;
  handleClose: () => void;
  requestId: string;
  onRejected?: () => void;
}

export const RechazarSolicitud = ({
  open,
  handleClose,
  requestId,
  onRejected,
}: RechazarSolicitudProps) => {
  const handleConfirm = async () => {
    if (!requestId) {
      window.alert("No hay una solicitud seleccionada.");
      return;
    }

    try {
      await http.put(`/api/request/update?id=${requestId}`, {
        status: "rechazada",
      });

      if (onRejected) onRejected();
      handleClose();
    } catch (error: any) {
      console.error("Error al rechazar solicitud:", error);
      const msg =
        error?.response?.data?.message ||
        "Ocurrió un error al rechazar la solicitud.";
      window.alert(msg);
    }
  };

  return (
    <SimpleDialog
      header={{
        icon: <GppBadIcon />,
        title: "¿Desea rechazar la solicitud?",
        subTitle: "Si considera que la solicitud debería ser rechazada.",
      }}
      text="Esta acción notificará a los usuarios involucrados en la solicitud."
      open={open}
      onClose={handleClose}
      onConfirm={handleConfirm}
    />
  );
};
