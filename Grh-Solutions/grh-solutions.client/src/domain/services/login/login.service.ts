import { ILoginRepository } from "../../../infrastructure/interfaces/IUsuario";
import { Login, RegisterConfirmation, RegisterForm, ReturnableLogin } from "../../models/usuario/login.entities";

export class LoginService {
    constructor(private readonly usuarioRepo: ILoginRepository) {}

    register(rg: RegisterForm): Promise<RegisterConfirmation> {
        return this.usuarioRepo.register(rg);
    }

    login(lgn: Login): Promise<ReturnableLogin> {
        return this.usuarioRepo.login(lgn);
    }
}