import React from 'react';
import { Col, Button } from 'react-bootstrap';

const labels = [
  'Address',
  'Stars',
  'Review Count',
  'Categories',
  'Demerits',
  'Inspection Grade',
  'Average Rating',
  'Minimum Rating',
  'Maximum Rating',
];

const RestaurantComparisonLabels = ({ status, onReset, onCompare }) => {
  const isInput = status === 'input';
  const button = (
    <Button
      variant="primary"
      onClick={isInput ? onCompare : onReset}
      className="mb-2"
    >
      {isInput ? 'Compare!' : 'Reset'}
    </Button>
  );
  return (
    <Col className="col-1 pt-2">
      {button}
      {!isInput &&
        labels.map((label) => (
          <p key={label}>
            <strong>{label}:</strong>
          </p>
        ))}
    </Col>
  );
};

export default RestaurantComparisonLabels;
