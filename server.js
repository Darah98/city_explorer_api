'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const superagent = require('superagent');

const PORT = process.env.PORT || 3000;
const server = express();
server.use(cors());

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
server.get('/', (req, res) => {
  res.send('HEERREEE');
});
server.get('/location', locationHandler);
server.get('/weather', weatherHandler);
server.get('/trails', trailHandler);

function locationHandler(req, res) {
  const city = req.query.city;
  getLocDataFromAPI(city).then((locationData) =>
    res.status(200).json(locationData)
  );
}
function getLocDataFromAPI(city) {
  let key = process.env.GEOCODE_API_KEY;
  const url = `https://eu1.locationiq.com/v1/search.php?key=${key}&q=${city}&format=json`;
  return superagent.get(url).then((geoData) => {
    const locationData = new Location(city, geoData.body);
    return locationData;
  });
}
function Location(city, geoData) {
  this.city = city;
  this.formatted_query = geoData[0].display_name;
  this.latitude = geoData[0].lat;
  this.longitude = geoData[0].lon;
}
function weatherHandler(req, res) {
  const city = req.query.city;
  getWeatherDataFromAPI(city).then((weatherData) =>
    res.status(200).json(weatherData)
  );
}
function getWeatherDataFromAPI(city) {
  let key = process.env.WEATHER_API_KEY;
  const url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${key}`;
  return superagent.get(url).then((weatherData) => {
    let weatherArr = weatherData.body.data.map((value) => {
      return new Weather(value.weather.description, value.datetime);
    });
    return weatherArr;
  });
}
function Weather(description, datetime) {
  this.forecast = description;
  this.time = datetime;
}
function trailHandler(req, res) {
  const lat = req.query.latitude;
  const lon = req.query.longitude;
  getTrailDataFromAPI(lat, lon).then((trailData) =>
    res.status(200).json(trailData)
  );
}
function getTrailDataFromAPI(lat, lon) {
  let key = process.env.TRAIL_API_KEY;
  const url = `https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${lon}&key=${key}`;
  return superagent.get(url).then((trailData) => {
    let trailArr = trailData.body.trails.map((value) => {
      return new Trail(
        value.name,
        value.location,
        value.length,
        value.stars,
        value.starVotes,
        value.summary,
        value.url,
        value.conditionDetails,
        value.conditionDate
      );
    });
    return trailArr;
  });
}
function Trail(
  name,
  location,
  length,
  stars,
  starVotes,
  summary,
  url,
  conditionDetails,
  conditionDate
) {
  this.name = name;
  this.location = location;
  this.length = length;
  this.stars = stars;
  this.star_votes = starVotes;
  this.summary = summary;
  this.trail_url = url;
  this.conditions = conditionDetails;
  this.condition_date = conditionDate.slice(0, -9);
  this.condition_time = conditionDate.slice(-9);
}

server.use('*', (req, res) => {
  res.status(500).send('Sorry, something went wrong!');
});

server.use((error, req, res) => {
  res.status(500).send(error);
});
