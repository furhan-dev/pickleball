const sequelize = require('../config/connection');
const { User, Location, UserLocation } = require('../models');

const userData = require('./userData.json');
const locationData = require('./locationData.json');
const userLocationData = require('./userLocationData.json')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const location of locationData) {
    await Location.create({
      ...location,
    });
  }

  for (const userL of userLocationData) {
    await UserLocation.create({
      ...userL,
    });
  }

  process.exit(0);
};

seedDatabase();