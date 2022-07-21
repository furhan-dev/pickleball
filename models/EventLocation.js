const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class EventLocation extends Model { }

EventLocation.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    event_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'events',
        key: 'id',
        unique: false
      }
    },
    location_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'locations',
        key: 'id',
        unique: false
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    underscored: true,
    modelName: 'event_location',
  }
);

module.exports = EventLocation;
