import { useState, useCallback } from "react";
import { http } from "../infrastructure/axios/axios";
import {
  Ident,
  VerifiedPermission,
} from "../domain/models/permission/permission.entities";

export function usePermissions(
  route: string,
) {
  const [permissions, setPermissions] = useState<
    {
      ident: Ident;
      granted: boolean;
    }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPermissions = useCallback(async (idents: Ident[]) =>{
    if (!idents || idents.length === 0) {
      setError("No idents provided");
      throw ("NO IDENTS PROVIDED")
    }

    setLoading(true);
    try {
      const response = await http.post<VerifiedPermission>(
        "/api/permission/getPermissions",
        { idents }
      );
      if (!response.success) {
        throw setError("Failed to fetch permissions");
      }

      setPermissions(response.permissions);

      // 💾 Guardar en localStorage para uso global
      localStorage.setItem(`permissions-${route}`, JSON.stringify(response.permissions));

      setError(null);
    } catch (err: unknown) {
      console.error("Error fetching permissions:", err);
      const errorMessage = err && typeof err === 'object' && 'response' in err && 
        err.response && typeof err.response === 'object' && 'data' in err.response &&
        err.response.data && typeof err.response.data === 'object' && 'message' in err.response.data
        ? String(err.response.data.message)
        : "Error al obtener permisos";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const hasPermission = useCallback(
    (method: string, originalUrl: string): boolean => {
      console.log("Verificando permiso para:", { method, originalUrl });
      const stored = localStorage.getItem(`permissions-${route}`);

      const perms = stored
        ? (JSON.parse(stored) as {
            ident: Ident;
            granted: boolean;
          }[])
        : permissions;

      return perms.some(
        (p) =>
          p.ident.method.toUpperCase() === method.toUpperCase() &&
          p.ident.originalUrl === originalUrl &&
          p.granted
      );
    },
    []
  );

  return { 
    permissions, 
    fetchPermissions, 
    hasPermission, 
    loading, 
    error 
  };
}