import express from 'express';
import { documentTypeController } from '../controllers/documentType.controller';
import { validationSchemaHandler } from '../middleware/validationSquema';

const router = express.Router();

// Define the validation schema for creating a document type
const validationSchema = [
    {
        name: 'name',
        required: true,
        type: 'string'
    }
];

router.post('/create', validationSchemaHandler({ schema: validationSchema }), documentTypeController.create);
router.get('/getAllNoPage', documentTypeController.getAll); // Usar sin paginado por el momento :V
router.put('/update/:id', validationSchemaHandler({ schema: validationSchema }), documentTypeController.update);
router.delete('/delete/:id', documentTypeController.delete);
router.get('/getById/:id', documentTypeController.getById); // Obtener por ID


export default router;