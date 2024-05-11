import { Request, Response } from "express";
import { Usuario } from "../interface/usuario";
import {
  _getUsuarios,
  _logOut,
  _logIn,
  _signUp,
  _validate,
} from "../service/usuario";

export const signUp = async (req: Request, res: Response) => {
  const { nombre, email, password } = req.body;

  const newUsuario: Usuario = {
    nombre,
    email,
    password,
  };

  try {
    const response = await _signUp(newUsuario);
    res.status(response.status).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const response = await _logIn(email, password);
    //Crear el token en las cookies
    res.cookie("token", response.token, {
      //Establece la expiracion del token en 1hora
      maxAge: 1000 * 60 * 60,
      //El token solo es accesible por metodos http
      httpOnly: true,
      sameSite: "lax",
    });

    delete response.token;
    res.status(response.status).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getUsuarios = async (req: Request, res: Response) => {
  try {
    const response = await _getUsuarios();
    res.status(response.status).json(response.items);
  } catch (error) {
    res.status(400).json(error);
  }
};

//Peticiones con Token
export const logOut = async (req: Request, res: Response) => {
  const email = req.decodeToken?.email;
  try {
    const response = await _logOut(email || "");
    res.clearCookie("token");
    res.status(response.status).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const validate = async (req: Request, res: Response) => {
  try {
    const response = await _validate();
    res.status(response.status).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};
