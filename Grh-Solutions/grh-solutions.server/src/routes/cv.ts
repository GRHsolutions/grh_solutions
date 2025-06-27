import express from 'express';
import { loginController } from '../controllers/login.controller';
import { validateToken } from '../middleware/tokens.middlewares';
import { cvController } from '../controllers/cv.controller';
import { validationSchemaHandler } from '../middleware/validationSquema';

// Define the validation schema for creating a document type
const validationSchema = [
    {
        name: 'firstName',
        required: true,
        type: 'string'
    },
    {
        name: 'middleName',
        required: false,
        type: 'string'
    },
    {
        name: 'lastName',
        type: 'string',
        required: true
    },
    {
        name: 'secondLastName',
        type: 'string',
        required: false
    },
    {
        name: 'mail',
        type: 'string',
        required: true
    },
    {
        name: 'phone',
        type: 'string',
        required: false
    },
    {
        name: 'address',
        type: 'string',
        required: false,

    },
    {
        name: 'postal',
        type: 'string',
        required: false,
    },
    {
        name: 'city',
        type: 'string',
        required: true
    },
    {
        name: 'country',
        type: 'string',
        required: true 
    },
    {
        name: 'bornDate',
        type: 'date',
        required: true
    },
    {
        name: 'myDescription',
        type: 'string',
        required: true
    },
    {
        name: 'photo',
        type: 'string',
        required: false
    },
    {
        name: 'fromUser',
        type: 'string',
        required: false
    }
];

const router = express.Router();

router.post('/', validateToken, validationSchemaHandler({schema: validationSchema}), cvController.create);

export default router;