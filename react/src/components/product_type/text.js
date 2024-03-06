import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function ProductTypeEdit() {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Tên loại sản phẩm</Form.Label>
        <Form.Control type="text" value="" onChange="" placeholder="" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Hình ảnh</Form.Label>
        <Form.Control type="file" onChange="" placeholder="Password" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Sửa
      </Button>
    </Form>
  );
}
