import express from "express";
import { reportController } from "../controllers/report.controller";
import { validateToken } from '../middleware/tokens.middlewares';

const router = express.Router();
router.post("/create", validateToken, reportController.create);
router.get("/getAll", validateToken, reportController.getAll);
router.get("/getById", validateToken, reportController.getById);
router.put("/update", validateToken, reportController.update);
router.delete("/delete", validateToken, reportController.delete);

export default router;
