import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'

export default class RestaurantRow extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="restaurant">
				<div className="name">{this.props.name}</div>
				<div className="grade">{this.props.grade}</div>
				<div className="stars">{this.props.stars}</div>
				<div className="address">{this.props.address}</div>
			</div>
		);
	}
}