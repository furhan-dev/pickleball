const { Model, DataTypes } = require('sequelize');
const moment = require('moment');
const sequelize = require('../config/connection');

class Event extends Model { }

Event.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      get() {
        return moment(this.getDataValue('date')).format('MMMM Do YYYY');
      }
    },
    location_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'locations',
        key: 'id'
      }
    },
  },
  {
    sequelize,
    timestamps: false,
    underscored: true,
    modelName: 'event',
  }
);

module.exports = Event;
