import { Dayjs } from "dayjs";
export interface EmpleadoDemo {
  _id: string;
  area: {
    _id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  user: {
    _id: string;
    email: string;
    password?: string; // normalmente no se debería exponer, pero lo dejo opcional
    rol: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  puesto: {
    _id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  status: "activo" | "inactivo" | string; // puedes ajustar los estados reales
  fechaContratacion?: Dayjs; // si tu app la usa
  [key: string]: any; // extensible para futuras propiedades
}