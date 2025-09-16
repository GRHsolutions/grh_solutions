import express from 'express';
import { newsController } from '../controllers/news.controller';

const router = express.Router();

router.get('/', newsController.get);
router.post('/', newsController.create);
router.delete('/', newsController.delete);

export default router;