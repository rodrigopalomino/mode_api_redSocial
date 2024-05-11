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
      defaultValue: "valorDefault",
      allowNull: false,
    },
    distrito: {
      type: DataTypes.STRING,
      defaultValue: "valorDefaultDistrito",
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
