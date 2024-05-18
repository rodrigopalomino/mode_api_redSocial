import { Router } from "express";
import {
  getUsuario,
  logOut,
  login,
  signUp,
  updateUsuario,
  validate,
} from "../controller/usuario";
import { validateToken } from "../middlewares/validationToken";

const router = Router();

router.post("/signUp", signUp);
router.post("/logIn", login);

//rutas protegidas
// router.get("/", validateToken, getUsuarios);
router.get("/", validateToken, getUsuario);
router.get("/validate", validateToken, validate);
router.get("/logOut", validateToken, logOut);
router.put("/update", validateToken, updateUsuario);

export { router };
