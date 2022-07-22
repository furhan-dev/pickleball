const router = require('express').Router();
const { Location, Event, User, UserLocation } = require('../models'); // locations > Location
const withAuth = require('../utils/auth');

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

    const locationData = await Location.findAll({})

    const locations = locationData.map((Location) => Location.get({ plain: true }));

    console.log("EVENTS: " + JSON.stringify(events));

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


router.get('/location/:id', async (req, res) => {
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

module.exports = router;
