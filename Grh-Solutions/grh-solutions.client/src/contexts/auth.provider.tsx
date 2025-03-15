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
  const [auth, setAuth] = React.useState<Auth>({
    token: localStorageUtil.get("usr_items_token"),
    usrName: localStorageUtil.get("usr_items_usrName"),
    photo: localStorageUtil.get("usr_items_photo"),
    correo: localStorageUtil.get("usr_items_correo"),
  });

  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);

  React.useEffect(() => {
    const token = localStorageUtil.get("usr_items_token");
    setIsLoggedIn(token !== null); 
  }, []); 

  const login = (token: string, usrName: string, photo?: string, correo?: string) => {
    const newAuth = { token, usrName, photo: photo || null, correo: correo || null };
    setAuth(newAuth);
    localStorageUtil.set("usr_items_token", token);
    localStorageUtil.set("usr_items_usrName", usrName);
    if (photo) localStorageUtil.set("usr_items_photo", photo);
    if (correo) localStorageUtil.set("usr_items_correo", correo);
    setIsLoggedIn(true); 
  };

  const logout = () => {
    localStorageUtil.clear();
    setAuth({ token: null, usrName: null, photo: null, correo: null });
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
