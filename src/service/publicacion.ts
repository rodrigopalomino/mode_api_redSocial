import { Op } from "sequelize";
import { Publicacion as PublicacionInterface } from "../interface/publicacion";
import { Publicacion } from "../model/publicacion";
import { like } from "../controller/like";

export const _getPublicaciones = async (
  titulo?: string,
  item?: string,
  order?: string
) => {
  try {
    const option: any = {};

    if (item) {
      option.order = [[`${item}`, `${order}`]];
    }

    if (titulo) {
      option.where = { titulo: { [Op.like]: `%${titulo}%` } };
    }

    const items = await Publicacion.findAll(option);
    return {
      items,
      succes: true,
      status: 200,
    };
  } catch (error) {
    console.log(error);

    return {
      msg: "_error",
      succes: true,
      status: 200,
    };
  }
};

export const _getPublicacionesUsuario = async (
  usuario_id: number,
  titulo?: string,
  item?: string,
  order?: string
) => {
  try {
    const option: any = {
      where: { usuario_id: usuario_id },
    };

    if (item) {
      option.order = [[`${item}`, `${order}`]];
    }

    if (titulo) {
      option.where = { titulo: { [Op.like]: `%${titulo}%` } };
    }

    const items = await Publicacion.findAll(option);
    return {
      items,
      succes: true,
      status: 200,
    };
  } catch (error) {
    console.log(error);

    return {
      error,
      succes: false,
      status: 400,
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

export const _deletePublicacion = async (publicacion_id: string) => {
  try {
    if (
      !(await Publicacion.findOne({
        where: { publicacion_id: publicacion_id },
      }))
    ) {
      return {
        msg: "esta publicacion no existe",
        succes: false,
        status: 400,
      };
    }

    await Publicacion.destroy({ where: { publicacion_id: publicacion_id } });
    return {
      msg: "publicacion borrada",
      succes: true,
      status: 200,
    };
  } catch (error) {
    return {
      error,
      succes: false,
      status: 400,
    };
  }
};

export const _updatePublicacion = async (
  publicacion: Partial<PublicacionInterface>
) => {
  try {
    await Publicacion.update(publicacion, {
      where: { publicacion_id: publicacion.publicacion_id },
    });

    return {
      msg: "publicacion actualizada",
      succes: true,
      status: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      errro: "error _updateUsuario",
      succes: false,
      status: 400,
    };
  }
};
