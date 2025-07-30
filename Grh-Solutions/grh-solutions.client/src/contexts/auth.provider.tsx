import React from "react";
import { localStorageUtil } from "../utils/localStorage";
import { LoginRepository } from "../infrastructure/repositories/usuario";
import { LoginService } from "../domain/services/login/login.service";
import { ReturnableLogin } from "../domain/models/usuario/login.entities";

interface AuthContextType {
  auth: ReturnableLogin;
  login: (
    correo: string,
    contr: string
  ) => Promise<{ t: LoginNoti; m: string }>;
  logout: () => void;
  isLoggedIn: boolean;
}

type LoginNoti = "SUCCESS" | "SUCCESS-CRAETE-CV" | "ERROR";

export const AuthContext = React.createContext<AuthContextType | undefined>(
  undefined
);

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Inicializar auth desde localStorage, asegurándose de que esté de acuerdo con ReturnableLogin
  const initialAuthState = {
    user: {
      email: localStorageUtil.get("usr_items_correo") || "",
      photo: localStorageUtil.get("usr_items_photo") || "",
    },
    token: localStorageUtil.get("usr_items_token") || "",
  } as ReturnableLogin;

  const [auth, setAuth] = React.useState<ReturnableLogin>(initialAuthState);
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(
    !!initialAuthState.token
  );
  const service = new LoginService(new LoginRepository());

  // Maneja el login de manera asíncrona
  const login = async (
    email: string,
    password: string
  ): Promise<{ t: LoginNoti; m: string }> => {
    try {
      const res = await service.login({ email, password });

      // Guardar los datos en localStorage
      localStorageUtil.set("usr_items_token", res.token);
      localStorageUtil.set("usr_items_correo", res.user.email); // Aquí, si es necesario puedes usar un campo diferente
      if (res.user.photo)
        localStorageUtil.set("usr_items_photo", res.user.photo);
      if (res.user.email)
        localStorageUtil.set("usr_items_correo", res.user.email);
      setIsLoggedIn(true); // Establecer como logueado      

      // Actualizar estado de autenticación
      setAuth({
        user: {
          email: res.user.email,
          photo: res.user.photo,
        },
        token: res.token,
      });

      if(res.warnings === undefined ){
        //await sleep(2000);
        return {
          t: "SUCCESS",
          m: "Acceso concedido",
        };
      }

      if (res.warnings.message === "Debe crear su hoja de vida") {
        await sleep(2000);
        return {
          t: "SUCCESS-CRAETE-CV",
          m: res.warnings.message,
        };
      }

      return {
        t: "ERROR",
        m: "aa"
      }
      
    } catch (err: any) {
      if (err["message"] && typeof err["message"] === "string") {
        setIsLoggedIn(false); // Establecer como no logueado en caso de error
        return {
          t: "ERROR",
          m: err["message"],
        };
      }
      setIsLoggedIn(false); // Establecer como no logueado en caso de error
      return {
        t: "ERROR",
        m: "Error en el endpoint del login",
      };
    }
  };

  // Maneja el logout
  const logout = () => {
    localStorageUtil.deleteExclude(["theme"]);
    setIsLoggedIn(false); // Deslogueado, se establece isLoggedIn en false
    setAuth({
      user: { email: "", photo: "" },
      token: "",
    }); // Limpiar auth
    window.location.href = "/";
  };

  const actualValues = {
    auth,
    login,
    logout,
    isLoggedIn,
  };

  return (
    <AuthContext.Provider value={actualValues}>{children}</AuthContext.Provider>
  );
};
