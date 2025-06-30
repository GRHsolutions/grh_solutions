import React from "react";
import { localStorageUtil } from "../utils/localStorage";
import { LoginRepository } from "../infrastructure/repositories/usuario";
import { LoginService } from "../domain/services/login/login.service";
import { ReturnableLogin } from '../domain/models/usuario/login.entities';

interface AuthContextType {
  auth: ReturnableLogin;
  login: (correo: string, contr: string) => Promise<boolean>;
  logout: () => void;
  isLoggedIn: boolean;
}

export const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Inicializar auth desde localStorage, asegurándose de que esté de acuerdo con ReturnableLogin
  const initialAuthState = {
    user: {
      correo: localStorageUtil.get("usr_items_correo") || "",
      photo: localStorageUtil.get("usr_items_photo") || "",
    },
    token: localStorageUtil.get("usr_items_token") || "",
  } as ReturnableLogin;

  const [auth, setAuth] = React.useState<ReturnableLogin>(initialAuthState);
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(!!initialAuthState.token);
  const service = new LoginService(new LoginRepository());

  // Maneja el login de manera asíncrona
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await service.login({ email, password});
      
      // Actualizar estado de autenticación
      setAuth({
        user: {
          email: res.user.email,
          photo: res.user.photo,
        },
        token: res.token,
      });

      // Guardar los datos en localStorage
      localStorageUtil.set("usr_items_token", res.token);
      localStorageUtil.set("usr_items_correo", res.user.email); // Aquí, si es necesario puedes usar un campo diferente
      if (res.user.photo) localStorageUtil.set("usr_items_photo", res.user.photo);
      if (res.user.email) localStorageUtil.set("usr_items_correo", res.user.email);

      setIsLoggedIn(true); // Establecer como logueado

      return true;
    } catch (err) {
      console.error("Error en el login:", err);
      setIsLoggedIn(false); // Establecer como no logueado en caso de error
      return false;
    }
  };

  // Maneja el logout
  const logout = () => {
    localStorageUtil.deleteExclude(["theme"]);
    setIsLoggedIn(false); // Deslogueado, se establece isLoggedIn en false
    setAuth({
      user: { correo: "", photo: "" },
      token: "",
    }); // Limpiar auth
  };

  const actualValues = {
    auth,
    login,
    logout,
    isLoggedIn,
  };

  return <AuthContext.Provider value={actualValues}>{children}</AuthContext.Provider>;
};
