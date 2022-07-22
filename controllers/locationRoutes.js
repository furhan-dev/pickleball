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
        attributes: ['name', 'address']

      }

    }
    );
    const events = eventData.map((Event) => Event.get({ plain: true }));

    // const locations = locationData.map((Location) => Location.get({ plain: true }));

    console.log("EVENTS: " + JSON.stringify(events));

    // Pass serialized data and session flag into template
    res.render('homepage', {
      events,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/location/:id', async (req, res) => {
  try {
    const locationData = await Location.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const location = locationData.get({ plain: true });

    res.render('location', {
      ...location,
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
    const userlocationData = await UserLocation.findAll({
      // include: [
      //   {
      //     model: Location,
      //     attributes: ['name', 'description', 'num_courts']
      //   },
      // ],
      //  where: {
      //   user_id: req.session.user_id,
      // },
    });

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

// router.get('/search', (req, res) => {
//   // If the user is already logged in, redirect the request to another route
//   // const locations = [{ name: "bar", address: "123", description: "abc", num_courts: "3" }];
//   console.log("REQ PARAMS: " + req.params.location);
//   const locations = [{ "id": 1, "name": "Greenlake", "description": "Mixed ages and levels. Open play hours are from 6pm to Sunset.", "num_courts": 8, "address": "7201 East Green Lake Dr N, Seattle, WA 98115", "image": null, "distanceFromUser": "5.29" }, { "id": 2, "name": "Everest Park", "description": "Dedicated pickleball courts. Always open play except when there are league matches on Tues/Thurs summer evenings.", "num_courts": 3, "address": "500 8th St S, Kirkland, WA 98033", "image": null, "distanceFromUser": "7.91" }, { "id": 3, "name": "Shoreview Park", "description": "Dedicated pickleball courts. Hosts many Seattle-area tournaments.", "num_courts": 6, "address": "700 NW Innis Arden Way Shoreline, WA 98177", "image": null, "distanceFromUser": "10.14" }, { "id": 4, "name": "Battle Point Park", "description": "Dedicated pickleball courts. Home of the annual Founders Tournament.", "num_courts": 6, "address": "11299 Arrow Point Dr NE, Bainbridge Island, WA 98110", "image": null, "distanceFromUser": "12.18" }];
//   res.render('search', {
//     locations
//   })
// });

router.get('/search/:id', async (req, res) => {
  try {
    const locationData = await Location.findAll();
    const locations = locationData.map((Location) => Location.get({ plain: true }));

    // get user input location lat, lon
    const userCoordinates = await getCoordinates(req.params.id)
    console.log("REQ BODY " + req.params.id);
    for (let i = 0; i < locations.length; i++) {
      const location = locations[i];
      // get lat, lon, distance from user for each location
      const locationCoordinates = await getCoordinates(location.address)
      // get distance from user
      location.distanceFromUser = getDistance(userCoordinates, locationCoordinates);
    }
    console.log("locations: " + JSON.stringify(locations));
    console.log("Hello WORLD");
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
    console.log("LAT, LON " + lat + ", " + lon)
    return { latitude: res[0].latitude, longitude: res[0].longitude };
  } catch (err) {
    res.status(400).json(err);
  }
}

module.exports = router;
