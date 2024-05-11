import { DataTypes, Model } from "sequelize";
import { Amigo as AmigoInterface } from "../interface/amigo";
import sequelize from "../db/connection";
import { Usuario } from "./usuario";

export interface AmigoModel extends Model<AmigoInterface>, AmigoInterface {}

export const Amigo = sequelize.define<AmigoModel>(
  "amigo",
  {
    amigo_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amigo_usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Amigo.belongsTo(Usuario, {
  foreignKey: "usuario_id",
});

Amigo.belongsTo(Usuario, {
  foreignKey: "amigo_usuario_id",
});
