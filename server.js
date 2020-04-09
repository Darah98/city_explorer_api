'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const superagent = require('superagent');
const pg= require('pg');
const server = express();
server.use(cors());

const client = new pg.Client(process.env.DATABASE_URL);
const PORT = process.env.PORT || 3000;

server.get('/', (req, res) => {
  res.send('HEERREEE');
});
// server.get('/location', locationHandler);
// server.get('/weather', weatherHandler);
// server.get(('/movies'), movieHandler);
// server.get(('/yelp'), yelpHandler);
// server.get('/trails', trailHandler);

const locationFile= require('./location.js');
const weatherFile= require('./weather.js');
const yelpFile= require('./yelp.js');
const movieFile= require('./movie.js');
const trailFile= require('./trail.js');

server.use('*', (req, res) => {
  res.status(500).send('Sorry, something went wrong!');
});
server.use((error, req, res) => {
  res.status(500).send(error);
});
client.connect()
.then(()=>{
  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
});