import express from 'express';
import { contractController } from '../controllers/contract.controller';
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

router.post('/create', validateToken, contractController.create);
router.get('/getAll', validateToken, contractController.getAll); 
router.put('/update', validateToken, contractController.update);
router.delete('/delete', validateToken, contractController.delete);
router.get('/getById', validateToken, contractController.getById); 

export default router;