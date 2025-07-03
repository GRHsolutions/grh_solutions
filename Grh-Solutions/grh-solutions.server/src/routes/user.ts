import express from 'express';
import { userController } from '../controllers/user.controller'

const router = express.Router();

router.get('/getMyInfo', userController.getMyInfo); // obtener mi propia informacion
router.put('/update', userController.updateUser); // actualizar mi informacion

export default router;