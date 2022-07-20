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
<<<<<<< HEAD:models/Location.js
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    play_duration: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
=======
>>>>>>> main:models/locations.js
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    admin_id: {}, //references user with isAdmin=true
    contact_id: {}, //references user with isContact=true
    availability: {
      type: DataTypes.STRING,
      references: {
        model: 'playtimes',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    underscored: true,
<<<<<<< HEAD:models/Location.js
    modelName: 'location',
  }
);

module.exports = Location;
=======
    modelName: 'locations',
  }
);

module.exports = Locations;
>>>>>>> main:models/locations.js
