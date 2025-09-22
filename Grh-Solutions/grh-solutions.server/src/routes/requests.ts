import { Router } from "express";
import { requestsController } from "../controllers/requests.controller";
import { validateToken } from "../middleware/tokens.middlewares";

const router = Router();

router.post("/create", validateToken, requestsController.create);
router.get("/getAll", validateToken, requestsController.getAll);
router.get("/getById", validateToken, requestsController.getById);
router.put("/update", validateToken, requestsController.update);
router.delete("/delete", validateToken, requestsController.delete);

export default router;
