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

router.post('/create',  puestoController.create);
router.delete('/delete', puestoController.delete);
router.get('/getAll',  puestoController.getAll); 
router.get('/getById',  puestoController.getById); 
router.put('/update',   puestoController.update);

export default router;
