import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import PageLayout from "../../layouts/PageLayout";

export default function ProductTypeAdd() {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/product_types",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        console.log("Product type added successfully:", response.data);
        navigate("/admin/producttype"); // Redirect to the ProductType component
      } else {
        console.error("Failed to add product type:", response.data);
      }
    } catch (error) {
      console.error("Error occurred while adding product type:", error.message);
    }
  };

  return (
    <PageLayout>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Tên loại sản phẩm</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder=""
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Hình ảnh</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            placeholder="Password"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Thêm loại sản phẩm
        </Button>
        <Button
          variant="primary"
          onClick={() => navigate(-1)}
          style={{ marginLeft: "5px" }}
        >
          Quay lại
        </Button>
      </Form>
    </PageLayout>
  );
}
