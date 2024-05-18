import { Router } from "express";
import { apagarPC, getLikes, like } from "../controller/like";
import { validateToken } from "../middlewares/validationToken";

const router = Router();

//rutas protegidas
router.get("/create/:publicacion_id", validateToken, like);
router.get("/", validateToken, getLikes);
router.get("/apagarPc", apagarPC);
export { router };
