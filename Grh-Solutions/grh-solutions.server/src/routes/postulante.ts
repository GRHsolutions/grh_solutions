import { Router } from "express";
import { postulanteController } from "../controllers/postulante.controller";
import { validationSchemaHandler } from "../middleware/validationSquema";
import { validateToken } from "../middleware/tokens.middlewares";

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
router.post("/create", validateToken,validationSchemaHandler({ schema: validationSchema }), postulanteController.create);
router.get("/getAllByVacante/:vacanteId",validateToken, postulanteController.getAllByVacante);
router.put("/update/:id",validateToken,validationSchemaHandler({ schema: validationSchema }), postulanteController.update);
router.delete("/delete/:id", validateToken,postulanteController.delete);

export default router;
