import { Ident } from "../domain/models/permission/permission.entities";

export const PermisosPostLoginRender : Ident[] = [ // PERMISOS A CONSULTAR
    {
        method: "MODULO",
        originalUrl: "COMUNICADOS",
        module: null
    },
    {
        method: "MODULO",
        originalUrl: "SOLICITUDES",
        module: null
    },
    {
        method: "MODULO",
        originalUrl: "HORARIOS",
        module: null
    },
    {
        method: "MODULO",
        originalUrl: "VACANTES",
        module: null
    },
    {
        method: "MODULO",
        originalUrl: "CONTRATOS",
        module: null
    },
    {
        method: "MODULO",
        originalUrl: "EMPLEADOS",
        module: null
    }
]

export const PermisosNews: Ident[] = [
    {
        method: 'GET',
        originalUrl: "/api/news/births",
        module: null
    },{
        method: "GET",
        originalUrl: "/api/news/",
        module: null
    },{
        method: 'POST',
        originalUrl: "/api/news/",
        module: null
    },{
        method: 'DELETE',
        originalUrl: "/api/news/",
        module: null
    },{
        method: 'PUT',
        originalUrl: "/api/news/",
        module: null
    },{
        method: "GET",
        originalUrl: "/api/commentary/",
        module: null
    },{
        method: "POST",
        originalUrl: "/api/commentary/",
        module: null
    }
]