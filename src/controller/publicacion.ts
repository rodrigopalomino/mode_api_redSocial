import { Request, Response } from "express";
import {
  _createPublicacion,
  _deletePublicacion,
  _getPublicacion,
  _getPublicaciones,
  _getPublicacionesUsuario,
  _updatePublicacion,
} from "../service/publicacion";
import { Publicacion } from "../interface/publicacion";

export const getPublicaciones = async (req: Request, res: Response) => {
  const titulo = req.query.search as string;

  try {
    const response = await _getPublicaciones(titulo);
    res.status(response.status).json(response.items);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getPublicacionesUsuario = async (req: Request, res: Response) => {
  const usuario_id = req.decodeToken?.usuario_id;
  const titulo = req.query.search as string;

  try {
    const response = await _getPublicacionesUsuario(usuario_id || 0, titulo);
    res.status(response.status).json(response.items);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getPublicacion = async (req: Request, res: Response) => {
  const { publicacion_id } = req.params;

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

export const deletePublicacion = async (req: Request, res: Response) => {
  const { publicacion_id } = req.params;

  try {
    const response = await _deletePublicacion(publicacion_id);
    res.status(response.status).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const updatePublicacion = async (req: Request, res: Response) => {
  const { publicacion_id, titulo, sinopsis, contenido } = req.body;

  const upPublicacion: Partial<Publicacion> = {
    publicacion_id,
    titulo,
    sinopsis,
    contenido,
  };

  try {
    const response = await _updatePublicacion(upPublicacion);
    res.status(response.status).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};
