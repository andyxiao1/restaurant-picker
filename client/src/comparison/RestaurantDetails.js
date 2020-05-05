import React from 'react';
import { Col, Card } from 'react-bootstrap';
import Select from 'react-select';
import businesses from '../cache/businesses.json';

const RestaurantDetails = ({ data, status, onChange }) => {
  let body = null;
  if (status === 'input') {
    body = (
      <Select
        options={businesses}
        placeholder="Search for a business"
        onChange={onChange}
      />
    );
  } else {
    const [
      ,
      name,
      address,
      stars,
      reviewCount,
      categories,
      demerits,
      inspectionGrade,
      avgRating,
      minRating,
      maxRating,
      hasBetterFood,
      isCleaner,
    ] = data;
    body = (
      <>
        <h3>{name}</h3>
        <p>{address}</p>
        <p>
          {stars} Stars {hasBetterFood === 1 && <Checkmark />}
        </p>
        <p>{reviewCount}</p>
        <p>{categories}</p>
        <p>
          {demerits} {isCleaner === 1 && <Checkmark />}
        </p>
        <p>{inspectionGrade}</p>
        <p>{avgRating.toFixed(2)}</p>
        <p>{minRating.toFixed(2)}</p>
        <p>{maxRating.toFixed(2)}</p>
      </>
    );
  }
  return (
    <Col>
      <Card className="p-3 h-75 text-center">{body}</Card>
    </Col>
  );
};

const Checkmark = () => (
  <span style={{ position: 'absolute', right: 20, fontSize: 20 }}>
    &#10003;
  </span>
);

export default RestaurantDetails;
