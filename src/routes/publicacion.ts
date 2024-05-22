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
router.get("/", validateToken, getPublicaciones);
router.get("/usuario", validateToken, getPublicacionesUsuario);
router.get("/:publicacion_id", validateToken, getPublicacion);
router.post("/create", validateToken, createPublicacion);
router.delete("/delete/:publicacion_id", validateToken, deletePublicacion);
router.put("/update", validateToken, updatePublicacion);

export { router };
