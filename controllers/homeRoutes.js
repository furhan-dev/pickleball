const router = require('express').Router();
const { Location, Event, User, UserLocation } = require('../models'); // locations > Location
const withAuth = require('../utils/auth');
const NodeGeocoder = require('node-geocoder');
const geolib = require('geolib');

router.get('/', async (req, res) => {
  try {

    // const locationData = await Location.findAll();
    const eventData = await Event.findAll({
      include:
      {
        model: Location,
        attributes: ['name', 'address', "id"]
      }
    }
    );
    const events = eventData.map((Event) => Event.get({ plain: true }));
    const locationData = await Location.findAll({})
    const locations = locationData.map((Location) => Location.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', {
      events,
      locations,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/location/:id', withAuth, async (req, res) => {
  try {
    const locationData = await Location.findAll({
      where: {
        id: req.params.id
      }
    })

    const locations = locationData.map((Location) => Location.get({ plain: true }));

    res.render('location', {
      locations,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userlocationData = await UserLocation.findAll();

    // Serialize data so the template can read it
    const userlocations = userlocationData.map((UserLocation) => UserLocation.get({ plain: true }));

    const userData = await User.findAll({
      where: {
        id: req.session.user_id
      }
    })

    const user = userData.map((User) => User.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('profile', {
      userlocations,
      user,
      logged_in: req.session.logged_in
    });


  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('signup');
});

router.get('/about', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  res.render('about', {
    logged_in: req.session.logged_in
  })
});

router.get('/search/:id', async (req, res) => {
  try {
    const locationData = await Location.findAll();
    const locations = locationData.map((Location) => Location.get({ plain: true }));

    // get user input location lat, lon
    const userCoordinates = await getCoordinates(req.params.id)
    for (let i = 0; i < locations.length; i++) {
      const location = locations[i];
      // get lat, lon, distance from user for each location
      const locationCoordinates = await getCoordinates(location.address)
      // get distance from user
      location.distanceFromUser = getDistance(userCoordinates, locationCoordinates);
    }
    res.render('search', {
      locations,
    });
    // res.status(200).json(locations);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

function getDistance(source, destination) {
  const distanceFromUser = geolib.getDistance(source, destination);
  // convert to miles and add to location object
  return (distanceFromUser / 1609.344).toFixed(2);
}

async function getCoordinates(place) {
  const options = {
    provider: 'openstreetmap'
  };
  try {
    const geocoder = NodeGeocoder(options);
    const res = await geocoder.geocode(place);
    const lat = res[0].latitude;
    const lon = res[0].longitude;
    return { latitude: res[0].latitude, longitude: res[0].longitude };
  } catch (err) {
    res.status(400).json(err);
  }
}

module.exports = router;
