import { followUpTypeController } from './../controllers/followUpType.controller';
import express from 'express';

const router = express.Router();

router.post('/create', followUpTypeController.create);
router.delete('/delete', followUpTypeController.delete);
router.get('/getAllNoPage', followUpTypeController.getAll); 
router.get('/getById',  followUpTypeController.getById); 
router.put('/update', followUpTypeController.update);

export default router;