'use strict';
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT || 3000;

const server = express();
server.use(cors());
server.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`);
})
server.get('/', (req, res)=>{
    res.status(200).send('congrats bish');
})
server.get('/location', (req, res)=>{
    const geoData = require('./data/geo.json');
    const city = req.query.city;
    const locationData = new Location(city, geoData);
    res.send(locationData);
})
function Location(city, geoData){
    this.search_query= city;
    this.formatted_query= geoData[0].display_name;
    this.latitude= geoData[0].lat;
    this.longitude= geoData[0].lon;
}

server.get('/weather', (req, res)=>{
    const weatherData = require('./data/weather.json');
    const city = req.query.city;
    let weatherArr =[];
    weatherData.data.forEach((value)=>{
        const forecast = new Weather(value.weather.description, value.datetime );
        weatherArr.push(forecast);
    })
    res.send(weatherArr);
    
})
function Weather(description, datetime){
    this.description= description;
    this.time= datetime;
}


server.use('*', (req, res) => {
    res.status(404).send('NOT FOUND');
});

server.use((error, req, res) => {
    res.status(500).send(error);
})