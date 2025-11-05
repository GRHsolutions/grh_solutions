import { Dayjs } from "dayjs";

export type Employment = {
    idEmployment: string, // USAR ID GUARDANDO EL ORDEN DE CREACION POR OBJETO, OSEA DEBE SER UN CONTEO 1,2,3, ESTO SERVIRA EN UN FUTURO
    position: string, 
    employedBy: string,
    city: string, 
    present: boolean // SI ES TRUE VA A ESTABLECER END DATE EN UNDEFINED, YA QUE PRESENT SE REFIERE SI SIGUE ACTUALMNENTE EJERCIENDO ESE CARGO
    startDate: Dayjs, // CUANDO EMPEZO A EJERCER ESE TRABAJO
    endDate?: Dayjs
}
