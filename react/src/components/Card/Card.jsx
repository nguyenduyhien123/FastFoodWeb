import React from "react";
import Button from "react-bootstrap";
import Card from "react-bootstrap";
const Card = (props) => {
  return (
    <Card>
      <Card.Img variant="top" src={props.img}></Card.Img>
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>{props.des}</Card.Text>
        <Button variant="primary">Mua</Button>
      </Card.Body>
    </Card>
  );
};

export default Card;
