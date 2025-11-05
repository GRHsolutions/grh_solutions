import { Dayjs } from "dayjs";
import { DragNDropVariables } from "../../../generics/grh-generics/DragNDrop";
import { NewsPagination } from "../pagination/pagination";
import { User } from "../request/request.entities";

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
    comms: number;
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
    _id: string,
    comment: string,
    madeBy: User,
    createdAt: string,
    updatedAt: string,
    fromNew: News,
    [key: string]: any
}

export type CommentaryFrom = {
    comment: string,
    fromNew: string,
    [key: string]: any
}

export interface NewsFilter extends NewsPagination {
    status?: string | undefined;
    search?: string;
}

export type Birthday = {
    _id: number;
    photo: string;
    name: string;
    lastname: string;
    email: string;
}

export type NewForm = {
    _id: string;
    type: string;
    title: string;
    description: string;
    images: DragNDropVariables[];
    form: object // todavia no decidido
}

export interface CommentaryFilter extends NewsPagination {
    search?: string,
    new?: string
}