'use strict';


function movieHandler(req, res){
    const city= req.query.city_name;
    getMovieDataFromAPI(city)
    .then(movieData=>{
      res.status(200).json(movieData);
    })
  }
  function getMovieDataFromAPI(city){
    let key= process.env.MOVIE_API_KEY;
    const url= `https://api.themoviedb.org/3/movie/550?api_key=${key}`;
    superagent.get(url)
    .then(movieData=>{
      let movieData= new Movie(city, movieData.body);
    })
  }
  function Trail(){
      this.title= title;
      
  }

  module.exports= Movie;