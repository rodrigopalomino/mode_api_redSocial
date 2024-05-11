import { DataTypes, Model } from "sequelize";
import { Publicacion as PublicacionInterface } from "../interface/publicacion";
import sequelize from "../db/connection";
import { Usuario } from "./usuario";

export interface PublicacionModel
  extends Model<PublicacionInterface>,
    PublicacionInterface {}

export const Publicacion = sequelize.define<PublicacionModel>(
  "publicacion",
  {
    publicacion_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sinopsis: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    contenido: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    c_like: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    c_dislike: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    c_comentario: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

Publicacion.belongsTo(Usuario, {
  foreignKey: "usuario_id",
});
