export type Usuario = {
    id: number, // nose 
    primerNombre: string,
    segundoNombre: string,
    primerApellido: string,
    segundoApellido: string,
    correo: string,
    photo: string | null,
    area: Area | null
}

export type Area = {
    id: number,
    nombre: string
}