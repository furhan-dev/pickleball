const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        rating: {
            type: DataTypes.DECIMAL,
            defaultValue: "NULL",
        },
        dupr_id: {
            type: DataTypes.INTEGER,
            defaultValue: "NULL",
        },
        dupr_rating: {
            type: DataTypes.DECIMAL,
            defaultVlue: "NULL",
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        admin_for: {
            type: DataTypes.STRING,
            defaultValue: "NULL",
            references: {
                model: 'locations',
                key: 'id',
            },
        },
        isContact: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        contact_for: {
            type: DataTypes.STRING,
            defaultValue: "NULL",
            references: {
                model: 'locations',
                key: 'id',
            },
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        favorite_location: {
            type: DataTypes.STRING,
            references: {
                model: 'favorite_locations',
                key: 'id',
            },
        }, 
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8],
            },
        },
    },
    {
        hooks: {
            beforeCreate: async (newUserData) => {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            beforeUpdate: async (updatedUserData) => {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            },
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'users',
    }
);

module.exports = User;
