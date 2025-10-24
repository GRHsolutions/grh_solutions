import React from "react";
import { usePermissions } from "./permissions.provider";

interface NewsSecureContextType {
    permissions: Record<string, boolean>;
}

export const NewsSecureContext = React.createContext<NewsSecureContextType | undefined>(
  undefined
);

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const NewsSecureProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
    const [permissions, setPermissions] = React.useState<Record<string, boolean>>();
    const {
        loading,
        fetchPermissions
    } = usePermissions("news-permissions-for-renderers");


  const actualValues = {
  };

  return (
    <NewsSecureContext.Provider value={actualValues}>{children}</NewsSecureContext.Provider>
  );
};
