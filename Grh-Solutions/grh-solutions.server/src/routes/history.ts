import express from 'express';
import { historyController } from '../controllers/history.controller';

const router = express.Router();

router.get('/getByRequestId', historyController.getByRequestId);

router.get('/getById', historyController.getById);

export default router;
