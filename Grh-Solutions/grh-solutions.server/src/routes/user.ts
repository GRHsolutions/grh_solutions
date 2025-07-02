import express from 'express';
import { userController } from '../controllers/user.controller'
import { validateToken } from '../middleware/tokens.middlewares';

const router = express.Router();

router.get('/getMyInfo', validateToken, userController.getMyInfo); // obtener mi propia informacion
router.put('/update', validateToken, userController.updateUser); // actualizar mi informacion

export default router;