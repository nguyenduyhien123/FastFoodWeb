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
                        <h2 className='mb-4'>Những gì khách hàng của chúng tôi nói</h2>
                            <Slider {...settings}>
                                <div>
                                    <div className="single_testimonial">
                                        <p className="review_content">
                                            "Tôi rất hài lòng với chất lượng của sản phẩm. Đặc biệt là dịch vụ giao hàng nhanh chóng và đúng hẹn."
                                        </p>
                                        <h6>Jhon Doe</h6>
                                        <p>Khách hàng</p>
                                    </div>
                                </div>

                                <div>
                                    <div className="single_testimonial">
                                        <p className="review_content">
                                            "Dịch vụ của họ rất chuyên nghiệp và thân thiện. Tôi sẽ tiếp tục ủng hộ họ trong tương lai."
                                        </p>
                                        <h6>Jane Smith</h6>
                                        <p>Khách hàng</p>
                                    </div>
                                </div>

                                <div>
                                    <div className="single_testimonial">
                                        <p className="review_content">
                                            "Ở đây có nhiều món ăn ngon và đa dạng. Tôi đã thử nhiều món và đều rất hài lòng."
                                        </p>
                                        <h6>Alex Johnson</h6>
                                        <p>Khách hàng</p>
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
