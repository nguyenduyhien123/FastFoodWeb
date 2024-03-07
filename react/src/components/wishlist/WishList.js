import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./WishList.scss";

export const WishList = () => {
  const [wishList, setWishList] = useState([]);
  const navigate = useNavigate();

  const handleProductDetailClick = (id) => {
    navigate(`/products/${id}`);
  };

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:8000/api/wishlists/",
      withCredentials: true,
    })
      .then((res) => {
        let updatedWishList = res.data;
        updatedWishList.forEach((item) => {
          if (typeof item.product_image === "string") {
            item.product_image = JSON.parse(item.product_image);
          }
        });
        setWishList(updatedWishList);
      })
      .catch((error) =>
        console.error("Lỗi khi tải danh sách yêu thích:", error)
      );
  }, []);
  

  return (
    <div className="wishlist-container">
      <h1 className="wishlist-title">Danh sách sản phẩm đã yêu thích</h1>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th>STT</th>
            <th>Hình Ảnh</th>
            <th>Tên sản phẩm</th>
            <th>Giá</th>
            <th>Chức Năng</th>
          </tr>
        </thead>
        <tbody>
          {wishList.map((wishlist, index) => (
            <tr key={wishlist.id}>
              <td>{index + 1}</td>
              <td>
                {wishlist.product_image ? (
                  <img
                    src={
                      wishlist.product_image[0]?.startsWith("https")
                        ? wishlist.product_image[0]
                        : `http://localhost:8000/storage/uploads/${wishlist.product_image[0]}`
                    }
                    alt=""
                    className="img-thumbnail "
                  />
                ) : (
                  <span>Hình ảnh không khả dụng</span>
                )}
              </td>
              <td>{wishlist.product_name}</td>
              <td>{wishlist.product_price}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleProductDetailClick(wishlist.product_id)}
                >
                  Xem chi tiết
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
