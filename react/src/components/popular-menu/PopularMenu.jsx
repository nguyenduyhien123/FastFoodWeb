import React from 'react';
import { Col, Container, Row } from "reactstrap";
import { popularMenuFood } from '../../assets/fake-data/products';
import ProductCard from '../product_card/ProductCard';
const PopularMenu = () => {
  return (
    <section>
        <Container className='pt-0'>
            <Row>
                <Col lg='12' className='mb-5'>
                    <h2>Popular food menu</h2>
                </Col>

                {
                    popularMenuFood?.map(item=>(
                        <Col lg='3' key={item.id}>
                            <ProductCard item={item}/>
                        </Col>
                    ))
                }
            </Row>
        </Container>
    </section>
  )
}

export default PopularMenu
