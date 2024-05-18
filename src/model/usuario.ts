import { DataTypes, Model } from "sequelize";
import { Usuario as UsuarioInterface } from "../interface/usuario";
import sequelize from "../db/connection";

export interface UsuarioModel
  extends Model<UsuarioInterface>,
    UsuarioInterface {}

export const Usuario = sequelize.define<UsuarioModel>(
  "usuario",
  {
    usuario_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING,
      defaultValue:
        "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png",
      allowNull: false,
    },
    distrito: {
      type: DataTypes.STRING,
      defaultValue: "distrito default",
      allowNull: true,
    },
    info: {
      type: DataTypes.STRING,
      defaultValue: "",
      allowNull: true,
    },
    estudio: {
      type: DataTypes.STRING,
      defaultValue: "",
      allowNull: true,
    },
    facebook: {
      type: DataTypes.STRING,
      defaultValue: "",
      allowNull: true,
    },
    github: {
      type: DataTypes.STRING,
      defaultValue: "",
      allowNull: true,
    },
    instagram: {
      type: DataTypes.STRING,
      defaultValue: "",
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    estado: {
      type: DataTypes.STRING,
      defaultValue: "desconectado",
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);
