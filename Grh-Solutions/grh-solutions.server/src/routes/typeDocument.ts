import express from 'express';
import { documentTypeController } from '../controllers/documentType.controller';
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

router.post('/create', validateToken, validationSchemaHandler({ schema: validationSchema }), documentTypeController.create);
router.get('/getAllNoPage', validateToken, documentTypeController.getAll); // Usar sin paginado por el momento :V
router.put('/update', validateToken, validationSchemaHandler({ schema: validationSchema }), documentTypeController.update);
router.delete('/delete', validateToken, documentTypeController.delete);
router.get('/getById', validateToken, documentTypeController.getById); // Obtener por ID


export default router;