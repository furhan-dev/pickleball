const User = require('./User');
const Location = require('./Location');
// const Playtimes = require('./Playtime');
const favoriteLocation = require('./favoriteLocation');

User.hasMany(favoriteLocation, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

favoriteLocation.belongsTo(User, {
  foreignKey: 'user_id'
});


module.exports = { User, Location, favoriteLocation };
