import express from "express";
import { commentaryController } from "../controllers/commentary.controller";

const router = express.Router();

router.post("/", commentaryController.create);

export default router;
