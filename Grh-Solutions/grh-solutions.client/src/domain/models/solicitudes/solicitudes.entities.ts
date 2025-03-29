import { Dayjs } from "dayjs";
import { Usuario } from "../usuario/user.entities";

export interface Solicitud {
  radicado: string;
  titulo: string;
  estado: string;
  tipo: string;
  desde: Dayjs;
  hasta: Dayjs;
  creadoPor: Usuario;
}

