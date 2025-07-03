import express from 'express';
import { puestoController } from '../controllers/puesto.controller';
import { validateToken } from '../middleware/tokens.middlewares';

const router = express.Router();

const validationSchema = [
    {
        name: 'name',
        required: true,
        type: 'string'
    }
];

router.post('/create',  validateToken,puestoController.create);
router.delete('/delete', validateToken,puestoController.delete);
router.get('/getAll',  validateToken,puestoController.getAll); 
router.get('/getById',  validateToken,puestoController.getById); 
router.put('/update',   validateToken,puestoController.update);

export default router;
