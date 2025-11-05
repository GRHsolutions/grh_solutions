import express from 'express';
import { typeContractController } from "../controllers/TypeContract.controller";
import { validateToken } from "../middleware/tokens.middlewares";
import { validationSchemaHandler } from "../middleware/validationSquema";

const router = express.Router();

// ✅ Validación para crear
const createValidationSchema = [
    { name: 'name', required: true, type: 'string' },
    { name: 'description', required: true, type: 'string' },
    { name: 'content', required: true, type: 'string' }
];

// ✅ Validación para actualizar (no obligatorio todo, solo si lo envía)
const updateValidationSchema = [
    { name: 'name', type: 'string' },
    { name: 'description', type: 'string' },
    { name: 'content', type: 'string' }
];

// ✅ Rutas
router.post(
    '/create',
    validateToken,
    validationSchemaHandler({ schema: createValidationSchema }),
    typeContractController.create
);

router.put(
    '/update',
    validateToken,
    validationSchemaHandler({ schema: updateValidationSchema }),
    typeContractController.update
);

router.delete(
    '/delete',
    validateToken,
    typeContractController.delete
);

router.get(
    '/getAll',
    validateToken,
    typeContractController.getAll
);

router.get(
    '/getById',
    validateToken,
    typeContractController.getById
);

export default router;
