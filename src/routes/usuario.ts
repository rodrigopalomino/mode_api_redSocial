import { Router } from "express";
import {
  getUsuarios,
  logOut,
  login,
  signUp,
  validate,
} from "../controller/usuario";
import { validateToken } from "../middlewares/validationToken";

const router = Router();

router.post("/signUp", signUp);
router.post("/logIn", login);

//rutas protegidas
router.get("/", validateToken, getUsuarios);
router.get("/validate", validateToken, validate);
router.get("/logOut", validateToken, logOut);

export { router };
