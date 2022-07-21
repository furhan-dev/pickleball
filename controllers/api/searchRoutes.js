const router = require('express').Router();
const NodeGeocoder = require('node-geocoder');
const geolib = require('geolib');
const { Location } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const locationData = await Location.findAll();
    const locations = locationData.map((Location) => Location.get({ plain: true }));

    // get user input location lat, lon
    const userCoordinates = await getCoordinates(req.body.place)
    console.log("REQ BODY " + req.body.place);
    for (let i = 0; i < locations.length; i++) {
      const location = locations[i];
      // get lat, lon, distance from user for each location
      const locationCoordinates = await getCoordinates(location.address)
      // get distance from user
      location.distanceFromUser = getDistance(userCoordinates, locationCoordinates);
    }
    console.log("locations: " + JSON.stringify(locations));
    res.render('homepage', {
      locations,
    });
    // res.status(200).json(locations);
  } catch (err) {
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
