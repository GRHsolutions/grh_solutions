import { Router } from "express";
import Login from "./login";
import TypeDocuments from "./typeDocument";
import User from "./user";
import rol from "./rol";
import Vacancies from "./vacancies";
import TypeContract from "./typeContract";
import postulante from "./postulante";
import { validateToken } from '../middleware/tokens.middlewares';
// import { verifyPermissionHandler } from '../middleware/verifyPermission.middleware';
import permission from "./permission";
import schedules from "./schedules";
import area from "./area";
import scheduleType from "./scheduleType";
import group from "./group";
import puesto from "./puesto";
import empleado from "./empleados";
import news from "./news";
import profileRoutes from "./profile";
import commentary from './commentary';
import contract from "./contract"
import requests from './requests';
import report from "./report";
import module from "./module";
import Involved from "./involved";
import history from "./history"
import cv from './cv';
import signatures from './signatures';

const routes = Router();
//Apply middlewares globally to all routes
routes.use(validateToken);
// routes.use(verifyPermissionHandler);

//Define routes
routes.use("/login", Login);
routes.use("/typeDocuments", TypeDocuments);
routes.use("/user", User);
routes.use("/rol", rol);
routes.use("/vacancies", Vacancies);
routes.use("/typeContract", TypeContract);
routes.use("/postulante", postulante);
routes.use("/permission", permission);
routes.use("/schedules", schedules);
routes.use("/area", area);
routes.use("/scheduleType", scheduleType);
routes.use("/group", group);
routes.use("/puesto", puesto);
routes.use("/empleados", empleado);
routes.use("/news", news);
routes.use('/commentary', commentary)
routes.use("/profiles", profileRoutes);
routes.use("/contract", contract);
routes.use('/request', requests);
routes.use('/report', report);
routes.use('/modules', module);
routes.use("/involved", Involved)
routes.use("/history", history)
routes.use("/cv", cv)
routes.use("/signatures", signatures);

export default routes;
