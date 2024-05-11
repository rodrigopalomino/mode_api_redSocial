import { Request, Response } from "express";
import {
  _createPublicacion,
  _getPublicacion,
  _getPublicaciones,
} from "../service/publicacion";
import { Publicacion } from "../interface/publicacion";

export const getPublicaciones = async (req: Request, res: Response) => {
  try {
    const response = await _getPublicaciones();
    res.status(response.status).json(response.items);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getPublicacion = async (req: Request, res: Response) => {
  const { publicacion_id } = req.body;

  try {
    const response = await _getPublicacion(publicacion_id);
    res.status(response.status).json(response.item);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const createPublicacion = async (req: Request, res: Response) => {
  const { titulo, sinopsis, contenido } = req.body;
  const usuario_id = req.decodeToken?.usuario_id;

  const newPublicacion: Publicacion = {
    usuario_id: usuario_id || 0,
    titulo,
    sinopsis,
    contenido,
  };

  try {
    const response = await _createPublicacion(newPublicacion);
    res.status(response.status).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};
