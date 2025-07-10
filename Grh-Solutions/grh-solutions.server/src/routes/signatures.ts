import express from 'express';
import { signatureController } from '../controllers/signature.controller';
import { validateToken } from '../middleware/tokens.middlewares';

const router = express.Router();

router.post('/create', validateToken, signatureController.create);
router.get('/getAllNoPage', validateToken, signatureController.getAll);
router.get('/getById', validateToken, signatureController.getById);
router.put('/update', validateToken, signatureController.update);
router.delete('/delete', validateToken, signatureController.delete);

export default router;
