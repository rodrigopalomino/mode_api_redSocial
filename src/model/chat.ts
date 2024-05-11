import { DataTypes, Model, UniqueConstraintError } from "sequelize";
import { Chat as ChatInterface } from "../interface/chat";
import sequelize from "../db/connection";
import { Usuario } from "./usuario";

export interface ChatModel extends Model<ChatInterface>, ChatInterface {}

export const Chat = sequelize.define(
  "chat",
  {
    chat_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    usuario1_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: "usuario1_usuario2_unique",
    },
    usuario2_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: "usuario1_usuario2_unique",
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Chat.belongsTo(Usuario, {
  foreignKey: "usuario1_id",
});

Chat.belongsTo(Usuario, {
  foreignKey: "usuario2_id",
});
