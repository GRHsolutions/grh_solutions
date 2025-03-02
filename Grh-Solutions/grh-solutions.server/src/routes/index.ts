import LoginRoute from './login.route';
import UserRoute from './user.Routes';
import { Router } from 'express';

const routes = Router();

routes.use('/login', LoginRoute)
routes.use('/users', UserRoute);

export default routes;