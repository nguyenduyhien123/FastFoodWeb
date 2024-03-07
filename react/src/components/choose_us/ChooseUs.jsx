import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import pastaImg from '../../assets/images/client/pasta.png'
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
                    <h4>Chúng ta là ai?</h4>
                    <h2>Hãy xem những lợi ích chúng tôi mang lại cho bạn</h2>
                    <p>Khám phá thế giới của hương vị độc đáo và tươi mới. Chúng tôi tự hào mang đến cho bạn những món ăn nhanh ngon miệng, được chế biến từ nguyên liệu tươi ngon và được phục vụ nhanh chóng.</p>
                </div>
                    <div className="features mt-4">
                        <div className="feature1 d-flex align_items-center gap-5">
                            <div className="single_feature">
                                <span><i class="ri-truck-line"></i></span>
                                <h6>Giao hàng tận nhà miễn phí</h6>
                                <p>Chúng tôi cam kết giao hàng tận nhà miễn phí trong khu vực địa phương của bạn, đảm bảo bạn nhận được sản phẩm một cách thuận tiện và nhanh chóng.</p>
                            </div>
                            <div className="single_feature">
                                <span className='feature_icon_two'><i class="ri-money-dollar-circle-line"></i></span>
                                <h6>Hoàn lại tiền</h6>
                                <p>Chúng tôi cam kết hoàn lại tiền 100% nếu bạn không hài lòng với sản phẩm của chúng tôi trong vòng 30 ngày kể từ ngày mua hàng. Sự hài lòng của bạn là ưu tiên hàng đầu của chúng tôi.</p>
                            </div>

                        </div>

                        <div className="feature1 mt-3 d-flex align_items-center gap-5">
                            <div className="single_feature">
                                <span className='feature_icon-3'><i class="ri-secure-payment-line"></i></span>
                                <h6>Thanh toán an toàn</h6>
                                <p>Với hệ thống thanh toán an toàn của chúng tôi, bạn có thể yên tâm mua sắm trực tuyến mà không cần lo lắng về việc bị lừa đảo hoặc mất thông tin cá nhân. Chúng tôi cam kết bảo vệ thông tin của bạn một cách tuyệt đối.</p>
                            </div>
                            <div className="single_feature">
                                <span className='feature_icon-4'><i class="ri-24-hours-line"></i></span>
                                <h6>Hỗ trợ 24/7</h6>
                                <p>Với dịch vụ hỗ trợ 24/7 của chúng tôi, bạn có thể yên tâm về việc nhận được sự giúp đỡ mọi lúc, mọi nơi. Đội ngũ hỗ trợ của chúng tôi luôn sẵn lòng hỗ trợ bạn giải quyết mọi vấn đề và câu hỏi của bạn.</p>
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
