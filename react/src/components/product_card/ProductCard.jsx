import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import Rating from "react-star-review";
import { toast } from "react-toastify";
import { Button } from "../elements";
import "./product_card.scss";

const ProductCard = (props) => {
  const { id, name, image, price, star } = props.item;
  const navigate = useNavigate();

  const handleProductDetailClick = () => {
    navigate(`/products/${id}`);
  };

  const handleAddToFavorite = (productID) => {
    let data = { product_id: productID };
    axios({
      method: "post",
      url: `http://localhost:8000/api/wishlists`,
      withCredentials: true,
      data: data,
    })
      .then((res) => {
        toast.success(
          res?.data?.message || "Đã thêm sản phẩm vào danh sách yêu thích"
        );
      })
      .catch((err) => {
        toast.error(err.response.data.errors);
      });
  };

  const handleAddToCart = () => {

    let data = { product_id: id, quantity: 1 }; // Change productID to id
    axios({
      method: "post",
      url: `http://localhost:8000/api/carts`,
      withCredentials: true,
      data: data,
    })
      .then((res) => {
        toast.success(
          res?.data?.message || "Đã thêm sản phẩm vào giỏ hàng"
        );
      })
      .catch((err) => {
        toast.error(err.response.data.errors);
      });
  };

  return (
    <section
      className="product_card h-100 card"
      data-aos="flip-left"
      data-aos-duration="1000"
    >
      <div
        className="product_img text-center"
        onClick={handleProductDetailClick}
      >
        <img
          src={
            image?.startsWith("https")
              ? image
              : `http://localhost:8000/storage/uploads/${image}`
          }
          alt=""
          className="w-75 "
        />
      </div>
      <div className="product_content">
        <div className="rating d-flex justify-content-center">
          <Rating
            size={20}
            rating={star}
            hoverColor="red"
            onRatingChanged={(e) => console.log(e)}
          ></Rating>
        </div>
        <div className="d-flex justify-content-between gap-2 align-items-center mb-4">
          <h6 className="product-name" onClick={handleProductDetailClick}>
            {name}
          </h6>
          <Button
            className={"material-icons favorite"}
            onClick={() => handleAddToFavorite(id)}
          >
            favorite
          </Button>
        </div>
        <div className="d-flex align-items-center justify-content-between">
          <span className="price d-flex align-items-center">
            <span>{price.toLocaleString("vi")}.000 Vnd</span>
          </span>
          <span className="shopping_icon" onClick={handleAddToCart}>
            <i className="ri-shopping-cart-line"></i>
          </span>
        </div>
      </div>
    </section>
  );
};

export default ProductCard;
