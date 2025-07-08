interface ICvFormation {
  tittle: string;
  school: string;
  city: string;
  startDate: string;
  endDate: string;
  description?: string;
}

interface ICvSkill {
  name: string;
}

interface ICvLanguage {
  name: string;
  level: string;
}

export interface ICv {
  _id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  secondLastName: string;
  perfil: string;
  mail: string;
  phone: string;
  address: string;
  city: string;
  birthDay: string;
  postal?: string;
  fromUser: string;
  skills: ICvSkill[];
  lenguages: ICvLanguage[];
  formations: ICvFormation[];
  __v?: number;
}
