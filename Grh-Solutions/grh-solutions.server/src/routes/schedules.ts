import express from 'express';
import { schedulesController } from '../controllers/schedules.controller';
import { validationSchemaHandler } from '../middleware/validationSquema';
import { validateToken } from '../middleware/tokens.middlewares';

const router = express.Router();

const validationSchema = [
    {
        name: 'name',
        required: true,
        type: 'string'
    }
];

router.post('/create', validateToken, schedulesController.create);
router.get('/getAllNoPage', validateToken, schedulesController.getAll); // Usar sin paginado por el momento :V
router.put('/update', validateToken, schedulesController.update);
router.delete('/delete', validateToken, schedulesController.delete);
router.get('/getById', validateToken, schedulesController.getById); // Obtener por ID

export default router;