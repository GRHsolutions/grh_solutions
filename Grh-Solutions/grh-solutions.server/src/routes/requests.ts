import express from 'express';
import { solicitudesController } from '../controllers/requests.controller';
import { validateToken } from '../middleware/tokens.middlewares';
import { validationSchemaHandler } from '../middleware/validationSquema';

const router = express.Router();


const validationSchema = [
  { name: 'users', required: true, type: 'string' },
  { name: 'title', required: true, type: 'string' },
  { name: 'status', required: true, type: 'string' },
  { name: 'type_request', required: true, type: 'string' },
  { name: 'info', required: false, type: 'string' },
];


router.post(
  '/create',
  validateToken,
  validationSchemaHandler({ schema: validationSchema }),
  solicitudesController.create
);


router.get('/getAll', validateToken, solicitudesController.getAll);


router.get('/getById/:id', validateToken, solicitudesController.getById);


router.put(
  '/update/:id',
  validateToken,
  validationSchemaHandler({ schema: validationSchema }),
  solicitudesController.update
);


router.delete('/delete/:id', validateToken, solicitudesController.delete);

export default router;
