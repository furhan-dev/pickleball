const Users = require('./User');
const Locations = require('./Location');
// const Playtimes = require('./Playtime');
const favoriteLocation = require('./favoriteLocation');

Users.hasMany(favoriteLocation, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

favoriteLocation.belongsTo(Users, {
  foreignKey: 'user_id'
});


module.exports = { Users, Locations, favoriteLocation };
