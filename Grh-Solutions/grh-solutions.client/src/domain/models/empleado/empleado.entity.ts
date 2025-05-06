import { Dayjs } from "dayjs";

export type Empleado = {

}

export type Cv = {
    idCv: string,
    // DATOS BASICOS DEL USUARIO
    firstName: string,
    middleName: string,
    lastName: string,
    secondLastName: string,
    mail: string, 
    phone: string,
    address: string,
    postal: string,
    city: string,
    birthDate: string, 
    // DESCRIPCION DEL USUARIO PARA LA CV
    perfil: string,
    // APARTIR DE AQUI DEBE HACERSE COMO UNA ESPECIE DE CRUD, BASARSE EN ESTA PAGINA: https://www.cvwizard.com/
    formation: Formation[]; // DEBE HABER UN BOTON PARA AGREGAR UNA FORMACION MAS, YA QUE EL USUARIO PUEDE TENER VARIAS FORMACIONES
    employment: Employment[] // EMPLOYMENT SE REFIERE A LA EXPERIENCIA LABORAL, DEBE HABER UN BOTON PARA AGREGAR VARIAS EXPERIENCIAS LABORALES
    skills: Skills[];
    languages: Languages[]
};

export type Formation = {
    idFormation: string, // USAR ID GUARDANDO EL ORDEN DE CREACION POR OBJETO, OSEA DEBE SER UN CONTEO 1,2,3, ESTO SERVIRA EN UN FUTURO
    title: string,
    school: string,
    city: string, // LOCALIDAD, OSEA DONDE
    startDate: Dayjs, // CUANDO INICIO LA FORMACION
    present: boolean, // SI ES TRUE VA A ESTABLECER END DATE EN UNDEFINED, YA QUE PRESENT SE REFIERE SI SIGUE ACTUALMNENTE EJERCIENDO ESA FORMACION
    endDate?: Dayjs,
    description: string
}

export type Employment = {
    idEmployment: string, // USAR ID GUARDANDO EL ORDEN DE CREACION POR OBJETO, OSEA DEBE SER UN CONTEO 1,2,3, ESTO SERVIRA EN UN FUTURO
    position: string, 
    employedBy: string,
    city: string, 
    present: boolean // SI ES TRUE VA A ESTABLECER END DATE EN UNDEFINED, YA QUE PRESENT SE REFIERE SI SIGUE ACTUALMNENTE EJERCIENDO ESE CARGO
    startDate: Dayjs, // CUANDO EMPEZO A EJERCER ESE TRABAJO
    endDate?: Dayjs
}

export type Skills = {
    idSkill: string, // USAR ID GUARDANDO EL ORDEN DE CREACION POR OBJETO, OSEA DEBE SER UN CONTEO 1,2,3, ESTO SERVIRA EN UN FUTURO
    name: string,
    level: "begginer" | "moderate" | "good" | "very-good" | "excellent",
}

export type Languages = {
    idLanguages: string, // USAR ID GUARDANDO EL ORDEN DE CREACION POR OBJETO, OSEA DEBE SER UN CONTEO 1,2,3, ESTO SERVIRA EN UN FUTURO
    name: string,
    level: "beginner" | "moderate" | "good" | "very-good" | "fluent" | "A1" | "A2" | "B1" | "B2" | "C1" | "C2"
}