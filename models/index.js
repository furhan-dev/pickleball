const Users = require('./Users');
const Locations = require('./Locations');
const Playtimes = require('./Playtimes');
const Favorite_locations = require('./Favorite_locations');

Users.hasMany(Favorite_locations, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Favorite_locations.belongsTo(User, {
  foreignKey: 'user_id'
});

Locations.hasMany(Playtimes, {
    foreignKey: "locations",
    // Watch out - cascading ondelete?
});

Playtimes.hasMany(Locations, {
    foreignKey: availability,
    // watch out - cascading ondelete?
});


module.exports = { Users, Locations, Playtimes, Favorite_locations };
