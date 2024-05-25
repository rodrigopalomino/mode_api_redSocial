import { Router } from "express";
import { validateToken } from "../middlewares/validationToken";
import {
  createPublicacion,
  deletePublicacion,
  getPublicacion,
  getPublicaciones,
  getPublicacionesUsuario,
  updatePublicacion,
} from "../controller/publicacion";

const router = Router();

//rutas protegidas
router.get("/usuario", validateToken, getPublicacionesUsuario);

router.get("/", validateToken, getPublicaciones);
router.get("/:publicacion_id", validateToken, getPublicacion);
router.post("/create", validateToken, createPublicacion);
router.put("/update", validateToken, updatePublicacion);
router.delete("/delete/:publicacion_id", validateToken, deletePublicacion);

export { router };
