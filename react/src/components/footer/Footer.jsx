


import React from 'react'
import { Col, Container, ListGroup, ListGroupItem, Row } from 'reactstrap'
import 'remixicon/fonts/remixicon.css'
import './footer.scss'

const footerQuickLinks =[
  {
    display : 'Terms & Conditions',
    url:'#'
  },

  {
    display : 'Privacy Policy',
    url:'#'
  },

  {
    display : 'Return & Refund',
    url:'#'
  },

  {
    display : 'Payment Method',
    url:'#'
  }
]

const footerLinks =[
  {
    display : 'About Us',
    url:'#'
  },

  {
    display : 'Menu',
    url:'#'
  },

  {
    display : 'Recipes',
    url:'#'
  },

  {
    display : 'Contact',
    url:'#'
  }
]

const Footer = () => {
  return (
   <footer className='footer_web'>

      <div className="footer_top">
        <Container>
          <Row>
            <Col lg='4' mb='4' sm='6'>
              <div className="logo">
                <h2 className='d-flex align-items-center gap-1 mb-4'>
                  <span><i class="ri-restaurant-2-line"></i></span> Chef Food
                </h2>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque, accusantium magnam. Consequuntur cupiditate alias culpa?</p>
              </div>
            </Col>

            <Col lg='3' md='4' sm='6'>
              <h5 className="footer_link-title">
                Info Links
              </h5>

              <ListGroup>
                {
                  footerQuickLinks.map((item,index)=><ListGroupItem key={index} className='link_item'>
                  <a href={item.url}>{item.display}</a>
                </ListGroupItem>)
                }
              </ListGroup>
            </Col>



            <Col lg='2' md='4' sm='6'>
              <h5 className="footer_link-title">
                Quick Links
              </h5>

              <ListGroup>
                {
                  footerLinks.map((item,index)=><ListGroupItem key={index} className='link_item'>
                  <a href={item.url}>{item.display}</a>
                </ListGroupItem>)
                }
              </ListGroup>
            </Col>

            <Col lg='3' md='4' sm='6'>
            <h5 className="footer_link-title">
                Contact
              </h5>
              <ListGroup>
                <ListGroupItem className='link_item d-flex align-items-center gap-3'>
                <i className="ri-map-pin-line"></i> Sylhet, Bangladesh 
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
