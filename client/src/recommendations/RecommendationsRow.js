import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Preferences.css';

export default class RecommendationsRow extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="results">
				<div className="name">{this.props.name}</div>
				<div className="address">{this.props.address}</div>
			</div>
		);
	}
}
