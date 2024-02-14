import React from 'react'
import Slider from 'react-slick'
import { Col, Container, Row } from 'reactstrap'
import testimonialsImg from '../../assets/images/client/slider1.png'
import './testimonials.scss'

const Testimonials = () => {
    const settings ={
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay:true,
        autoplaySpeed:3000
    }
  return (
    <section className='testimonials' data-aos="fade-up" data-aos-duration="1000">
        <Container>
            <Row >
                <Col lg='8' className='m-auto'>
                    <div className="silder_wrapper d-flex align-items-center g-5">
                        <div className="slider_content w-50">
                        <h2 className='mb-4'>What our customes are saying</h2>
                            <Slider {...settings}>
                                <div>
                                    <div className="single_testimonial">
                                        <p className="review_content">
                                            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus, rerum soluta error at rem deserunt eius minima, eveniet placeat inventore vero commodi molestiae sapiente quasi doloribus quidem aperiam pariatur quam."
                                        </p>
                                        <h6>Jhon Doe</h6>
                                        <p>Web Developer</p>
                                    </div>
                                </div>

                                <div>
                                    <div className="single_testimonial">
                                        <p className="review_content">
                                            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus, rerum soluta error at rem deserunt eius minima, eveniet placeat inventore vero commodi molestiae sapiente quasi doloribus quidem aperiam pariatur quam."
                                        </p>
                                        <h6>Jhon Doe</h6>
                                        <p>Web Developer</p>
                                    </div>
                                </div>

                                <div>
                                    <div className="single_testimonial">
                                        <p className="review_content">
                                            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus, rerum soluta error at rem deserunt eius minima, eveniet placeat inventore vero commodi molestiae sapiente quasi doloribus quidem aperiam pariatur quam."
                                        </p>
                                        <h6>Jhon Doe</h6>
                                        <p>Web Developer</p>
                                    </div>
                                </div>
                            </Slider>
                        </div>
                        <div className="slider_img w-50">
                        <img src= {testimonialsImg} alt="" className='w-100' />
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    </section>
  )
}

export default Testimonials
