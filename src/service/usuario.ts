import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import { Usuario as UsuarioInterface } from "../interface/usuario";
import { Usuario } from "../model/usuario";

dotenv.config();

export const _signUp = async (usuario: UsuarioInterface) => {
  //Verificar si el email ya existe
  if (await Usuario.findOne({ where: { email: usuario.email } })) {
    return {
      msg: "este email ya esta en uso",
      succes: false,
      status: 400,
    };
  }

  //cifrar contraseña
  const hashPassword = await bcrypt.hash(usuario.password, 8);
  usuario.password = hashPassword;

  try {
    await Usuario.create(usuario);
    return {
      msg: "Usuario creado",
      succes: true,
      status: 200,
    };
  } catch (error) {
    return {
      msg: "error _signUp",
      succes: false,
      status: 400,
    };
  }
};

export const _logIn = async (email: string, password: string) => {
  const usuario = await Usuario.findOne({ where: { email: email } });

  //cerificar si exite ususrio con ese email
  if (!usuario) {
    return {
      msg: "email o password incorrecto",
      succes: false,
      status: 400,
    };
  }

  //verificar contraseña
  if (!(await bcrypt.compare(password, usuario.password))) {
    return {
      msg: "email o password incorrecto",
      succes: false,
      status: 400,
    };
  }

  //creat Token
  const token = jwt.sign(
    {
      usuario_id: usuario.usuario_id,
      email: usuario.email,
      nombre: usuario.nombre,
    },
    process.env.SECRET_KEY || ""
  );

  //cambiar a estado activo
  await Usuario.update(
    { estado: "conectado" },
    { where: { email: usuario.email } }
  );

  return {
    token,
    succes: true,
    status: 200,
  };
};

//funciones con token
export const _getUsuarios = async () => {
  try {
    const items = await Usuario.findAll();
    return {
      items,
      succes: true,
      status: 200,
    };
  } catch (error) {
    return {
      msg: "error _getUsuarios",
      succes: false,
      status: 400,
    };
  }
};

export const _getUsuario = async (email: string) => {
  try {
    const item = await Usuario.findOne({
      where: { email: email },
      attributes: [
        "email",
        "nombre",
        "avatar",
        "distrito",
        "info",
        "estudio",
        "facebook",
        "github",
        "instagram",
      ],
    });
    return {
      item,
      succes: true,
      status: 200,
    };
  } catch (error) {
    return {
      msg: "error _getUsuario",
      succes: false,
      status: 400,
    };
  }
};

export const _updateUsuario = async (usuario: Partial<UsuarioInterface>) => {
  try {
    await Usuario.update(usuario, {
      where: { usuario_id: usuario.usuario_id },
    });

    return {
      msg: "usuario actualizado",
      succes: true,
      status: 200,
    };
  } catch (error) {
    return {
      msg: "error _update",
      succes: false,
      status: 400,
    };
  }
};

export const _logOut = async (email: string) => {
  try {
    //cambiar a estado desactibo
    await Usuario.update(
      { estado: "desconectado" },
      { where: { email: email } }
    );

    return {
      msg: "usuario desconectado",
      succes: true,
      status: 200,
    };
  } catch (error) {
    return {
      msg: "error _logOut",
      succes: false,
      status: 400,
    };
  }
};

export const _validate = async () => {
  return {
    msg: "token valido",
    succes: true,
    status: 200,
  };
};
