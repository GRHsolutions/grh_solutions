import { Router } from 'express';
import Login from './login';
import TypeDocuments from './typeDocument';
import User from './user';
import rol from './rol';

const routes = Router();

routes.use('/login', Login);
routes.use('/typeDocuments', TypeDocuments);
routes.use('/user', User);
routes.use('/rol', rol);

export default routes;