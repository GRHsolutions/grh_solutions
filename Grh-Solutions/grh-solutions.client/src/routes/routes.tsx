import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import { CompoRender } from "./CompoRender";
//componentes usando lazy para la carga mas rapida de la pagina
const Homepage = lazy(() => import("../pages/home/Home"));

// Rutas de la aplicaci�n

export const AppRoutes = (): RouteObject[] => {
  return [
    {
      path: "/",
      element: <>{CompoRender({ element: Homepage })}</>, // box con margin top a 5rem para mostrar bien el componente generado papa yiyi
    },
  ];
};
