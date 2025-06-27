import express from 'express';
import { rolController } from '../controllers/rol.controller';
import { validationSchemaHandler } from '../middleware/validationSquema';
import { validateToken } from '../middleware/tokens.middlewares';

const router = express.Router();

// Define the validation schema for creating a document type
const validationSchema = [
    {
        name: 'name',
        required: true,
        type: 'string'
    }
];

router.post('/create', validateToken, validationSchemaHandler({ schema: validationSchema }), rolController.create);
router.get('/getAllNoPage', validateToken, rolController.getAll); // Usar sin paginado por el momento :V
router.put('/update', validateToken, validationSchemaHandler({ schema: validationSchema }), rolController.update);
router.delete('/delete', validateToken, rolController.delete);
router.get('/getById', validateToken, rolController.getById); // Obtener por ID


export default router;