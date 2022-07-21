const router = require('express').Router();
const openGeocoder = require('node-open-geocoder');
const NodeGeocoder = require('node-geocoder');
const geolib = require('geolib');
const { Location } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const locationData = await Location.findAll();
    let locations = locationData.map((Location) => Location.get({ plain: true }));

    console.log(req.body.place);
    // get user input location lat, lon
    const userCoordinates = getCoordinates(req.body.place).then(userCoor => {
      locations = locations.map(location => {
        // console.log("location: " + JSON.stringify(location))
        getCoordinates(location.address)
          .then(coor => {
            console.log("LOCATION COOR: " + coor);
            const distanceFromUser = getDistance(userCoor, coor);
            console.log("distance: " + distanceFromUser);
            // convert to miles and add to location object
            location.distanceFromUser = distanceFromUser;
          });
      });

    });
    res.status(200).json(locations);
    // get lat, lon, distance from user for each location

    // res.render('homepage', {
    //   locations,
    // });
  } catch (err) {
    res.status(400).json(err);
  }
});

function getDistance(source, destination) {
  console.log("SOURCE " + source);
  console.log("DESTINATION " + destination);
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
    // openGeocoder()
    //   .geocode(place)
    //   .end((err, response) => {
    //     console.log("PLACE " + place);
    //     // console.log("RESPONSE " + JSON.stringify(response));
    //     if (err || !response) res.status(400).json(err);
    const lat = res[0].latitude;
    const lon = res[0].longitude;
    console.log(lat + ", " + lon);
    //     const coor = { latitude: lat, longitude: lon };
    //     console.log(JSON.stringify("COOR: " + coor));
    return { latitude: res[0].latitude, longitude: res[0].longitude };
  } catch (err) {
    res.status(400).json(err);
  }
}

module.exports = router;
