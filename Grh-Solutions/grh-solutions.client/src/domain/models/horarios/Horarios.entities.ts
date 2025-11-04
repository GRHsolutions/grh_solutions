import { Dayjs } from "dayjs";
import { Usuario } from "../usuario/user.entities";

export interface Horarios {
  _id: string;
  start_date: string; 
  end_date: string; 
  group: Grupo;
  scheduleType: scheduleType;
  createdAt: string;
  updatedAt: string;
}

export interface scheduleType {
    _id: string;
    name: string;
    startTime: string;
    endTime: string;
    createdAt: string;
    updatedAt?: string;
    
}
export type Grupo = {
    _id: string;
    name: string;
    users: Usuario[];
    area: string | {
      _id: string;
      name: string;
    };
    createdAt: string;
    updatedAt?: string;
}

export type TipoHorario = {
    id: number;
    nombre: string;
    descripcion: string;
    horaInicial: string;
    horaFinal: string;
}

export interface HorariosFilter {
    esMio?: boolean;
    tipoHorario?: string;
    fechaInicio?: Dayjs;
    fechaFin?: Dayjs;
    creadoPor?: Usuario;
    totalRow?: number;
}


export interface createHorario {
    startDate: number;
    endDate: Dayjs;
    grupo: number;
    scheduleType: number
}