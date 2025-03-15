import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import { CompoRender } from "./CompoRender";
//componentes usando lazy para la carga mas rapida de la pagina
const Homepage = lazy(() => import("../pages/home/Home"));
const Comunicados = lazy(() => import("../pages/comunicados/Comunicados"));
const Index = lazy(() => import("../pages/index"))
const Postulate = lazy(() => import("../pages/postulate/postulate"))
// Rutas de la aplicaci�n

export const AppRoutes = (): RouteObject[] => {
  return [
    {
      path: "/home",
      element: <>{CompoRender({ element: Homepage })}</>, 
    },
    {
      path: "/comunicados",
      element: <>{CompoRender({ element: Comunicados })}</>,
    },
    {
      path: "/",
      element: <>{CompoRender({ element: Index })}</>,
    },
    {
      path: "/postulate",
      element: <>{CompoRender({ element: Postulate })}</>,
    }
  ];
};
