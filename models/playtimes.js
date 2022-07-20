const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Playtimes extends Model {}

Playtimes.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    day_of_week: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    time_of_day: {
      type: DataTypes.STRING,
    },
    locations: {
      type: DataTypes.STRING,
      references: {
        model: 'locations',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'playtimes',
  }
);

module.exports = Playtimes;
