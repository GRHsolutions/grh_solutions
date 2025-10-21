import { Box, useTheme } from "@mui/material";
import useSuspenseLoader from "../hooks/suspenseLoader";
import React from "react";
import { usePermissions } from "../contexts/permissions.provider";
import { useLocation } from "react-router-dom";
import { NoGrantedAcces } from "./noGrantedAccess";

interface CompoRenderProps {
  element: React.LazyExoticComponent<React.FC<object>>;
  isBoundary?: boolean;
  skipValidation?: boolean;
}

enum TypesModule {
  "comunicados" = "COMUNICADOS",
  "postulate" = "VACANTES",
  "solicitudes" = "SOLICITUDES",
  "horarios" = "HORARIOS",
  "empleados" = "EMPLEADOS"
}

export const CompoRender = ({ element, isBoundary = false, skipValidation = false }: CompoRenderProps) => {
  const theme = useTheme();
  const { hasPermission } = usePermissions("post-login-renderer");
  const location = useLocation();
  const [granted, setGranted] = React.useState(false);

  // === Determinar módulo según la ruta ===
  const getModuleFromPath = (path: string): TypesModule | undefined => {
    if (path.includes("/comunicados")) return TypesModule.comunicados;
    if (path.includes("/postulate")) return TypesModule.postulate;
    if (path.includes("/solicitudes")) return TypesModule.solicitudes;
    if (path.includes("/horarios")) return TypesModule.horarios;
    if (path.includes("/empleados")) return TypesModule.empleados;
    return undefined;
  };

  const currentModule = getModuleFromPath(location.pathname);

  React.useEffect(() => {
    if (skipValidation) {
      setGranted(true);
      return;
    }

    if (!currentModule) {
      // Si la ruta no corresponde a un módulo, se considera libre
      setGranted(true);
      return;
    }

    const grantAccess = hasPermission("MODULO", currentModule);
    setGranted(grantAccess);
    console.log(`Módulo actual: ${currentModule} → Permiso: ${grantAccess}`);
  }, [isBoundary, currentModule]);

  // === Redirección por defecto si no tiene acceso ===
  const redirectPath = "/";

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        borderBottom: `1px solid ${theme.palette.divider}`,
        p: 1,
        display: "flex",
        height: "100%",
        overflowY: "hidden",
      }}
    >
      {granted ? (
        <>{useSuspenseLoader(element)}</>
      ) : (
        <NoGrantedAcces
          redirect={redirectPath}
          noGrantedTo={currentModule ?? "este módulo"}
        />
      )}
    </Box>
  );
};
