import { Publicacion as PublicacionInterface } from "../interface/publicacion";
import { Publicacion } from "../model/publicacion";

export const _getPublicaciones = async () => {
  try {
    const items = await Publicacion.findAll();
    return {
      items,
      succes: true,
      status: 200,
    };
  } catch (error) {
    return {
      msg: "_error",
      succes: true,
      status: 200,
    };
  }
};

export const _getPublicacion = async (publicacion_id: string) => {
  try {
    const item = await Publicacion.findOne({
      where: { publicacion_id: publicacion_id },
    });
    return {
      item,
      succes: true,
      status: 200,
    };
  } catch (error) {
    return {
      msg: "error _getPublicacion",
      succes: false,
      status: 400,
    };
  }
};

export const _createPublicacion = async (publicacion: PublicacionInterface) => {
  try {
    await Publicacion.create(publicacion);
    return {
      msg: "publicacion creada",
      succes: true,
      status: 200,
    };
  } catch (error) {
    return {
      msg: "error _createPublicacion",
      succes: false,
      status: 400,
    };
  }
};
