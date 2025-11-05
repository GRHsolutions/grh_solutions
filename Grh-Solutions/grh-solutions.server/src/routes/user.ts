import express from 'express';
import { userController } from '../controllers/user.controller'
import { validateToken } from '../middleware/tokens.middlewares';


const router = express.Router();

router.get('/getMyInfo', validateToken, userController.getMyInfo); // obtener mi propia informacion
router.put('/update', validateToken, userController.updateUser); // actualizar mi informacion
router.get("/getAll",  validateToken, userController.getAll);
router.get('/getById/:id', validateToken, userController.getById);
router.put('/updateUser', validateToken, userController.update);
router.delete('/delete', validateToken, userController.delete);
router.put('/changePassword', validateToken, userController.changePassword);

export default router;