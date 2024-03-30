import { DataTypes, Model } from "sequelize";
import db from "../config/database";

class Coins extends Model{}

Coins.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    }, 
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }, 
    currency_code: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize: db,
    modelName: 'coins',
    timestamps: false
  }
)

export default Coins;