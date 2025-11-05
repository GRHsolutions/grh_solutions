import express from 'express';
import { schedulesController } from '../controllers/schedules.controller';
import { validateToken } from '../middleware/tokens.middlewares';

const router = express.Router();

router.post('/create', validateToken, schedulesController.create);
router.get('/getAllNoPage', validateToken, schedulesController.getAll); 
router.put('/update', validateToken, schedulesController.update);
router.delete('/delete', validateToken, schedulesController.delete);
router.get('/getById', validateToken, schedulesController.getById); 

export default router;