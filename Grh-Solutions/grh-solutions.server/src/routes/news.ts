import express from 'express';
import { newsController } from '../controllers/news.controller';

const router = express.Router();

router.get('/', newsController.get);
router.post('/', newsController.create);
router.delete('/', newsController.delete);
router.get("/births", newsController.getBirthDays);
router.get("/getById", newsController.getById)

export default router;