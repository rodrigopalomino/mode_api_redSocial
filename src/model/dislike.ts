import { DataTypes, Model } from "sequelize";
import { Dislike as DislikeInterface } from "../interface/dislike";
import sequelize from "../db/connection";
import { Usuario } from "./usuario";
import { Publicacion } from "./publicacion";

export interface DislikeModel
  extends Model<DislikeInterface>,
    DislikeInterface {}

export const Dislike = sequelize.define<DislikeModel>(
  "dislike",
  {
    dislike_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    publicacion_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Dislike.belongsTo(Usuario, {
  foreignKey: "usuario_id",
});

Dislike.belongsTo(Publicacion, {
  foreignKey: "publicacion_id",
});
