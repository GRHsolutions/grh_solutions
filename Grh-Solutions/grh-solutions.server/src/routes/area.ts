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

router.post('/create', validateToken, validationSchemaHandler({ schema: validationSchema }), areaController.create);
router.delete('/delete', validateToken, areaController.delete);
router.get('/getAllNoPage', validateToken, areaController.getAll); // Usar sin paginado por el momento :V
router.get('/getById', validateToken, areaController.getById); // Obtener por ID
router.put('/update', validateToken, validationSchemaHandler({ schema: validationSchema }), areaController.update);

export default router;