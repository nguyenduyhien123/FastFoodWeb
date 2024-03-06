import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Cart.scss";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchCartItems();
    console.log(cartItems);

  }, []);

  const fetchCartItems = () => {
    axios({
      method: "get",
      url: `http://localhost:8000/api/carts`,
      withCredentials: true,
    })
      .then((res) => {
        let updatedCartItems = res.data.map(item => {
          // Chuyển đổi dữ liệu hình ảnh nếu cần thiết
          if (typeof item.image === "string") {
            item.image = JSON.parse(item.image);
          }
          return item;
        });
        setCartItems(updatedCartItems);
      })
      .catch((error) => console.error("Lỗi khi tải giỏ hàng:", error));
  };

  const handleDetail = (id) => {
    console.log(`Xem chi tiết sản phẩm có id: ${id}`);
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8000/api/carts/${id}`, { withCredentials: true })
      .then((res) => {
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
                {item.image ? (
                  <img
                    src={item.image[0] && item.image[0].startsWith("https") ? item.image[0] : `http://localhost:8000/storage/uploads/${item.image[0]}`}
                    alt="Product"
                    className="img-thumbnail"
                  />
                ) : (
                  <span>Hình ảnh không khả dụng</span>
                )}
              </td>
              <td>{item.name}</td>
              <td>{item.price}</td>
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
