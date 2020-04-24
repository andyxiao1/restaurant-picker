import React, { Component } from 'react';
import { Row } from 'react-bootstrap';
import RestaurantDetails from './RestaurantDetails';

class Head2Head extends Component {
  state = {};

  componentDidMount() {
    // TODO load data from server, send data to restaurant details
  }

  render() {
    return (
      <Row className="text-center h-100">
        <RestaurantDetails name="Restaurant 1" />
        <RestaurantDetails name="Restaurant 2" />
      </Row>
    );
  }
}

export default Head2Head;
