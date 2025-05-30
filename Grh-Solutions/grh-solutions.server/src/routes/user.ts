import express from 'express';
import { userController } from '../controllers/user.controller'
import { validateToken } from '../middleware/tokens.middlewares';

const router = express.Router();

router.get('/getMyInfo', validateToken, userController.getMyInfo);
router.put('/update', validateToken, userController.updateUser);

export default router;