import express from 'express';
import { permissionController } from '../controllers/permission.controller';

const router = express.Router();

router.post('/', permissionController.get);
router.post('/getPagination', permissionController.getPagination);

export default router;