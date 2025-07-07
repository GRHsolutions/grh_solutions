import express from 'express';
import { historyController } from '../controllers/history.controller';

const router = express.Router();

router.post('/create', historyController.create);
router.delete('/delete', historyController.delete);
router.get('/getAllNoPage', historyController.getAll); 
router.get('/getById',  historyController.getById); 
// router.put('/update',  validationSchemaHandler({ schema: validationSchema }), historyController.);

export default router;