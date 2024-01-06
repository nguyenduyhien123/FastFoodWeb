import React from 'react';
import Slider from 'react-slick';
import { Container } from 'reactstrap';

import { sliderData } from '../../assets/fake-data/slider';

import './slider.scss';

const HeroSilder = () => {
  const setrings ={
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    autoplaySpeed:3000
  };
  return (
    <section className='slider_web'>
      <Container>
        <Slider {...setrings}>
        {
          sliderData.map(item=>(
            <div key={item.id}>
              <div className="slider_wrapper d-flex align-items-center justify-content-between pt-5">
                <div className="slider_content w-50 ps-2">
                  <h2 className='mb-3'>{item.title}</h2>
                  <p>{item.desc}</p>
                  <button className="btn">Explore Food</button>
                </div>
                <div className="slider_img w-50">
                  <img src={item.imgUrl} alt="" className='w-100'/>
                </div>
              </div>
            </div>
          ))
        }
        </Slider>
      </Container>
    </section>
    
  )
}

export default HeroSilder
