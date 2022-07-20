const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Favorite_locations extends Model {}

Favorite_locations.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
    location_name: {
            type: DataTypes.INTEGER,
            references: {
              model: 'favorite_locations',
              key: 'id',
            },
        },
    },
    {
      sequelize,
      timestamps: false,
      underscored: true,
      modelName: 'favorite_locations',
    }
    );

    module.exports = Favorite_locations;