import express from 'express';
import { cvController } from '../controllers/cv.controller';

const router = express.Router();

router.post('/', cvController.createOrUpdate);
router.put('/', cvController.edit);
router.get('/getMyCv', cvController.getMyCv);


export default router;