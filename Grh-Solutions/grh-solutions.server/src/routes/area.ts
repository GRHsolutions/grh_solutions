import express from 'express';
import { areaController } from '../controllers/area.controller';
import { validateToken } from '../middleware/tokens.middlewares';
import { validationSchemaHandler } from '../middleware/validationSquema';

const router = express.Router();

const validationSchema = [
    {
        name: 'name',
        required: true,
        type: 'string'
    }
];

router.post('/create',  validationSchemaHandler({ schema: validationSchema }), areaController.create);
router.delete('/delete',  areaController.delete);
router.get('/getAllNoPage',  areaController.getAll); // Usar sin paginado por el momento :V
router.get('/getById',  areaController.getById); // Obtener por ID
router.put('/update',  validationSchemaHandler({ schema: validationSchema }), areaController.update);

export default router;