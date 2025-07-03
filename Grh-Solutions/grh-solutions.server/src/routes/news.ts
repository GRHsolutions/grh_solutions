import express from 'express';
import { newsController } from '../controllers/news.controller';

const router = express.Router();

router.get('/', newsController.get);
router.get('/getPagination', newsController.getPages);
router.post('/', newsController.create);

export default router;