import express from 'express';
import { documentTypeController } from '../controllers/documentType.controller';

const router = express.Router();

router.post('/create', documentTypeController.create);

export default router;