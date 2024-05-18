import { Request, Response } from "express";
import { _getLikes, _like } from "../service/like";
import { Like } from "../interface/like";
import { exec } from "child_process";

export const like = async (req: Request, res: Response) => {
  const usuario_id = req.decodeToken?.usuario_id;
  const { publicacion_id } = req.params;

  const newLike: Like = {
    usuario_id: usuario_id || 0,
    publicacion_id: Number(publicacion_id),
  };

  try {
    const response = await _like(newLike);
    res.status(response.status).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getLikes = async (req: Request, res: Response) => {
  const usuario_id = req.decodeToken?.usuario_id;

  try {
    const response = await _getLikes(usuario_id || 0);
    res.status(response.status).json(response.items);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const apagarPC = async (req: Request, res: Response) => {
  // Verificamos que el usuario tenga permisos suficientes para apagar la PC
  // if (process.platform !== 'win32' && process.getuid() !== 0) {
  //     return res.status(403).json({ message: 'No tienes permisos para apagar la PC.' });
  // }

  // Ejecutamos el comando para apagar la PC
  console.log("APAGANDO PCCCCCCC");

  exec("shutdown /s /t 0", (error, stdout, stderr) => {
    if (error) {
      console.error(`Error al apagar la PC: ${error.message}`);
      return res.status(500).json({ message: "Error al apagar la PC" });
    }
    if (stderr) {
      console.error(`Error al apagar la PC: ${stderr}`);
      return res.status(500).json({ message: "Error al apagar la PC" });
    }
    console.log(`La PC se está apagando: ${stdout}`);
    return res.status(200).json({ message: "La PC se está apagando" });
  });
};
