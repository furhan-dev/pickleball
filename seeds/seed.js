const sequelize = require('../config/connection');
const { User, Location } = require('../models');

const userSeed = require('./userData.json');
const LocationSeed = require('./locationData.json');

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

  process.exit(0);
};

seedDatabase();