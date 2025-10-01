import express from "express";
import { historyController } from "../controllers/history.controller";

const router = express.Router();

// Crear historial
router.post("/", historyController.create);

// Obtener historial por solicitud
router.get("/getByRequestId", historyController.getByRequestId);

// Obtener historial por ID
router.get("/getById", historyController.getById);

export default router;
