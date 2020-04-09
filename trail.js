'use strict';

function trailHandler(req, res) {
    const lat = req.query.latitude;
    const lon = req.query.longitude;
    getTrailDataFromAPI(lat, lon).then((trailData) =>
    res.status(200).json(trailData)
    );
  }
  function getTrailDataFromAPI(lat, lon) {
    let key = process.env.TRAIL_API_KEY;
    const url = `https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${lon}&maxDistance=200&key=${key}`;
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

  module.exports= Trail;