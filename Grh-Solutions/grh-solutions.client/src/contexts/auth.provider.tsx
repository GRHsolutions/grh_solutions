import React from "react";
import { localStorageUtil } from "../utils/localStorage";

// Definición de tipos
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
}

// Creación del contexto
export const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

// Proveedor del contexto
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [auth, setAuth] = React.useState<Auth>({
    token: localStorageUtil.get("usr_items_token"),
    usrName: localStorageUtil.get("usr_items_usrName"),
    photo: localStorageUtil.get("usr_items_photo"), // Corregí el nombre aquí
    correo: localStorageUtil.get("usr_items_correo"),
  });

  React.useEffect(() => {
    // Sincroniza cambios en localStorage con el estado
    setAuth({
      token: localStorageUtil.get("usr_items_token"),
      usrName: localStorageUtil.get("usr_items_usrName"),
      photo: localStorageUtil.get("usr_items_photo"),
      correo: localStorageUtil.get("usr_items_correo"),
    });
  }, []);

  // Función de inicio de sesión
  const login = (token: string, usrName: string, photo?: string, correo?: string) => {
    const newAuth = { token, usrName, photo: photo || null, correo: correo || null };
    setAuth(newAuth);
    localStorageUtil.set("usr_items_token", token);
    localStorageUtil.set("usr_items_usrName", usrName);
    if (photo) localStorageUtil.set("usr_items_photo", photo);
    if (correo) localStorageUtil.set("usr_items_correo", correo);
  };

  // Función de cierre de sesión
  const logout = () => {
    localStorageUtil.clear();
    setAuth({ token: null, usrName: null, photo: null, correo: null });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
