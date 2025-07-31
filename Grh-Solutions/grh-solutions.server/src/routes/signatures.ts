import express from 'express';
import { validateToken } from '../middleware/tokens.middlewares';
import { signatureController } from '../controllers/Signatures.controller';

const router = express.Router();

router.post('/create', validateToken, signatureController.create);
router.get('/getAllNoPage', validateToken, signatureController.getAll);
router.get('/getById', validateToken, signatureController.getById);
router.put('/update', validateToken, signatureController.update);
router.delete('/delete', validateToken, signatureController.delete);

export default router;