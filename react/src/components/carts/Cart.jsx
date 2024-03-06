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
          if (typeof item.product.image === "string") {
            item.product.image = JSON.parse(item.product.image);
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
                {item.product.image ? (
                  <img
                    src={item.product.image[0]?.startsWith("https")
                    ? item.product.image[0]
                    : `http://localhost:8000/storage/uploads/${item.product.image[0]}`}
                    alt="Product"
                    className="img-thumbnail"
                  />
                ) : (
                  <span>Hình ảnh không khả dụng</span>
                )}
              </td>
              <td>{item.product.name}</td>
              <td>{item.product.price}</td>
              <td className="d-flex justify-content-around align-items-center mt-4 pb-5" style={{ width: '250px', }}>
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
    </div >
  );
};

export default Cart;
