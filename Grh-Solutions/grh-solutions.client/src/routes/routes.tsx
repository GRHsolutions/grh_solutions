import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import { CompoRender } from "./CompoRender";

//componentes usando lazy para la carga mas rapida de la pagina
//const Homepage = lazy(() => import("../pages/home/Home"));
const Comunicados = lazy(() => import("../pages/comunicados/Comunicados"));
const Index = lazy(() => import("../pages/index"));
const Postulate = lazy(() => import("../pages/postulate/postulate"));
const BoundaryRoute = lazy(() => import("./boundaryCompo"));
const SolicitudesPage = lazy(()=> import("../pages/solicitudes/SolicitudesPages"))
const TryColorsAndGenerics = lazy(() => import("./../pages/TryColorsAndGenerics/TryColorsAndGenerics"))
const UserPage = lazy(() => import("../pages/user/UserPage"));
const Horarios = lazy(() => import("../pages/horarios/horarios"));
const HojaVidaPage = lazy(() => import("../pages/hojaVida/HojaVidaPage"));
const Empleados = lazy(() => import ("../pages/empleados/Empleados"));
const Contratos = lazy(() => import ("../pages/contratos/Contratos"));
// Rutas de la aplicaci�n

export const AppRoutes = (): RouteObject[] => {
  return [
    {
      path: "/",
      index: true,
      element: <>{CompoRender({ element: Index })}</>, 
    },
    {
      path: "/comunicados",
      element: <>{CompoRender({ element: Comunicados })}</>,
    },
    // {
    //   path: "/",
    //   element: <>{CompoRender({ element: Index })}</>,
    // },
    {
      path: "/postulate",
      element: <>{CompoRender({ element: Postulate })}</>,
    },
    {
      path: "*",
      element: <>{CompoRender({ element: BoundaryRoute, isBoundary: true })}</>,
    },
    {
      path: "/solicitudes",
      element: <>{CompoRender({ element: SolicitudesPage })}</>
    },
    {
      path: "/demo-items",
      element: <>{CompoRender({ element: TryColorsAndGenerics })}</>
    },
    {
      path: "/user/:id",
      element: <>{CompoRender({ element: UserPage })}</>
    },
    {
      path: "/horarios",
      element: <>{CompoRender({ element: Horarios })}</>
    },
    {
      path: "/hv-user",
      element: <>{CompoRender({ element: HojaVidaPage })}</>
    },
    {
      path: "/empleados",
      element: <>{CompoRender({ element: Empleados })}</>
    },
    {
      path: '/contratos',
      element: <>{CompoRender({ element: Contratos})}</>
    }
  ];
};
