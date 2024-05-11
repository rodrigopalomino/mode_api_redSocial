import { Router } from "express";
import { validateToken } from "../middlewares/validationToken";
import {
  createPublicacion,
  getPublicacion,
  getPublicaciones,
} from "../controller/publicacion";

const router = Router();

//rutas protegidas
router.get("", validateToken, getPublicaciones);
router.get("/:publicacion_id", validateToken, getPublicacion);
router.post("/create", validateToken, createPublicacion);

export { router };
