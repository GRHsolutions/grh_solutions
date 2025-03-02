import { Usuario } from "../../domain/models/Usuario";

export interface IUsuarioRepository {
    register(usuario: Usuario): Promise<Usuario>;
    login(correo: string, contrasena: string): Promise<Usuario>
}