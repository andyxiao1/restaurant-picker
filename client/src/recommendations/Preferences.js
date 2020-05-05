import React, { Component } from 'react';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import RecommendationsRow from './RecommendationsRow';
import './Preferences.css';

export default class Preferences extends Component {
	constructor(props){
		super(props);
		this.state ={
			priceValue:-3,
			outdoorValue:-3,
			creditValue:-3,
			takeoutValue: -3,
			username: "",
			recRestaurants: [],
			recIds: [],
		};

		this.changePrice = this.changePriceFunc.bind(this);
		this.changeOutdoor = this.changeOutdoorFunc.bind(this);
		this.changeCredit = this.changeCreditFunc.bind(this);
		this.changeTakeout = this.changeTakeoutFunc.bind(this);
		this.changeUsername = this.changeUsernameFunc.bind(this);
		this.submitPrefs = this.submitPrefsFunc.bind(this);
		this.addToSaved = this.addToSavedFunc.bind(this);

	}

	changePriceFunc(e){
		this.setState({
			priceValue: e
		});
	}

	changeOutdoorFunc(e){
		this.setState({
			outdoorValue: e
		});
	}

	changeCreditFunc(e){
		this.setState({
			creditValue: e
		});
	}

	changeTakeoutFunc(e){
		this.setState({
			takeoutValue: e
		})
	}

	changeUsernameFunc(e){
		this.setState({
			username: e.target.value
		})
	}

	submitPrefsFunc(){ 
		if(this.state.username === ""){
			window.alert("Make sure you enter a username before you hit submit!")
		} else {
		fetch("http://localhost:8081/preferences/" + this.state.username + "/" +this.state.priceValue+ "/" + this.state.creditValue + "/" + this.state.takeoutValue + "/" + this.state.outdoorValue,
			{
				method: "GET"
			}).then(res => {
				return res.json();
			}, err => {
				console.log(err);
			}).then(recList => {
				if(!recList) return;
				let recListIter = recList.rows
				console.log(recList.rows[3]);
				let recDivs = recListIter.map((recObj,i) => 
					<RecommendationsRow name={recList.rows[i][0]} address={recList.rows[i][1]}/>
					);
				let tempIds = [recList.rows[0][2], recList.rows[1][2], recList.rows[2][2]];
				console.log(tempIds);
				this.setState({
					recRestaurants: recDivs,
					recIds: tempIds
				});

			}, err=> {
				console.log(err)
			});
		}
	}

	addToSavedFunc(){
		if(this.state.username === "" || (this.state.recIds === undefined || this.state.recIds.length === 0)){
			window.alert("Make sure you enter a username and hit submit first!")
		} else {
			console.log("WE BOUTTA FETCH");
			console.log(this.state.username);
			console.log(this.state.recIds[0]);
			fetch("http://localhost:8081/preferences/saveRecs0/" + this.state.username + "/" + this.state.recIds[0],
			{
				method: "GET"
			}).then(res => {
				return res.json();
			}, err => {
				console.log(err);
			}).then(output => {
				console.log("PREF LINE 100")
				console.log(output)
			}, err => {
				console.log("PREF LINE 103")
				console.log(err);
			});
			fetch("http://localhost:8081/preferences/saveRecs1/" + this.state.username + "/" + this.state.recIds[1],
			{
				method: "GET"
			}).then(res => {
				return res.json();
			}, err => {
				console.log(err);
			}).then(output => {
				console.log("PREF LINE 116")
				console.log(output)
			}, err => {
				console.log("PREF LINE 119")
				console.log(err);
			});
			fetch("http://localhost:8081/preferences/saveRecs2/" + this.state.username + "/" + this.state.recIds[2],
			{
				method: "GET"
			}).then(res => {
				return res.json();
			}, err => {
				console.log(err);
			}).then(output => {
				console.log("PREF LINE 130")
				console.log(output)
			}, err => {
				console.log("PREF LINE 133")
				console.log(err);
			});

		}
	}

	
	componentDidMount(){

	}

	render() {
		return(
			<div>

			<div className="h4" id="centerTitle">Set Your Preferences</div>

			<div className ="input-container">
				<input type='text' placeholder="Enter Username" value={this.state.username} onChange={this.changeUsername}/>
			</div>

			<div className="togglePrice">
			<div className="h6"> What is your desired price level?</div>
			<ToggleButtonGroup name="PriceButtons" type="radio" value={this.state.priceValue} onChange={this.changePrice}>
			<ToggleButton value={-2}>Very Inexpensive</ToggleButton>
			<ToggleButton value={-1}>Somewhat Inexpensive</ToggleButton>
			<ToggleButton value={0}>Not Important</ToggleButton>
			<ToggleButton value={1}>Slighlty More Expensive</ToggleButton>
			<ToggleButton value={2}>Very Expensive</ToggleButton>
			</ToggleButtonGroup>
			</div>

			<br></br>

			<div className="toggleOutdoor">
			<div className="h6"> Do you like to dine outside?</div>
			<ToggleButtonGroup name="OutdoorButtons" type="radio" value={this.state.outdoorValue} onChange={this.changeOutdoor}>
			<ToggleButton value={-1}>Prefer Not To Sit Outdoors</ToggleButton>
			<ToggleButton value={0}>No Preference</ToggleButton>
			<ToggleButton value={1}>Prefer To Sit Outdoors</ToggleButton>
			</ToggleButtonGroup>
			</div>

			<br></br>

			<div className="toggleCredit">
			<div className="h6"> How do you normally prefer to pay?</div>
			<ToggleButtonGroup name="CreditButtons" type="radio" value={this.state.creditValue} onChange={this.changeCredit}>
			<ToggleButton value={-1}>Prefer To Pay Cash</ToggleButton>
			<ToggleButton value={0}>No Preference</ToggleButton>
			<ToggleButton value={1}>Prefer To Pay with a Credit Card</ToggleButton>
			</ToggleButtonGroup>
			</div>
			<br></br>

			<div className="toggleTakeout">
			<div className="h6"> How likely are you to want takeout?</div>
			<ToggleButtonGroup name="CreditButtons" type="radio" value={this.state.takeoutVal} onChange={this.changeTakeout}>
			<ToggleButton value={-1}>I rarely do takeout</ToggleButton>
			<ToggleButton value={0}>No Preference</ToggleButton>
			<ToggleButton value={1}>I usually prefer takout</ToggleButton>
			</ToggleButtonGroup>
			</div>

			<div>
				<button className="submit-btn" onClick={this.submitPrefs}>Submit</button>
			</div>

              <div className="h5" id="centerTitle">You should consider eating at...</div>
			        <div className="rests-container">
			          <div className="rest">
			            <div className="header"><strong>Restaurant Name</strong></div>
			            <div className="header"><strong>Address</strong></div>
			          </div>
			          <div className="rests-container" id="results">
			            {this.state.recRestaurants}
			          </div>
			        </div>
			    <div>
			    	<button onClick={this.addToSaved}>Add Top 3 To Saved</button>
			    </div>   
			</div>


		);
	}
}