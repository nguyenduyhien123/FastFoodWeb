import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import PageLayout from "../../layouts/PageLayout";

export default function ProductTypeEdit() {
  const [productType, setProductType] = useState({
    name: "",
    image: null,
  });
  const imageRef = useRef(null);
  const handleLoadingImage = () => {
    if (
      typeof productType.image === "string" &&
      productType.image.includes("upload")
    ) {
      imageRef.current.src = `http://localhost:8000/storage/${productType.image}`;
    } else if (typeof productType.image === "string") {
      imageRef.current.src = productType.image;
    } else {
      imageRef.current.src = URL.createObjectURL(productType.image);
    }
  };

  const navigate = useNavigate();
  const { id } = useParams(); // Get product type ID from URL parameter
  let originalProductType;
  // Fetch product type details when component mounts or ID changes
  useEffect(() => {
    if (productType.image) {
      handleLoadingImage();
    }
    axios
      .get(`http://localhost:8000/api/product_types/${id}`)
      .then((res) => {
        setProductType(res.data);
      })
      .catch((error) => console.error("Error fetching product type:", error));
  }, [id]);
  originalProductType = productType;
  console.log("originalProductType:", originalProductType);
  // Handle input changes
  const handleChange = (event) => {
    setProductType({
      ...productType,
      [event.target.name]: event.target.value,
    });
  };

  // Handle image file upload
  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    if (!imageFile) return;

    // Create a copy of the state
    const updatedProductType = { ...productType };

    // Update the image property with the selected file
    updatedProductType.image = imageFile;

    // Set the updated state
    setProductType(updatedProductType);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let data = { ...productType, _method: "PATCH" };
    let dataToSend;
    if (data.image == originalProductType.image) {
      console.log("equal");
      dataToSend = {
        id: data.id,
        name: data.name,
        _method: "PATCH",
        created_at: data.created_at,
        updated_at: data.updated_at,
        deleted_at: data.deleted_at,
      };
    } else {
      console.log("not equal");
      dataToSend = {
        id: data.id,
        name: data.name,
        image: data.image,
        created_at: data.created_at,
        deleted_at: data.deleted_at,
        updated_at: data.updated_at,
        _method: "PATCH",
      };
    }
    console.log("data being submit", data);
    console.log("data being send", dataToSend);
    axios({
      method: "post",
      url: `http://localhost:8000/api/product_types/${id}`,
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: data,
    })
      .then((res) => {
        navigate(-1);
      })
      .catch((err) => {});
  };

  return (
    <PageLayout>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Tên loại sản phẩm</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={productType.name}
            onChange={handleChange}
            placeholder="Nhập tên loại sản phẩm"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Hình ảnh</Form.Label>
          <Form.Control type="file" onChange={handleImageChange} />
          {productType.image && (
            <img
              ref={imageRef}
              onLoad={handleLoadingImage}
              alt="Current preview"
              className="img-fluid rounded m-5"
              // Add a src based on image type
              src={
                typeof productType.image === "string" &&
                productType.image.includes("upload")
                  ? `http://localhost:8000/storage/${productType.image}`
                  : (typeof productType.image === "string" &&
                      productType.image) ||
                    URL.createObjectURL(productType.image)
              }
            />
          )}
        </Form.Group>

        <Button variant="primary" type="submit">
          Cập nhật
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
