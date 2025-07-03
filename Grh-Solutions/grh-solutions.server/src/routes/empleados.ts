import express from "express";
import { empleadosController } from "../controllers/empleados.controller";
import { validateToken } from '../middleware/tokens.middlewares';

const router = express.Router();

router.post("/create",validateToken, empleadosController.create);
router.get("/getAll",validateToken, empleadosController.getAll);
router.get("/getById", validateToken,empleadosController.getById);
router.put("/update",validateToken, empleadosController.update);
router.delete('/delete/:id', validateToken, empleadosController.delete);

export default router;
