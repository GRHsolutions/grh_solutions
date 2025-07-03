import { Router } from "express";
import { postulanteController } from "../controllers/postulante.controller";
import { validationSchemaHandler } from "../middleware/validationSquema";

const router = Router();
const validationSchema = [
  {
    name: 'vacante',
    required: true,
    type: 'string',
  },
  {
    name: 'status',
    required: false,
    type: 'string',
  }
];
router.post("/create", validationSchemaHandler({ schema: validationSchema }), postulanteController.create);
router.get("/getAllByVacante/:vacanteId", postulanteController.getAllByVacante);
router.put("/update/:id", validationSchemaHandler({ schema: validationSchema }), postulanteController.update);
router.delete("/delete/:id", postulanteController.delete);

export default router;
