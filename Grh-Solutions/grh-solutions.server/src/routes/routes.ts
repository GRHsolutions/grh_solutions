import { Router } from 'express';
import Login from './login';
import TypeDocuments from './typeDocument';
import User from './user';
import rol from './rol';
import Vacancies from './vacancies';
import TypeContract from './typeContract';

const routes = Router();

routes.use('/login', Login);
routes.use('/typeDocuments', TypeDocuments);
routes.use('/user', User);
routes.use('/rol', rol);
routes.use('/vacancies', Vacancies);
routes.use('/typeContract', TypeContract);

export default routes;