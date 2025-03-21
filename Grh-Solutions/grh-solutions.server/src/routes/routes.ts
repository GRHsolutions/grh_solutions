import { Router } from 'express';
import Login from './login';

const routes = Router();

routes.use('/login', Login);

export default routes;