import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import {
  coffeeProducts,
  dessertProducts,
  fastFoodProducts,
  pizzaProducts,
  riceMenuProducts,
} from "../../assets/fake-data/products";
import ProductCard from "../product_card/ProductCard";
import "./menu_pack.scss";
import axios from "axios";
import { ReactComponent as IconPizza } from "../../assets/icon/pizza.svg";
import { ReactComponent as IconBurger } from "../../assets/icon/burger.svg";
import { ReactComponent as IconPack } from "../../assets/icon/pack.svg";
import { useNavigate } from "react-router-dom";
const MenuPack = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [categoryActive, setCategoryActive] = useState(1);
  const [products, setProducts] = useState([]);

  // console.log(categories);
  useEffect(() => {
    axios.get('http://localhost:8000/api/product_types')
    .then(res => setCategories(res.data))
    .catch(err => {
      // console.log('Lỗi khi gọi API', err)
    })
  },[]);
  useEffect(() => {
    axios.get(`http://localhost:8000/api/products/getProductsByProductTypeId/${categoryActive}`)
    .then(res => {
      var products = res.data;
      products.forEach(item => {
          item.image = JSON.parse(item.image)
          item.image = item.image[0]
      });
      setProducts(res.data)
    })
    .catch(err => console.log('Lỗi khi gọi API', err))
  },[categoryActive]);

  return (
    <section className="menu_pack" id="menu_pack">
      <Container>
        <Row>
          <Col lg="12" className="text-center mb-4">
            <h3 className="menu_tile">Our Menu Pack</h3>
          </Col>
          <Col
            lg="12"
            className="text-center mb-5 d-flex justify-content-center "
          >
            {categories?.map((data, index) => {
              return (
                <div
                  key={index}
                  onClick={() => setCategoryActive(data.id)}
                  className={`category-item ${
                    data.id === categoryActive ? "active_btn" : ""
                  } filter-btn d-flex align-items-center gap-2 fs-3`}
                >
                  <div className="icon">
                    <img src={data?.image} />
                  </div>
                  <div className="product-name fw-bold">{data?.name}</div>
                </div>
              );
            })}
          </Col>
          {products?.map((item) => (
            <Col
              lg="3"
              key={item.id}
              className="mb-4"
              url={`/product/${item.id}`}
            >
              <ProductCard
                item={item}
                onClick={() => navigate(`/product/${item.id}`)}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default MenuPack;
