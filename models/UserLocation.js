const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class UserLocation extends Model { }

UserLocation.init(
    {
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        location_id: {
            type: DataTypes.INTEGER,
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
        modelName: 'userlocation',
    }
);

module.exports = UserLocation;