import { Usuario } from "../../domain/models/usuario/user.entities";

export interface IUsuarioRepository {
    register(usuario: Usuario): Promise<Usuario>;
    login(correo: string, contrasena: string): Promise<Usuario>
}