import React from 'react';

export default class RestaurantRow extends React.Component {
	render() {
		return (
			<div className="results">
				<div className="name">{this.props.name}</div>
				<div className="grade">{this.props.grade}</div>
				<div className="stars">{this.props.stars}</div>
				<div className="address">{this.props.address}</div>
			</div>
		);
	}
}