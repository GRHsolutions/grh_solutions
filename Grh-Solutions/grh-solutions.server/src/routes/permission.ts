import express from 'express';
import { permissionController } from '../controllers/permission.controller';

const router = express.Router();

router.get('/', permissionController.get);
router.get('/getPagination', permissionController.getPagination);
router.post('/create', permissionController.create);

export default router;