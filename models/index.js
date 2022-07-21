const User = require('./User');
const Location = require('./Location');
const UserLocation = require('./UserLocation');
// const Playtimes = require('./Playtime');
// const favoriteLocation = require('./favoriteLocation');

// User.hasMany(Location, {
//   foreignKey: 'id',
// });

Location.belongsToMany(User, { through: UserLocation });
User.belongsToMany(Location, { through: UserLocation });

module.exports = { User, Location, UserLocation };
