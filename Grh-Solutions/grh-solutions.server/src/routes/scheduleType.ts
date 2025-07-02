import express from 'express';
import { scheduleTypeController } from '../controllers/ScheduleType.controller';
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

router.post('/create', validateToken, validationSchemaHandler({ schema: validationSchema }), scheduleTypeController.create);
router.get('/getAllNoPage', validateToken, scheduleTypeController.getAll); // Usar sin paginado por el momento :V
router.put('/update', validateToken, validationSchemaHandler({ schema: validationSchema }), scheduleTypeController.update);
router.delete('/delete', validateToken, scheduleTypeController.delete);
router.get('/getById', validateToken, scheduleTypeController.getById); // Obtener por ID

export default router;