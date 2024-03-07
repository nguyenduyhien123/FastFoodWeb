


import React from 'react'
import { Col, Container, ListGroup, ListGroupItem, Row } from 'reactstrap'
import 'remixicon/fonts/remixicon.css'
import './footer.scss'

const footerQuickLinks = [
  {
    display: 'Điều khoản và điều kiện',
    url: '#'
  },

  {
    display: 'Chính sách bảo mật',
    url: '#'
  },

  {
    display: 'Hoàn lại tiền',
    url: '#'
  },

  {
    display: 'Phương thức thanh toán',
    url: '#'
  }
]

const footerLinks = [
  {
    display: 'Mô tả',
    url: '#'
  },

  {
    display: 'Sản Phẩm',
    url: '#'
  },

  {
    display: 'Công thức nấu ăn',
    url: '#'
  },

  {
    display: 'Liên hệ',
    url: '#'
  }
]

const Footer = () => {
  return (
    <footer className='footer_web' id='footer_web'>

      <div className="footer_top">
        <Container>
          <Row>
            <Col lg='4' mb='4' sm='6'>
              <div className="logo">
                <h2 className='d-flex align-items-center gap-1 mb-4'>
                  <span><i class="ri-restaurant-2-line"></i></span> Chef Food
                </h2>
                <p>Bạn đói, muốn có đồ ăn ngon, giá cả hợp lý, phải chăng, tiện lợi, vừa ý? Hãy gọi chúng tôi!</p>
              </div>
            </Col>

            <Col lg='3' md='4' sm='6'>
              <h5 className="footer_link-title">
              Liên kết thông tin
              </h5>

              <ListGroup>
                {
                  footerQuickLinks.map((item, index) => <ListGroupItem key={index} className='link_item'>
                    <a href={item.url}>{item.display}</a>
                  </ListGroupItem>)
                }
              </ListGroup>
            </Col>



            <Col lg='2' md='4' sm='6'>
              <h5 className="footer_link-title">
              Đường dẫn nhanh
              </h5>

              <ListGroup>
                {
                  footerLinks.map((item, index) => <ListGroupItem key={index} className='link_item'>
                    <a href={item.url}>{item.display}</a>
                  </ListGroupItem>)
                }
              </ListGroup>
            </Col>

            <Col lg='3' md='4' sm='6'>
              <h5 className="footer_link-title">
              Liên hệ
              </h5>
              <ListGroup>
                <ListGroupItem className='link_item d-flex align-items-center gap-3'>
                  <i className="ri-map-pin-line"></i> Tp.HCM, Việt Nam
                </ListGroupItem>

                <ListGroupItem className='link_item d-flex align-items-center gap-3'>
                  <i className="ri-mail-line"></i> example@gmail.com
                </ListGroupItem>

                <ListGroupItem className='link_item d-flex align-items-center gap-3'>
                  <i className="ri-phone-line"></i> +880 123 456 789
                </ListGroupItem>
              </ListGroup>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="footer_bottom">
        <Container>
          <Row>
            <Col lg='12'>
              <p>copyright 2023. developed by muhib. All rights reserved</p>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  )
}

export default Footer
