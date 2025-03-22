import { Dayjs } from "dayjs";

export type News = {
    id: number;
    title: string;
    description: string;
    images: string[];
    status: string;
    type: "simple-publication" | "publication-with-images" | "publication-with-survey"
    numberLikes: number;
    numberDisLikes: number;
    date: Dayjs;
    madeBy: string;
}

export type Commentary = {
    id: number,
    comment: string,
    madeBy: number,
}

export type NewsFilter = {
    status: string;
}

export type Birthday = {
    id: number;
    photo: string;
    name: string;               
    date: Dayjs;
}