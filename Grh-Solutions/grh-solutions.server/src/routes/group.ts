import express from 'express';
import { groupController } from '../controllers/group.controller';
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

router.get("/getAll", validateToken, groupController.getAll)
router.post('/create', validateToken, validationSchemaHandler({ schema: validationSchema }), groupController.create);
router.delete('/delete', validateToken, groupController.delete);
router.delete ("deleteUser", validateToken, groupController.deleteUserFromGroup);

export default router;