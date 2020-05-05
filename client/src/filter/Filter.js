import React, { Component } from 'react';
import RestaurantRow from './RestaurantRow';
import '../style/Filter.css';



export default class Filter extends Component {
  constructor(props) {
		super(props);

		this.state = {
			selectedGrade: "",
			grades: [],
      rests: [],
      stars: [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5],
      selectedStar: 5
		};

		this.submitGrade = this.submitGrade.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeStar = this.handleChangeStar.bind(this);
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
      console.log(gradeList);
      if (!gradeList) return;
     
      let gradeDivs = gradeList.rows.map((gradeObj, i) =>
			<option value={gradeObj}>{gradeObj}</option> 
      );
      
      let starDivs = 
      [<option value={1}>{1}</option>, <option value={1.5}>{1.5}</option>,
        <option value={2}>{2}</option>, <option value={2.5}>{2.5}</option>,
        <option value={3}>{3}</option>, <option value={3.5}>{3.5}</option>,
        <option value={4}>{4}</option>, <option value={4.5}>{4.5}</option>,
        <option value={5}>{5}</option>  ];

      this.setState({
				grades: gradeDivs,
        selectedGrade: gradeList.rows[0],
        stars: starDivs
      });
    }, err => {
      // Print the error if there is one.
      console.log(err);
    });

    console.log(this.state.grades);

	}

	handleChange(e) {
		this.setState({
			selectedGrade: e.target.value
		});
  }
  
  handleChangeStar(e) {
		this.setState({
			selectedStar: e.target.value
		});
	}

	/* ---- Q3b (Best Genres) ---- */
	submitGrade() {
    fetch("http://localhost:8081/filter/" + this.state.selectedGrade + "/" + this.state.selectedStar,
		{
			method: "GET"
		}).then(res => {
			return res.json();
		}, err => {
			console.log(err);
		}).then(restList => {
			console.log(restList); //displays your JSON object in the console
			let restDivs = restList.rows.map((restObj, i) => 
			<RestaurantRow name = {restObj[0]} grade = {restObj[1]} stars = {restObj[2]} address = {restObj[3]}/>
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
			        <div className="h4">Select Filters</div>
			        <div className="years-container">
			          <div className="dropdown-container">
                <p></p>
                  <div>Minimum Inspection Grade: </div>
			            <select value={this.state.selectedGrade} onChange={this.handleChange} className="dropdown" id="gradesDropdown">
			            	{this.state.grades}
			            </select>
                  <div>Minimum Star level: </div>
                  <select value={this.state.selectedStar} onChange={this.handleChangeStar} className="dropdown" id="starsDropdown">
			            	{this.state.stars}
			            </select>
                  <p></p>
			            <button className="submit-btn" id="gradesSubmitBtn" onClick={this.submitGrade}>Submit</button>
			          </div>
			        </div>
			      </div>
			      <div className="jumbotron">
              <div className="h5">Results</div>
			        <div className="rests-container">
			          <div className="rest">
			            <div className="header"><strong>Restaurant Name</strong></div>
			            <div className="header"><strong>Stars</strong></div>
                  <div className="header"><strong>Inspection Grade</strong></div>
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