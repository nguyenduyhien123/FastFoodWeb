import React from 'react'
import Rating from 'react-star-review'
import './product_card.scss'
const ProductCard = (props) => {

const {title, imgUrl, price} = props.item

  return (
    <section className='product_card' data-aos="flip-left" data-aos-duration="1000"  >
        <div className="single_product">
    <div className="product_img">
        <img src={imgUrl} alt="" className='w-100' />
    </div>
    <div className="product_content">
        <div className="rating d-flex justify-content-center">
           <Rating size={20} interactive rating={4.5} hoverColor='red' onRatingChanged={e => console.log(e)}></Rating>
        </div>
        <h6>{title}</h6>

        <div className='d-flex align-items-center justify-content-between'>
            <span className='price d-flex align-items-center'><span>{price.toLocaleString("vi")}</span><sup>đ</sup></span>
            <span className='shopping_icon'><i class="ri-shopping-cart-line"></i></span>
        </div>
    </div>
</div>
    </section>
  )
}

export default ProductCard
