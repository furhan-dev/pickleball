const Users = require('./User');
const Locations = require('./Location');
// const Playtimes = require('./Playtime');
const Favorite_locations = require('./Favorite_locations');

Users.hasMany(Favorite_locations, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Favorite_locations.belongsTo(Users, {
  foreignKey: 'user_id'
});


module.exports = { Users, Locations, Favorite_locations };
