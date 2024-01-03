
import React from 'react'
import './download.scss'

import appImg from '../../assets/images/app.png'

import { Col, Container, Row } from 'reactstrap'

const Download = () => {
  return (
    <section className='download'>
        <Container className="app_container">

          <Row>
            <Col lg='6' md='6'>
              <div className="app_img">
                <img src={appImg} alt="" />
              </div>
            </Col>
            <Col lg='6' md='6'>
              <div className="app_content ">
                <h5>Download our app</h5>
                <h2 className='mb-4'>Never ipsum Hungry! Download our Mobile App Order Delicious Food</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, possimus et! Deleniti, omnis vero quo mollitia eius suscipit exercitationem dolores.</p>
                
                <div className="app_btns d-flex align-items-center gap-5 mt-4">
                  <button className="btn_apple d-flex align-items-center gap-3">
                  <i class="ri-apple-line"></i> <a href="#">Apple Store</a>
                  </button>

                  <button className="btn_google d-flex align-items-center gap-3">
                  <i class="ri-google-play-line"></i>{" "} <a href="#">Google Play</a>
                  </button>
                </div>
              </div>


            </Col>
          </Row>

        </Container>
    </section>
  )
}

export default Download
