import React from 'react';
import { Col, Card, Form } from 'react-bootstrap';

const RestaurantDetails = ({ data, status, onNameChange, name }) => {
  let body = null;
  if (status === 'input') {
    body = (
      <Form.Control
        onChange={onNameChange}
        value={name}
        placeholder="Restaurant ID"
      ></Form.Control>
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
