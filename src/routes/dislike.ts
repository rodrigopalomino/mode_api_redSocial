import { Router } from "express";
import { validateToken } from "../middlewares/validationToken";
import { dislike, getDislike } from "../controller/dislike";

const router = Router();

//Rutas protegidas
router.get("/create/:publicacion_id", validateToken, dislike);
router.get("/", validateToken, getDislike);

export { router };
