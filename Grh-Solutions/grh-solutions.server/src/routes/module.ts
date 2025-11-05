import express from "express";
import { moduleController } from "../controllers/Module.controller";

const router = express.Router();

router.post("/create", moduleController.create);
router.get("/getAll", moduleController.getAll);
router.get("/getById", moduleController.getById);
router.put("/update", moduleController.update);
router.delete("/delete", moduleController.delete);

export default router;
