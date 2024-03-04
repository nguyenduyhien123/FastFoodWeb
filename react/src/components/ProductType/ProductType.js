import Table from "react-bootstrap/Table";
import axios from "axios";
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//import from productList
import React from "react";
import { Row, Col } from "react-bootstrap";
import { CardLayout, FloatCard } from "../../components/cards";
import ProductsTable from "../../components/tables/ProductsTable";
import LabelField from "../../components/fields/LabelField";
import { Pagination, Breadcrumb } from "../../components";
import Anchor from "../../components/elements/Anchor";
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/master/productList.json";

export default function ProductType() {
  const [productTypes, setProductTypes] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/product_types`)
      .then((res) => {
        let product_types = res.data;
        setProductTypes(product_types);
      })
      .catch(() => {
        console.log("Gọi API lỗi");
      });
  }, []);
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/product_types/${id}`);

      // Refresh the list after successful deletion
      axios
        .get(`http://localhost:8000/api/product_types`)
        .then((res) => {
          let product_types = res.data;
          setProductTypes(product_types);
        })
        .catch(() => {
          console.log("Gọi API lỗi");
        });
    } catch (error) {
      console.error("Error deleting product type:", error);
    }
  };
  return (
    <PageLayout>
      <Col xl={12}>
        <CardLayout>
          <h1>Product types</h1>
        </CardLayout>
      </Col>
      <div style={{ marginTop: "10px", marginBottom: "10px" }}>
        <Button onClick={() => navigate("/admin/producttype/add")}>Thêm</Button>
      </div>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Tên loại sản phẩm</th>
            <th>Hình ảnh</th>
            <th>Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {productTypes?.map((types, index) => (
            <tr style={{ height: `${110}px` }}>
              <td>{index + 1}</td>
              <td>{types.name}</td>
              <td>
                <div>
                  <img
                    src={
                      types.image.includes("upload")
                        ? `http://localhost:8000/storage/${types.image}`
                        : types.image
                    }
                    alt="type"
                    className="img-fluid rounded"
                    style={{ maxWidth: "100px" }}
                  />
                </div>
              </td>
              <td>
                <Button
                  onClick={() => navigate(`/admin/producttype/${types.id}`)}
                  style={{ marginRight: "5px" }}
                >
                  Sửa
                </Button>
                <Button onClick={() => handleDelete(types.id)}>Xóa</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </PageLayout>
  );
}
