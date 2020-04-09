'use strict';

function locationHandler(req, res) {
    const city = req.query.city;
    let SQL= 'SELECT * FROM cities WHERE city_name LIKE $1';
      client.query(SQL, [city]).then((results)=>{
        if (results.rows.length){
          res.status(200).json(results.rows[0]);
        } else { 
          getLocDataFromAPI(city).then((locationData) =>
          res.status(200).json(locationData)
          );
        }    
      })
  }
  function getLocDataFromAPI(city) {
    let key = process.env.GEOCODE_API_KEY;
    const url = `https://eu1.locationiq.com/v1/search.php?key=${key}&q=${city}&format=json`;
    return superagent.get(url)
    .then((geoData) => {
      let locationData = new Location(city, geoData.body);
      let sql = 'INSERT INTO cities (city_name, formatted_query, latitude, longitude) VALUES ($1, $2, $3, $4)';
      let safeValues=[
      locationData.city_name,
      locationData.formatted_query,
      locationData.latitude,
      locationData.longitude
      ];
      client.query(sql, safeValues);
      return locationData;
      });
  }
  function Location(city, geoData) {
    this.city_name = city;
    this.formatted_query = geoData[0].display_name;
    this.latitude = geoData[0].lat;
    this.longitude = geoData[0].lon;
  }
  module.exports = Location;