import React, { Component } from 'react';
import { Row } from 'react-bootstrap';
import RestaurantDetails from './RestaurantDetails';
import RestaurantComparisonLabels from './RestaurantComparisonLabels';

const initialState = {
  restaurantData: null,
  status: 'input',
  id1: '',
  id2: '',
};

class RestaurantComparison extends Component {
  state = initialState;

  fetchComparisonData = () => {
    const { id1, id2 } = this.state;
    if (!id1 || !id2) {
      alert('Missing restaurant ids!');
      return;
    }
    fetch(`http://localhost:8081/api/compare?id1=${id1}&id2=${id2}`)
      .then((res) => res.json())
      .then(({ successful, message, restaurantData }) => {
        if (successful) {
          this.setState({ restaurantData, status: 'display' });
        } else {
          throw new Error(message);
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  };

  onChange = (restaurant) => {
    return ({ value }) => {
      this.setState({ [restaurant]: value });
    };
  };

  reset = () => {
    this.setState(initialState);
  };

  render() {
    let restaurantOne = null,
      restaurantTwo = null;
    const { status, restaurantData, id1, id2 } = this.state;
    if (status === 'display') {
      [restaurantOne, restaurantTwo] = restaurantData.rows;
      if (restaurantOne[0] !== id1) {
        [restaurantTwo, restaurantOne] = [restaurantOne, restaurantTwo];
      }
      // H2Chxto2e6dHTDJ8-s3-pQ -- Roberto Taco Shop
      // v2UKNMDqWN1UaWlK2Ugx2Q -- Cicis Pizza
      // 7v-2HkyrfYkPf471v4gCmg -- Star Bucks
      // Yo8NIJEtc8UEbPd38L35ow -- China One
    }
    return (
      <Row className="h-100">
        <RestaurantComparisonLabels
          status={status}
          onReset={this.reset}
          onCompare={this.fetchComparisonData}
        />
        <RestaurantDetails
          data={restaurantOne}
          status={status}
          onChange={this.onChange('id1')}
          id={id1}
        />
        <RestaurantDetails
          data={restaurantTwo}
          status={status}
          onChange={this.onChange('id2')}
          id={id2}
        />
      </Row>
    );
  }
}

export default RestaurantComparison;
