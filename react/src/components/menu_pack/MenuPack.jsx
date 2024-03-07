import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import ProductCard from "../product_card/ProductCard";
import "./menu_pack.scss";

const MenuPack = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [categoryActive, setCategoryActive] = useState(1);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/product_types")
      .then((res) => setCategories(res.data))
      .catch((err) => console.log("Lỗi khi gọi API", err));
  }, []);

  useEffect(() => {
    axios
      .get(
        `http://localhost:8000/api/products/getProductsByProductTypeId/${categoryActive}`
      )
      .then((res) => {
        var products = res.data;
        products.forEach((item) => {
          item.image = JSON.parse(item.image);
          item.image = item.image[0];
        });

        // Tính số trang dựa trên số sản phẩm
        const totalProducts = products.length;
        const totalPages = Math.ceil(totalProducts / 8);
        setTotalPages(totalPages);

        // Chỉ lấy 8 sản phẩm cho trang hiện tại
        const startIndex = (currentPage - 1) * 8;
        const endIndex = Math.min(startIndex + 8, totalProducts);
        const slicedProducts = products.slice(startIndex, endIndex);
        setProducts(slicedProducts);
      })
      .catch((err) => console.log("Lỗi khi gọi API", err));
  }, [categoryActive, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <section className="menu_pack" id="menu_pack">
      <Container>
        <Row>
          <Col lg="12" className="text-center mb-4">
            <h2 className="menu_tile">Sản Phẩm Của Chúng Tôi</h2>
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
                  className={`category-item ${data.id === categoryActive ? "active_btn" : ""
                    } filter-btn d-flex align-items-center gap-2 fs-3`}
                >
                  <div className="icon">
                    <img src={data?.image} alt={data.name} />
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
              url={`/products/${item.id}`}
            >
              <ProductCard
                item={item}
                onClick={() => navigate(`/products/${item.id}`)}
              />
            </Col>
          ))}
        </Row>
        {/* Phân trang */}
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <button
                key={page}
                className={`pagination-item ${page === currentPage ? "active" : ""
                  }`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            )
          )}
        </div>
      </Container>
    </section>
  );
};

export default MenuPack;
