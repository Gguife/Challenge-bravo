import { DataTypes } from "sequelize";
import db from "../config/database.js";
import { coinsModel } from "./coinsModel.js";

export const exchangeModel = db.define('exchangeRates', {
  id:{
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false   
  },
  source_currency_id:{
    type: DataTypes.INTEGER,
    references:{
      model: coinsModel,
      key: 'id'
    },
    allowNull: false
  },
  destination_currency_id:{
    type: DataTypes.INTEGER,
    references:{
      model: coinsModel,
      key: 'id'
    },
    allowNull: false
  },
  exchange_rate:{
    type: DataTypes.DECIMAL(18, 6),
    allowNull: false
  },
  update_date:{
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW 
  }
});