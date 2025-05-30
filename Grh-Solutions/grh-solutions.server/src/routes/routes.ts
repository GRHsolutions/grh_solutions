import { Router } from 'express';
import Login from './login';
import TypeDocuments from './typeDocument';
import User from './user';

const routes = Router();

routes.use('/login', Login);
routes.use('/typeDocuments', TypeDocuments);
routes.use('/user', User)

export default routes;