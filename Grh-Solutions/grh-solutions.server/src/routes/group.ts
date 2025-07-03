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

router.get("/getAll",  groupController.getAll)
router.post('/create',  validationSchemaHandler({ schema: validationSchema }), groupController.create);
router.delete("/delete/:id",  groupController.delete);
router.put("/update",  groupController.update);
router.delete ("/deleteUserFromGroup",  groupController.deleteUserFromGroup);

export default router;