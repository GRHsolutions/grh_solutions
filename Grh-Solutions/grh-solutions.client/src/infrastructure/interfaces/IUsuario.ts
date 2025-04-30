import { Login, RegisterConfirmation, RegisterForm, ReturnableLogin } from "../../domain/models/usuario/login.entities";

export interface ILoginRepository {
    register(usuario: RegisterForm): Promise<RegisterConfirmation>;
    login(login: Login): Promise<ReturnableLogin>
}