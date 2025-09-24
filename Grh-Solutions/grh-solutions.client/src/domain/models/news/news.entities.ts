import { Dayjs } from "dayjs";
import { DragNDropVariables } from "../../../generics/grh-generics/DragNDrop";
import { NewsPagination } from "../pagination/pagination";

export type News = {
    _id: string;
    title: string;
    description: string;
    images: DragNDropVariables[];
    formulary: Formulary;
    status: string;
    type: "simple-publication" | "publication-with-images" | "publication-with-survey"
    numberLikes: number;
    numberDisLikes: number;
    date: Dayjs;
    madeBy: MadeBy; // SI NO SE POPULIZA LLEGA COMO UN STRING
    [key: string] : any;
}

export type MadeBy = {
    _id: string,
    email: string,
    nombre: string,
    foto: string
}

export type Formulary = {
    id: number;
    form: RawFormulary[]
};

export type RawFormulary = {
    description: string,
    marked: boolean
}

export type Commentary = {
    id: number,
    comment: string,
    madeBy: number,
}

export interface NewsFilter extends NewsPagination {
    status?: string | undefined;
}

export type Birthday = {
    _id: number;
    photo: string;
    name: string;
    lastname: string;
    email: Dayjs;
}

export type NewForm = {
    _id: string;
    type: string;
    title: string;
    description: string;
    images: DragNDropVariables[];
    form: object // todavia no decidido
}