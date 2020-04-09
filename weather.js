'use strict';

function weatherHandler(req, res) {
    const city = req.query.city_name;
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
  module.exports= Weather;