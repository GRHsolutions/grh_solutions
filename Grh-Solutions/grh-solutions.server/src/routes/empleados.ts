import express from "express";
import { empleadosController } from "../controllers/empleados.controller";
import { validateToken } from '../middleware/tokens.middlewares';

const router = express.Router();

// router.post("/create", empleadosController.create);
router.get("/getAll", empleadosController.getAll);
router.get("/getById", empleadosController.getById);
router.put("/update", empleadosController.update);
router.delete('/delete/:id',  empleadosController.delete);

export default router;
