import { Dislike as DislikeInterface } from "../interface/dislike";
import { Dislike } from "../model/dislike";
import { Like } from "../model/like";
import { Publicacion } from "../model/publicacion";

export const _dislike = async (dislike: DislikeInterface) => {
  try {
    //Verificar si ya le a dado like
    if (
      await Like.findOne({
        where: {
          usuario_id: dislike.usuario_id,
          publicacion_id: dislike.publicacion_id,
        },
      })
    ) {
      //Si le a dado like
      //Borrar el like
      await Like.destroy({
        where: {
          usuario_id: dislike.usuario_id,
          publicacion_id: dislike.publicacion_id,
        },
      });
      //Crear el dislike
      await Dislike.create(dislike);
      //Incrementar la cantidad de dislike
      await Publicacion.increment("c_dislike", {
        where: {
          publicacion_id: dislike.publicacion_id,
        },
      });
      //Eeducir la cantidad de like
      await Publicacion.decrement("c_like", {
        where: {
          publicacion_id: dislike.publicacion_id,
        },
      });

      return {
        msg: "Dislike creado y like borrado",
        succes: true,
        status: 200,
      };
    }

    //Verificar si ya existe
    const dislik = await Dislike.findOne({
      where: {
        usuario_id: dislike.usuario_id,
        publicacion_id: dislike.publicacion_id,
      },
    });

    //Si existe
    if (dislik) {
      //Reducir la cantidad de dislikes
      await Publicacion.decrement("c_dislike", {
        where: { publicacion_id: dislik.publicacion_id },
      });
      //Borrar el dislike
      await Dislike.destroy({ where: { dislike_id: dislik.dislike_id } });

      return {
        msg: "Dislike eliminado",
        succes: true,
        status: 200,
      };
    }
    //Si no existe
    else {
      //Incrementar la cantidad de dislike
      await Publicacion.increment("c_dislike", {
        where: { publicacion_id: dislike.publicacion_id },
      });
      //Creamos la dislike
      await Dislike.create(dislike);

      return {
        msg: "Dislike creado",
        succes: true,
        status: 200,
      };
    }
  } catch (error) {
    return {
      msg: "error _dislike",
      succes: false,
      status: 400,
    };
  }
};

export const _getDislikes = async (usuario_id: number) => {
  try {
    const items = await Dislike.findAll({ where: { usuario_id: usuario_id } });
    return {
      items,
      succes: true,
      status: 200,
    };
  } catch (error) {
    return {
      msg: "error _getDislikes",
      succes: false,
      status: 400,
    };
  }
};
