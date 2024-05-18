import { Request, Response } from "express";
import { _getLikes, _like } from "../service/like";
import { Dislike } from "../interface/dislike";
import { _dislike, _getDislikes } from "../service/dislike";

export const dislike = async (req: Request, res: Response) => {
  const usuario_id = req.decodeToken?.usuario_id;
  const { publicacion_id } = req.params;

  const newDislike: Dislike = {
    usuario_id: usuario_id || 0,
    publicacion_id: Number(publicacion_id),
  };

  try {
    const response = await _dislike(newDislike);
    res.status(response.status).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getDislike = async (req: Request, res: Response) => {
  const usuario_id = req.decodeToken?.usuario_id;

  try {
    const response = await _getDislikes(usuario_id || 0);
    res.status(response.status).json(response.items);
  } catch (error) {
    res.status(400).json(error);
  }
};
