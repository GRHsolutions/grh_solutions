import React from "react";
import { usePermissions } from "./permissions.provider";
import { localStorageUtil } from "../utils/localStorage";
import { PermisosNews } from "../const/permisos";

interface NewsSecureContextType {
  isAuthorized: boolean;
  hasPermission: (method: string, originalUrl: string) => boolean;
}

export const NewsSecureContext = React.createContext<
  NewsSecureContextType | undefined
>(undefined);

export const NewsSecureProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { 
    fetchPermissions, 
    hasPermission 
  } = usePermissions(
    "news-permissions-for-renderers"
  );
  const [isAuthorized, setIsAuthorized] = React.useState(false);

  // 🔄 Este useEffect se ejecuta AL MONTAR el componente
  React.useEffect(() => {
    console.log("🔄 Iniciando verificación de permisos...");

    const fetch = async () => {
      try {
        // 1️⃣ Guardar el módulo actual
        localStorageUtil.set<string>("current_module", "Comunicados");

        // 2️⃣ Traer los permisos (esto puede tomar tiempo)
        await fetchPermissions(PermisosNews);

        console.log("✅ Permisos cargados correctamente");

        // 3️⃣ SOLO cuando termine, marcamos como autorizado
        setIsAuthorized(true);
      } catch (error) {
        console.error("❌ Error al cargar permisos:", error);
        // Opcional: manejar el error
        setIsAuthorized(false);
      }
    };

    fetch();
  }, []); // Array vacío = solo se ejecuta una vez al montar
  
  return (
    <NewsSecureContext.Provider
      value={{
        isAuthorized,
        hasPermission,
      }}
    >
      {children}
    </NewsSecureContext.Provider>
  );
};

// Hook personalizado para acceder al contexto
export const useNewsSecurity = () => {
  const context = React.useContext(NewsSecureContext);
  if (!context) {
    throw new Error(
      "useNewsSecurity debe usarse dentro de un NewsSecureProvider"
    );
  }
  return context;
};
