import React, { Component } from 'react';
import SavedRestaurantRow from './SavedRestaurantRow.js';


export default class History extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: "",
			savedRests: []
		};

		this.changeUsername = this.changeUsernameFunc.bind(this);
		this.showSavedRestaurants = this.showSavedRestaurantsFunc.bind(this);
	}

	changeUsernameFunc(e){
		this.setState({
			username: e.target.value
		});
	}

	showSavedRestaurantsFunc(){
		fetch("http://localhost:8081/history/" + this.state.username,
		{
			method: "GET"
		}).then(res => {
			return res.json();
		}, err => {
			console.log(err);
		}).then(restList => {
			if(!restList) return;
			let restListIter = restList.rows;
			let restDivs = restListIter.map((restObj, i) =>
				<SavedRestaurantRow name={restList.rows[i][0]}/>
				);
			this.setState({
				savedRests: restDivs
			});
		}, err => {
			console.log(err);
		})
	}




	componentDidMount(){
	}

	render() {
		return(
			<div>
				<div className ="input-container">
				<input type='text' placeholder="Enter Username" value={this.state.username} onChange={this.changeUsername}/>
				</div>
				<div>
				<button className="submit-btn" onClick={this.showSavedRestaurants}>Show Me My Saved Restaurants</button>
			    </div>
			    <div className="h5" id="centerTitle">Your Saved Restaurants</div>
			        <div className="rests-container">
			          <div className="rest">
			            <div className="header"><strong>Restaurant Name</strong></div>
			          </div>
			          <div className="rests-container" id="results">
			            {this.state.savedRests}
			          </div>
			        </div>
			</div>


		);
	}
}