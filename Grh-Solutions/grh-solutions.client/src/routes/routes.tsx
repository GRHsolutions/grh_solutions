import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import useSuspenseLoader from '../hooks/suspenseLoader';
import { Box } from '@mui/material';
//proveedor
const Homepage = lazy(() => import('./../pages/main'));

// Rutas de la aplicaci�n
export const AppRoutes: RouteObject[] = [
    {
        path: "/", 
        element: <Box mt={'5rem'}>{useSuspenseLoader(Homepage)}</Box>, // box con margin top a 5rem para mostrar bien el componente generado papa yiyi
    },
];
