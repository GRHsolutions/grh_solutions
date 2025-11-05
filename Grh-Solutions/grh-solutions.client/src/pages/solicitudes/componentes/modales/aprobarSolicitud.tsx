import GppGoodIcon from "@mui/icons-material/GppGood";
import SimpleDialog from "../../../../generics/dialogGeneric/dialogo";
import { http } from "../../../../infrastructure/axios/axios";

interface AprobarSolicitudProps {
  open: boolean;
  handleClose: () => void;
  requestId: string;
  onApproved?: () => void;
}

export const AprobarSolicitud = ({
  open,
  handleClose,
  requestId,
  onApproved,
}: AprobarSolicitudProps) => {
  const handleConfirm = async () => {
    if (!requestId) {
      window.alert("No hay una solicitud seleccionada.");
      return;
    }

    try {
      await http.put(`/api/request/update?id=${requestId}`, {
        status: "aprobada",
      });

      if (onApproved) onApproved();
      handleClose();
    } catch (error: any) {
      console.error("Error al aprobar solicitud:", error);
      const msg =
        error?.response?.data?.message ||
        "Ocurrió un error al aprobar la solicitud.";
      window.alert(msg);
    }
  };

  return (
    <SimpleDialog
      header={{
        icon: <GppGoodIcon />,
        title: "¿Desea aprobar la solicitud?",
        subTitle: "Si considera que la solicitud debería ser aprobada.",
      }}
      text="Esta acción notificará a los usuarios involucrados en la solicitud."
      open={open}
      onClose={handleClose}
      onConfirm={handleConfirm}
    />
  );
};
