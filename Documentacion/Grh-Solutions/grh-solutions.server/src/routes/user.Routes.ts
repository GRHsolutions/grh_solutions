import { Router } from 'express';
import { userController } from '../controllers/user.Controller';

const router = Router();

router.get('/users', userController.getAllUsers);
router.post('/createUser', userController.createUser);
router.patch('/users/:id', userController.updateUser);
router.delete('/deleteUser/:id', userController.deleteUser);
// este endpoint valida correo y contrasena y entrega un token
router.post('/login', userController.login);

export default router;
