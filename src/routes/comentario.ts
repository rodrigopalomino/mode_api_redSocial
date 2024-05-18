import { Router } from "express";
import { validateToken } from "../middlewares/validationToken";
import { createComentario, getComentarios } from "../controller/comentario";

const router = Router();

//rutas protegidas
router.get("/:publicacion_id", validateToken, getComentarios);
router.post("/create", validateToken, createComentario);

export { router };
