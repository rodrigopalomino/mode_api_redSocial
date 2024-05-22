import { DataTypes, Model } from "sequelize";
import { Comentario as ComentarioInterface } from "../interface/comentario";
import sequelize from "../db/connection";
import { Publicacion } from "./publicacion";
import { Usuario } from "./usuario";

export interface ComentarioModel
  extends Model<ComentarioInterface>,
    ComentarioInterface {}

export const Comentario = sequelize.define<ComentarioModel>(
  "comentario",
  {
    comentario_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    publicacion_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    contenido: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  { freezeTableName: true }
);

Comentario.belongsTo(Publicacion, {
  foreignKey: "publicacion_id",
  onDelete: "CASCADE",
});

Comentario.belongsTo(Usuario, {
  foreignKey: "usuario_id",
  onDelete: "CASCADE",
});
