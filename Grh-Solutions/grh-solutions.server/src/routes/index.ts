import TaskRoute from './task.route';
import UserRoute from './user.Routes';
import { Router } from 'express';

const routes = Router();

routes.use('/task', TaskRoute)
routes.use('/users', UserRoute);

export default routes;