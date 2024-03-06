import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Cart.scss";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = () => {
    axios({
      method: "get",
      url: "http://localhost:8000/api/cart/",
      withCredentials: true,
    })
      .then((res) => {
        let updatedCartItems = res.data;
        updatedCartItems.forEach((item) => {
          if (typeof item.product_image === "string") {
            item.product_image = JSON.parse(item.product_image);
          }
        });
        setCartItems(updatedCartItems);
      })
      .catch((error) => console.error("Lỗi khi tải giỏ hàng:", error));
  };

  const handleDetail = (id) => {
    // Điều hướng tới trang chi tiết sản phẩm hoặc hiển thị thông tin sản phẩm trong cùng một trang
    console.log(`Xem chi tiết sản phẩm có id: ${id}`);
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8000/api/cart/${id}`, { withCredentials: true })
      .then((res) => {
        // Sau khi xóa sản phẩm thành công, cập nhật lại danh sách giỏ hàng
        fetchCartItems();
      })
      .catch((error) => console.error("Lỗi khi xóa sản phẩm:", error));
  };

  return (
    <div className="wishlist-container">
      <h1 className="wishlist-title">Giỏ hàng của bạn</h1>
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
          {cartItems.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>
                {item.product_image ? (
                  <img
                    src={
                      item.product_image[0]?.startsWith("https")
                        ? item.product_image[0]
                        : `http://localhost:8000/storage/uploads/${item.product_image[0]}`
                    }
                    alt=""
                    className="img-thumbnail "
                  />
                ) : (
                  <span>Hình ảnh không khả dụng</span>
                )}
              </td>
              <td>{item.product_name}</td>
              <td>{item.product_price}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleDetail(item.id)}
                >
                  Xem chi tiết
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleDelete(item.id)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Cart;
