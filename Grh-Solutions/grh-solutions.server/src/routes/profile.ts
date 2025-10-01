import express from 'express';
import { validationSchemaHandler } from '../middleware/validationSquema';
import { profileController } from '../controllers/profile.controller';
import { validateToken } from '../middleware/tokens.middlewares';

const router = express.Router();

const validationSchema = [
  { name: 'user', type: 'string', required: true },
  { name: 'name', type: 'string', required: true },
  { name: 'lastname', type: 'string', required: true },
  { name: 'date_of_birth', type: 'string', required: true },
  { name: 'email', type: 'string', required: true },
  { name: 'address', type: 'string', required: true },
  { name: 'number_phone', type: 'number', required: true },
  { name: 'telephone', type: 'number', required: false },
  { name: 'rh', type: 'string', required: true },
  { name: 'status', type: 'string', required: true },
  { name: 'type_document', type: 'string', required: true },
  { name: 'document', type: 'number', required: true }
];

// Rutas protegidas con token y validador

router.get('/getAll',  profileController.getAll);
router.get('/getById',  profileController.getById);
router.get('/getByUserId',  profileController.getByUserId);

router.post('/create',  validationSchemaHandler({ schema: validationSchema }), profileController.create);
router.put('/update',  validationSchemaHandler({ schema: validationSchema }), profileController.update);
router.delete('/delete',  profileController.delete);

router.get('/getPaginated',  profileController.getPaginated);
router.get('/getTotalPages',  profileController.getTotalPages);

router.get('/lab-cert', validateToken, profileController.getCertificado)


export default router;
