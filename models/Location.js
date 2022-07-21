const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Location extends Model { }

Location.init(
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
    num_courts: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // admin_id: {}, //references user with isAdmin=true
    // contact_id: {}, //references user with isContact=true
  },
  {
    sequelize,
    timestamps: false,
    underscored: true,
    modelName: 'location',
  }
);

module.exports = Location;
