import axios, { AxiosPromise } from "axios"

const LOGINMAINAPI = "/api/postulante";
export const getPostulantes = (vacantId: string, token: string): AxiosPromise => {
  const url = `${LOGINMAINAPI}/getAllByVacante/${vacantId}`;
  return axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
}

export const CreatePostulante = (
  vacanteId: string,
  status: string,
  token: string
): AxiosPromise => {
  const url = `${LOGINMAINAPI}/create`;

  const body = {
    vacante: vacanteId,
    status,
  };

  return axios.post(url, body, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};