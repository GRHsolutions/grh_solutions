import express from 'express';
import { contractController } from '../controllers/contract.controller';
import { validationSchemaHandler } from '../middleware/validationSquema';
import { validateToken } from '../middleware/tokens.middlewares';

const router = express.Router();

// Validaciones para crear contrato
const createValidationSchema = [
  { name: "perfil_creador", required: true, type: "string" },
  { name: "perfil_empleado", required: true, type: "string" },
  { name: "eps", required: true, type: "string" },
  { name: "estrato", required: true, type: "number" },
  { name: "start_date", required: true, type: "string" }, // se envía como ISO date string
  { name: "tipo_contrato", required: true, type: "string" },
  { name: "arl", required: true, type: "string" },
  { name: "estado", required: true, type: "string" },
  { name: "title", required: true, type: "string" },
  { name: "vacante", required: true, type: "string" },
];

// Validaciones para actualizar (opcionales)
const updateValidationSchema = [
  { name: "perfil_creador", type: "string" },
  { name: "perfil_empleado", type: "string" },
  { name: "eps", type: "string" },
  { name: "estrato", type: "number" },
  { name: "start_date", type: "string" },
  { name: "end_date", type: "string" },
  { name: "tipo_contrato", type: "string" },
  { name: "arl", type: "string" },
  { name: "firma_empleado", type: "string" },
  { name: "firma_empleador", type: "string" },
  { name: "estado", type: "string" },
  { name: "title", type: "string" },
  { name: "vacante", type: "string" },
];

router.post('/create', validateToken, validationSchemaHandler({ schema: createValidationSchema }), contractController.create);
router.get('/getAll', validateToken, contractController.getAll);
router.get('/getById', validateToken, contractController.getById);
router.put('/update', validateToken, validationSchemaHandler({ schema: updateValidationSchema }), contractController.update);
router.delete('/delete', validateToken, contractController.delete);

export default router;
