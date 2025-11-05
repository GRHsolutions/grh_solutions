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

router.post('/create',  validationSchemaHandler({ schema: validationSchema }), scheduleTypeController.create);
router.get('/getAllNoPage',  scheduleTypeController.getAll); 
router.put('/update',  validationSchemaHandler({ schema: validationSchema }), scheduleTypeController.update);
router.delete('/delete',  scheduleTypeController.delete);
router.get('/getById',  scheduleTypeController.getById); 

export default router;