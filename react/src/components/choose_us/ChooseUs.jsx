import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import pastaImg from '../../assets/images/pasta.png'
import './choose_us.scss'

const ChooseUs = () => {
  return (
    <section className='choose_us'     data-aos-duration="1000" data-aos="flip-left"    >
        <Container>
            <Row className='align-items-center'>
                <Col lg='6'>
                    <img src={pastaImg} alt="" className='w-100' />
                </Col>
                <Col lg='6'>
                    <div className="choose_content">
                        <h4>Who we are?</h4>
                        <h2>Take a look at the benefits we offer you</h2>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloremque illum omnis sunt similique quae nesciunt?</p>
                    </div>
                    <div className="features mt-4">
                        <div className="feature1 d-flex align_items-center gap-5">
                            <div className="single_feature">
                                <span><i class="ri-truck-line"></i></span>
                                <h6>Free Home Delivery</h6>
                                <p>Lorem ipsum dolor sit amet.</p>
                            </div>

                            <div className="single_feature">
                                <span className='feature_icon_two'><i class="ri-money-dollar-circle-line"></i></span>
                                <h6>Return & Refund</h6>
                                <p>Lorem ipsum dolor sit amet.</p>
                            </div>
                        </div>

                        <div className="feature1 mt-3 d-flex align_items-center gap-5">
                            <div className="single_feature">
                                <span className='feature_icon-3'><i class="ri-secure-payment-line"></i></span>
                                <h6>Secure Payment</h6>
                                <p>Lorem ipsum dolor sit amet.</p>
                            </div>

                            <div className="single_feature">
                                <span className='feature_icon-4'><i class="ri-24-hours-line"></i></span>
                                <h6>24/7 Hours Support</h6>
                                <p>Lorem ipsum dolor sit amet.</p>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    </section>
  )
}

export default ChooseUs
