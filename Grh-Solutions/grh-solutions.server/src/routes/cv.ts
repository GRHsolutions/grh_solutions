import express from 'express';
import { cvController } from '../controllers/cv.controller';

const router = express.Router();

router.post('/', cvController.create);
router.put('/', cvController.edit);


export default router;