import { Router } from 'express';
import Login from './login';
import TypeDocuments from './typeDocument';
import User from './user';
import rol from './rol';
import Vacancies from './vacancies';
import TypeContract from './typeContract';
import postulante from './postulante';
// import { validateToken } from '../middleware/tokens.middlewares';
// import { verifyPermissionHandler } from '../middleware/verifyPermission.middleware';
import permission from './permission';
import schedules from './schedules';
import area from './area';
import scheduleType from './scheduleType';
import group from './group';
<<<<<<< Updated upstream
import news from './news';

const routes = Router();

// Apply middlewares globally to all routes
// routes.use(validateToken);
// routes.use(verifyPermissionHandler);
=======
import profileRoutes from './profile';
const routes = Router();

// Apply middlewares globally to all routes

>>>>>>> Stashed changes

//Define routes
routes.use('/login', Login);
routes.use('/typeDocuments', TypeDocuments);
routes.use('/user', User);
routes.use('/rol', rol);
routes.use('/vacancies', Vacancies);
routes.use('/typeContract', TypeContract);
routes.use('/postulante', postulante);
routes.use('/permission', permission);
routes.use('/schedules', schedules);
routes.use('/area', area);
routes.use('/scheduleType', scheduleType);
routes.use('/group', group);
<<<<<<< Updated upstream
routes.use('/news', news)
=======
routes.use('/profiles', profileRoutes);
>>>>>>> Stashed changes

export default routes;