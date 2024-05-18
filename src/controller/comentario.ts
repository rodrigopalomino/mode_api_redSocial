import { Request, Response } from "express";
import { Comentario } from "../interface/comentario";
import { _createComentario, _getComentarios } from "../service/comentario";

export const createComentario = async (req: Request, res: Response) => {
  const { publicacion_id, contenido } = req.body;
  const usuario_id = req.decodeToken?.usuario_id;

  const newComentario: Comentario = {
    usuario_id: usuario_id || 0,
    publicacion_id,
    contenido,
  };

  try {
    const response = await _createComentario(newComentario);
    res.status(response.status).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getComentarios = async (req: Request, res: Response) => {
  const { publicacion_id } = req.params;

  try {
    const response = await _getComentarios(publicacion_id);
    res.status(response.status).json(response.items);
  } catch (error) {
    res.status(400).json(error);
  }
};
