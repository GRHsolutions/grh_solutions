import GppBadIcon from "@mui/icons-material/GppBad";
import SimpleDialog from "../../../../generics/dialogGeneric/dialogo";
import { http } from "../../../../infrastructure/axios/axios";

interface RechazarSolicitudProps {
  open: boolean;
  handleClose: () => void;
  requestId: string;
  profileId: string;
  onRejected?: () => void;
}

export const RechazarSolicitud = ({
  open,
  handleClose,
  requestId,
  profileId,
  onRejected,
}: RechazarSolicitudProps) => {

  const handleConfirm = async () => {
    if (!requestId) {
      window.alert("No hay una solicitud seleccionada.");
      return;
    }
    if (!profileId) {
      window.alert("No hay perfil para notificar.");
      return;
    }

    try {
      // 1️⃣ Actualizar el estado de la solicitud
      await http.put(`/api/request/update?id=${requestId}`, {
        status: "rechazada",
      });

      // 2️⃣ Crear historial
      await http.post("/api/history", {
        requestId,
        profileId,
        description: "Se cambió el estado de 'pendiente' a 'rechazada'",
        createdAt: new Date().toISOString(),
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
