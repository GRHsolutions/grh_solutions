import { Dayjs } from "dayjs";
import { Usuario } from "../usuario/user.entities";

export type Horarios = {
    id: number;
    tipoHorario: TipoHorario;
    fechaInicio: Dayjs;
    fechaFin: Dayjs;
    creadoPor: Usuario;
    grupo: Grupo;
}

export type Grupo = {
    id: number;
    nombre: string;
    usuarios: Usuario[];
}

export type TipoHorario = {
    id: number;
    nombre: string;
    descripcion: string;
    horaInicial: string;
    horaFinal: string;
}

export interface HorariosFilter {
    esMio: boolean;
    tipoHorario: string;
    fechaInicio: Dayjs;
    fechaFin: Dayjs;
    creadoPor: Usuario;
}