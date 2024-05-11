import { DataTypes, Model } from "sequelize";
import { Like as LikeInterface } from "../interface/like";
import sequelize from "../db/connection";
import { Usuario } from "./usuario";
import { Publicacion } from "./publicacion";

export interface LikeModel extends Model<LikeInterface>, LikeInterface {}

export const Like = sequelize.define<LikeModel>(
  "like",
  {
    like_id: {
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

Like.belongsTo(Usuario, {
  foreignKey: "usuario_id",
});

Like.belongsTo(Publicacion, {
  foreignKey: "publicacion_id",
});
