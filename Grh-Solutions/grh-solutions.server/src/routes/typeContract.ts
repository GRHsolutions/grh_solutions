import express from 'express';
import { typeContractController } from "../controllers/TypeContract.controller";
import { validateToken } from "../middleware/tokens.middlewares";
import { validationSchemaHandler } from "../middleware/validationSquema";

const router = express.Router();

const validationSchema = [
    {
        name: 'name',
        required: true,
        type: 'string'
    }
];

router.post('/create', validationSchemaHandler({ schema: validationSchema }), typeContractController.create);
router.put('/update',  validationSchemaHandler({ schema: validationSchema }), typeContractController.update);
router.delete('/delete',  typeContractController.delete);
router.get('/getAll',  typeContractController.getAll);

export default router;