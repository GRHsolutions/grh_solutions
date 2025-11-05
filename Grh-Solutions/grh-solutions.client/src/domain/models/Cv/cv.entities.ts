import { Dayjs } from "dayjs";

// src/domain/models/cv/cv.entities.ts
export type SkillLevel = "PRINCIPIANTE" | "INTERMEDIO" | "BUENO" | "ALTO" | "EXCELENTE";
export type LanguageLevel = 
  | "PRINCIPIANTE"
  | "INTERMEDIO"
  | "BUENO"
  | "ALTO"
  | "FLUIDO"
  | "A1"
  | "A2"
  | "B1"
  | "B2"
  | "C1"
  | "C2";

export interface Skill {
  name: string;
  level: SkillLevel;
  index?: number;
}

export interface Language {
  name: string;
  index?: number;
  level: LanguageLevel;
}

export interface Formation {
  tittle: string;
  school: string;
  city: string;
  startDate: Dayjs; 
  endDate?: Dayjs;
  finished: boolean;
  descroption?: string;
  index?: number;
}

export interface Cv {
  _id?: string;
  firstName: string;
  middleName?: string | null;
  lastName: string;
  secondLastName?: string | null;
  mail: string;
  phone: string;
  address?: string;
  postal?: string;
  city?: string;
  birthDay?: Dayjs;
  perfil?: string;
  formations: Formation[];
  skills: Skill[];
  lenguages: Language[];
  none: [] // ESTO NO QUITAR SE DANA OTRA COSAJ AJAJAJA
  fromUser: string; // user ID
}
