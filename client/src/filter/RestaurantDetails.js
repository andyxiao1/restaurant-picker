import React from 'react';
import { Col, Card } from 'react-bootstrap';

const RestaurantDetails = ({ name }) => {
  return (
    <Col>
      <Card className="h-75">
        <h3>{name}</h3>
        
      </Card>
    </Col>
  );
};

export default RestaurantDetails;
