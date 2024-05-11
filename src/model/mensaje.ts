import { DataTypes, Model } from "sequelize";
import { Mensaje as MensajeInterface } from "../interface/mensaje";
import sequelize from "../db/connection";
import { Chat } from "./chat";
import { Usuario } from "./usuario";

export interface MensajeModel
  extends Model<MensajeInterface>,
    MensajeInterface {}

export const Mensaje = sequelize.define<MensajeModel>(
  "mensaje",
  {
    mensaje_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    chat_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sender_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    receiver_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    mensaje: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  { freezeTableName: true }
);

Mensaje.belongsTo(Chat, {
  foreignKey: "chat_id",
});

Mensaje.belongsTo(Usuario, {
  foreignKey: "sender_id",
});

Mensaje.belongsTo(Usuario, {
  foreignKey: "receiver_id",
});
