import { Router } from 'express';
import { userController } from '../controllers';

const router = Router();
router.get('/users', userController.getAllUsers);
router.post('/createUser', userController.createUser);
router.patch('/users/:id', userController.updateUser);
router.delete('/deleteUser/:id', userController.deleteUser);
export default router;
