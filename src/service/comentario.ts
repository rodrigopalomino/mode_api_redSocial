import { Comentario as ComentarioInterface } from "../interface/comentario";
import { Comentario } from "../model/comentario";
import { Publicacion } from "../model/publicacion";
import { Usuario } from "../model/usuario";

export const _createComentario = async (comentario: ComentarioInterface) => {
  try {
    await Publicacion.increment("c_comentario", {
      where: { publicacion_id: comentario.publicacion_id },
    });

    await Comentario.create(comentario);
    return {
      msg: "comentario creado",
      succes: true,
      status: 200,
    };
  } catch (error) {
    return {
      msg: "error _createComentario",
      succes: false,
      status: 400,
    };
  }
};

export const _getComentarios = async (publicacion_id: string) => {
  try {
    const items = await Comentario.findAll({
      where: { publicacion_id: publicacion_id },
      include: [
        {
          model: Usuario,
          attributes: ["nombre", "avatar"],
        },
      ],
    });
    return {
      items,
      succes: true,
      status: 200,
    };
  } catch (error) {
    return {
      msg: "error _getComentarios",
      succes: false,
      status: 400,
    };
  }
};
