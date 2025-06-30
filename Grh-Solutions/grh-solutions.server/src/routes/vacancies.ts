import express from 'express';
import { validationSchemaHandler } from '../middleware/validationSquema';
import { vacanciesController } from '../controllers/vacancies.controller';
import { validateToken } from '../middleware/tokens.middlewares';
const router = express.Router();
const validationSchema = [
  { name: 'tittle', type: 'string', required: true },
  { name: 'description', type: 'string', required: true },
  { name: 'type_contract', type: 'string', required: true },
  { name: 'salary', type: 'string', required: true },
  { name: 'horary', type: 'string', required: true },
  { name: 'charge', type: 'string', required: true },
  { name: 'address', type: 'string', required: true },
  { name: 'telephone', type: 'string', required: true },
  { name: 'email', type: 'string', required: true },
  { name: 'type_modality', type: 'string', required: true },
  { name: 'experience', type: 'string', required: true },
  { name: 'formation', type: 'string', required: true },
  { name: 'status', type: 'string', required: true },
];


router.get('/getAll', validateToken,  vacanciesController.getAll);
router.get('/getById', validateToken, vacanciesController.getById);
router.post('/create', validateToken, validationSchemaHandler({ schema: validationSchema }), vacanciesController.create);
router.put('/update', validateToken, validationSchemaHandler({ schema: validationSchema }), vacanciesController.update);
router.delete('/delete', validateToken, vacanciesController.delete);
router.get('/getPaginated', validateToken, vacanciesController.getPaginated);
router.get('/getTotalPages', validateToken, vacanciesController.getTotalPages);

export default router;