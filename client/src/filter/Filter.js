import React, { Component } from 'react';
//import { Row } from 'react-bootstrap';
//import RestaurantDetails from './RestaurantDetails';
import RestaurantRow from './RestaurantRow';



export default class Filter extends React.Component {
  constructor(props) {
		super(props);

		this.state = {
			selectedGrade: "",
			grades: [],
			rests: []
		};

		this.submitGrade = this.submitGrade.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	/* ---- Q3a (Best Genres) ---- */
	componentDidMount() {
		// Send an HTTP request to the server.
    fetch("http://localhost:8081/filter",
    {
      method: 'GET' // The type of HTTP request.
    }).then(res => {
      // Convert the response data to a JSON.
      return res.json();
    }, err => {
      // Print the error if there is one.
      console.log(err);
    }).then(gradeList => {
      if (!gradeList) return;
      // Map each genreObj in genreList to an HTML element:
      // A button which triggers the showMovies function for each genre.
      let gradeDivs = gradeList.map((gradeObj, i) =>
			<option value={gradeObj.grade}>{gradeObj.grade}</option> 
			);

      // Set the state of the genres list to the value returned by the HTTP response from the server.
      this.setState({
				grade: gradeDivs,
				selectedGrade: gradeList[0].grade
      });
    }, err => {
      // Print the error if there is one.
      console.log(err);
    });

	}

	handleChange(e) {
		this.setState({
			selectedGrade: e.target.value
		});
	}

	/* ---- Q3b (Best Genres) ---- */
	submitGrade() {
    fetch("http://localhost:8081/filter/" + this.state.selectedGrade,
		{
			method: "GET"
		}).then(res => {
			return res.json();
		}, err => {
			console.log(err);
		}).then(restList => {
			console.log(restList); //displays your JSON object in the console
			let restDivs = restList.map((restObj, i) => 
			<RestaurantRow name = {restObj.name} grade = {restObj.grade} stars = {restObj.stars} address = {restObj.address}/>
	      );

	//This saves our HTML representation of the data into the state, which we can call in our render function
    this.setState({ rests: restDivs
    });
  }, err => {
    // Print the error if there is one.
    console.log(err);
	});
  }

	render() {

		return (
			<div className="Restaurants">
				<div className="container restaurants-container">
			      <div className="jumbotron">
			        <div className="h5">Filter</div>
			        <div className="years-container">
			          <div className="dropdown-container">
			            <select value={this.state.selectedGrade} onChange={this.handleChange} className="dropdown" id="gradesDropdown">
			            	{this.state.grades}
			            </select>
			            <button className="submit-btn" id="decadesSubmitBtn" onClick={this.submitGrade}>Submit</button>
			          </div>
			        </div>
			      </div>
			      <div className="jumbotron">
			        <div className="rests-container">
			          <div className="rest">
			            <div className="header"><strong>Name</strong></div>
			            <div className="header"><strong>Inspection Grade</strong></div>
                  <div className="header"><strong>Stars</strong></div>
                  <div className="header"><strong>Address</strong></div>
			          </div>
			          <div className="rests-container" id="results">
			            {this.state.rests}
			          </div>
			        </div>
			      </div>
			    </div>
			</div>
		);
	}
}