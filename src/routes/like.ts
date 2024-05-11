import { Router } from "express";
import { apagarPC, dislike, like } from "../controller/like";
import { validateToken } from "../middlewares/validationToken";

const router = Router();

//rutas protegidas
router.get("/like/:publicacion_id", validateToken, like);
router.get("/dislike/:publicacion_id", validateToken, dislike);
router.get("/apagarPc", apagarPC);

export { router };
