import { Request, Response } from "express";
import { Usuario } from "../interface/usuario";
import {
  _getUsuarios,
  _logOut,
  _logIn,
  _signUp,
  _validate,
  _getUsuario,
  _updateUsuario,
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

//Funciones Protegidas
export const getUsuario = async (req: Request, res: Response) => {
  const email = req.decodeToken?.email;

  try {
    const response = await _getUsuario(email || "");
    res.status(response.status).json(response.item);
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

export const updateUsuario = async (req: Request, res: Response) => {
  const {
    nombre,
    avatar,
    distrito,
    info,
    estudio,
    facebook,
    github,
    instagram,
  } = req.body;
  const usuario_id = req.decodeToken?.usuario_id;

  const usuario: Partial<Usuario> = {
    usuario_id: usuario_id || 0,
    nombre,
    avatar,
    distrito,
    info,
    estudio,
    facebook,
    github,
    instagram,
  };

  try {
    const response = await _updateUsuario(usuario);
    res.status(response.status).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};

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
