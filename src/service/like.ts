import { Like as LikeInterface } from "../interface/like";
import { Dislike as DislikeInterface } from "../interface/dislike";
import { Like } from "../model/like";
import { Dislike } from "../model/dislike";
import { Publicacion } from "../model/publicacion";

export const _like = async (like: LikeInterface) => {
  try {
    //verificar si ya le a dado dislike
    if (
      await Dislike.findOne({
        where: {
          usuario_id: like.usuario_id,
          publicacion_id: like.publicacion_id,
        },
      })
    ) {
      //crear like
      await Like.create(like);
      //borrar el dislike
      await Dislike.destroy({
        where: {
          usuario_id: like.usuario_id,
          publicacion_id: like.publicacion_id,
        },
      });
      //incrementar la cantidad de likes
      await Publicacion.increment("c_like", {
        where: {
          publicacion_id: like.publicacion_id,
        },
      });
      //reducir la cantidad de dislike
      await Publicacion.decrement("c_dislike", {
        where: {
          publicacion_id: like.publicacion_id,
        },
      });

      return {
        msg: "Like creado y dislike borrado",
        succes: true,
        status: 200,
      };
    }

    //verificar si ya existe
    const lik = await Like.findOne({
      where: {
        usuario_id: like.usuario_id,
        publicacion_id: like.publicacion_id,
      },
    });

    //Si existe
    if (lik) {
      //reducir la cantidad de likes de publicacion
      await Publicacion.decrement("c_like", {
        where: { publicacion_id: lik.publicacion_id },
      });
      //borrar la fila
      await Like.destroy({ where: { like_id: lik.like_id } });

      return {
        msg: "Like eliminado",
        succes: true,
        status: 200,
      };
    }
    //Si no existe
    else {
      //incrementar la cantidad de likes
      await Publicacion.increment("c_like", {
        where: { publicacion_id: like.publicacion_id },
      });
      //creamos la fila
      await Like.create(like);

      return {
        msg: "Like creado",
        succes: true,
        status: 200,
      };
    }
  } catch (error) {
    console.log(error);

    return {
      msg: "error _like",
      succes: false,
      status: 400,
    };
  }
};

export const _dislike = async (dislike: DislikeInterface) => {
  try {
    //verificar si ya le a doad like
    if (
      await Like.findOne({
        where: {
          usuario_id: dislike.usuario_id,
          publicacion_id: dislike.publicacion_id,
        },
      })
    ) {
      //borrar el like
      await Like.destroy({
        where: {
          usuario_id: dislike.usuario_id,
          publicacion_id: dislike.publicacion_id,
        },
      });
      //crear la dislike
      await Dislike.create(dislike);
      //incrementar la cantidad de dislike
      await Publicacion.increment("c_dislike", {
        where: {
          publicacion_id: dislike.publicacion_id,
        },
      });
      //reducir la cantidad de like
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

    //verificar si ya existe
    const dislik = await Dislike.findOne({
      where: {
        usuario_id: dislike.usuario_id,
        publicacion_id: dislike.publicacion_id,
      },
    });

    //Si existe
    if (dislik) {
      //reducir la cantidad de dislikes de publicacion
      await Publicacion.decrement("c_dislike", {
        where: { publicacion_id: dislik.publicacion_id },
      });
      //borrar la fila
      await Dislike.destroy({ where: { dislike_id: dislik.dislike_id } });

      return {
        msg: "Dislike eliminado",
        succes: true,
        status: 200,
      };
    }
    //Si no existe
    else {
      //incrementar la cantidad de likes
      await Publicacion.increment("c_dislike", {
        where: { publicacion_id: dislike.publicacion_id },
      });
      //creamos la fila
      await Dislike.create(dislike);

      return {
        msg: "Dislike creado",
        succes: true,
        status: 200,
      };
    }
  } catch (error) {
    console.log(error);

    return {
      msg: "error _dislike",
      succes: false,
      status: 400,
    };
  }
};
