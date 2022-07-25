const User = require('./User');
const Location = require('./Location');
const Event = require('./Event');
const EventLocation = require('./EventLocation');
const UserLocation = require('./UserLocation');

Location.belongsToMany(User, { through: UserLocation });
User.belongsToMany(Location, { through: UserLocation });

Event.belongsTo(Location, {
  through: {
    model: EventLocation,
    unique: false,
    as: "location"
  }
});

Location.belongsToMany(Event, {
  through: {
    model: EventLocation,
    unique: false,
    as: "events"
  }
});

module.exports = { User, Location, Event, EventLocation, UserLocation };
