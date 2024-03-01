import { DataTypes } from "sequelize";
import db from "../config/database.js";

export const coinsModel = db.define('coins',{
  id:{
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  name:{
    type: DataTypes.STRING,
    allowNull: false
  },
  currency_code:{
    type: DataTypes.STRING,
    allowNull: false
  }
},{
  timestamps: false
});