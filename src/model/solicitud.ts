import { DataTypes, Model } from "sequelize";
import { Solicitud as SolicitudInterface } from "../interface/solicitud";
import sequelize from "../db/connection";

export interface SolicitudModel
  extends Model<SolicitudInterface>,
    SolicitudInterface {}

export const Solicitud = sequelize.define<SolicitudModel>(
  "solicitud",
  {
    solicitud_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    usuario_sender: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    usuario_receiver: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { freezeTableName: true }
);
