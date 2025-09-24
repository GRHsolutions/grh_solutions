import { Router } from "express";
import { involvedController } from "../controllers/involved.controller";

const router = Router();

router.post("/create", involvedController.create);
router.get("/getAll", involvedController.getAll);
router.get("/getById", involvedController.getById);
router.get("/getByRequestId", involvedController.getByRequestId);
router.put("/update", involvedController.update);
router.delete("/delete", involvedController.delete);

export default router;
