import React, { Component } from 'react';
import { Row } from 'react-bootstrap';
import RestaurantDetails from './RestaurantDetails';
import RestaurantRow from './RestaurantRow';



export default class Filter extends React.Component {
  constructor(props) {
    super(props);

    // The state maintained by this React Component. This component maintains the list of genres,
    // and a list of movies for a specified genre.
    this.state = {
      genres: [],
      movies: []
    }

    this.showMovies = this.showMovies.bind(this);
  }

  // React function that is called when the page load.
  componentDidMount() {
    // Send an HTTP request to the server.
    fetch("http://localhost:8081/genres",
    {
      method: 'GET' // The type of HTTP request.
    }).then(res => {
      // Convert the response data to a JSON.
      return res.json();
    }, err => {
      // Print the error if there is one.
      console.log(err);
    }).then(genreList => {
      if (!genreList) return;
      // Map each genreObj in genreList to an HTML element:
      // A button which triggers the showMovies function for each genre.
      let genreDivs = genreList.map((genreObj, i) =>
      <GenreButton id={"button-" + genreObj.name} onClick={() => this.showMovies(genreObj.name)} name={genreObj.name} />
      );

      

      // Set the state of the genres list to the value returned by the HTTP response from the server.
      this.setState({
        genres: genreDivs
      });
    }, err => {
      // Print the error if there is one.
      console.log(err);
    });
  }


  /* ---- Q1b (Dashboard) ---- */
  /* Set this.state.movies to a list of <DashboardMovieRow />'s. */
  showMovies(genre) {
    fetch("http://localhost:8081/genres/" + genre,
		{
			method: "GET"
		}).then(res => {
			return res.json();
		}, err => {
			console.log(err);
		}).then(moviesList => {
			console.log(moviesList); //displays your JSON object in the console
			let moviesDivs = moviesList.map((movie, i) => 
			<DashboardMovieRow id={"movie-" + movie.title} title = {movie.title} rating = {movie.rating} vote_count = {movie.vote_count}/>
	      );

	//This saves our HTML representation of the data into the state, which we can call in our render function
    this.setState({ movies: moviesDivs
    });
  }, err => {
    // Print the error if there is one.
    console.log(err);
	});
  }

  render() {    
    return (
      <div className="Dashboard">
        <br></br>
        <div className="container movies-container">
          <div className="jumbotron">
            <div className="h5">Top Movies</div>
            <div className="genres-container">
              {this.state.genres}
            </div>
          </div>

          <br></br>
          <div className="jumbotron">
            <div className="movies-container">
              <div className="movies-header">
                <div className="header-lg"><strong>Name</strong></div>
                <div className="header"><strong>Grade</strong></div>
                <div className="header"><strong>Stars</strong></div>
                <div className="header"><strong>Address</strong></div>
              </div>
              <div className="results-container" id="results">
                {this.state.restaurants}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}