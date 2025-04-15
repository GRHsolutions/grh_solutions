import React from "react";
import { localStorageUtil } from "../utils/localStorage";

interface Auth {
  token: string | null;
  usrName: string | null;
  photo: string | null;
  correo: string | null;
}

interface AuthContextType {
  auth: Auth;
  login: (token: string, usrName: string, photo?: string, correo?: string) => void;
  logout: () => void;
  isLoggedIn: boolean;
}

export const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Inicializar auth desde localStorage
  const initialAuthState = {
    token: localStorageUtil.get("usr_items_token"),
    usrName: localStorageUtil.get("usr_items_usrName"),
    photo: localStorageUtil.get("usr_items_photo"),
    correo: localStorageUtil.get("usr_items_correo"),
  } as Auth;

  const [auth, setAuth] = React.useState<Auth>(initialAuthState);
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(!!initialAuthState.token);

  // Maneja el login
  const login = (token: string, usrName: string, photo?: string, correo?: string) => {
    const newAuth = { token, usrName, photo: photo || null, correo: correo || null };
    setAuth(newAuth);
    localStorageUtil.set("usr_items_token", token);
    localStorageUtil.set("usr_items_usrName", usrName);
    if (photo) localStorageUtil.set("usr_items_photo", photo);
    if (correo) localStorageUtil.set("usr_items_correo", correo);
    setIsLoggedIn(true); // Establece isLoggedIn al login exitoso
  };

  // Maneja el logout
  const logout = () => {
    localStorageUtil.deleteExclude(["theme"]);
    setIsLoggedIn(false); // Deslogueado, se establece isLoggedIn en false
  };

  const actualValues = {
    auth: auth,
    login: login,
    logout: logout,
    isLoggedIn: isLoggedIn
  } as AuthContextType;

  return (
    <AuthContext.Provider value={actualValues}>
      {children}
    </AuthContext.Provider>
  );
};
