import {
  RegisterForm,
  RegisterConfirmation,
  Login,
  ReturnableLogin,
} from "../../domain/models/usuario/login.entities";
import { http } from "../axios/axios";
import { ILoginRepository } from "../interfaces/IUsuario";

const LOGINMAINAPI = "/api/login";

export class LoginRepository implements ILoginRepository {
  async login(login: Login): Promise<ReturnableLogin> {
    try {
      const response = await http.post<ReturnableLogin>(
        `${LOGINMAINAPI}/login`,
        login
      );
      return response;
    } catch (e) {
      throw e;
    }
  }

  async register(usuario: RegisterForm): Promise<RegisterConfirmation> {
    try {
      const response = await http.post<RegisterConfirmation>(
        `${LOGINMAINAPI}/register`, 
        usuario
      );
      return response;
    } catch (e) {
      throw e;
    }
  }
}
