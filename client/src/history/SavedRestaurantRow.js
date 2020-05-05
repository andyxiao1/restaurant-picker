import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './History.css';

export default class SavedRestaurantRow extends React.Component {
	render() {
		return (
			<div className="results">
				<div className="name">{this.props.name}</div>
			</div>
		);
	}
}
