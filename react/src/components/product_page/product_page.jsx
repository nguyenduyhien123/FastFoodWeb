import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import React from "react";
import Rating from "react-star-review";
import "./product_page.scss";
import { Button } from "react-bootstrap";
export default function ProductPage() {
<<<<<<< HEAD
  const { id } = useParams();
  const [product, setProduct] = useState();

=======
<<<<<<< HEAD
    const [data] = useState([
        {
          userId: '01a',
          comId: '012',
          fullName: 'Riya Negi',
          avatarUrl: 'https://ui-avatars.com/api/name=Riya&background=random',
          userProfile: 'https://www.linkedin.com/in/riya-negi-8879631a9/',
          text: 'Hey, Loved your blog! ',
          replies: [
        {
          userId: '02b',
          comId: '017',
          fullName: 'Lily',
          userProfile: 'https://www.linkedin.com/in/riya-negi-8879631a9/',
          text: 'I have a doubt about the 4th point🤔',
          avatarUrl: 'https://ui-avatars.com/api/name=Lily&background=random',
          replies: []
        }
      ]}])
    const { id } = useParams();
    const [product, setProduct] = useState();
    const [tabActive, setTabActive] = useState();
    const tabs = [
        'Bình luận',
        'Đánh giá'
    ];
    const [selectedImage, setSelectedImage] = useState(
        "https://burgerking.vn/media/catalog/product/cache/1/small_image/316x/9df78eab33525d08d6e5fb8d27136e95/7/-/7-burger-b_-n_ng-whopper-jr_1.jpg"
    );
    const images = [
        "https://burgerking.vn/media/catalog/product/cache/1/small_image/316x/9df78eab33525d08d6e5fb8d27136e95/7/-/7-burger-b_-n_ng-whopper-jr_1.jpg",
        "https://burgerking.vn//media//catalog//product//cache//1//small_image//316x//9df78eab33525d08d6e5fb8d27136e95//6//-//6-burger-ca.jpg",
        "https://burgerking.vn/media/catalog/product/cache/1/small_image/316x/9df78eab33525d08d6e5fb8d27136e95/1/2/12-burger-b_-n_ng-h_nh-chi_n_4.jpg",
    ];
    const [quantity, setQuantity] = useState(1);
    useEffect(() => {
        axios.get(`http://localhost:8000/api/products/${id}`)
        .then(res => {
            var product = res.data;
            product.image = JSON.parse(product.image)
            setProduct(product)
        })
        .catch(err => {
            console.log('Không tìm thấy sản phẩm');
        })
        ;
    }, []);
    return (
        <div>
            <div className="Product-Page card h-100 col-sm-12 mb-3 d-flex flex-row py-4 mt-4">
                <div className="Image-List">
                    {product?.image && Object.keys(product?.image).map((image, index) => (
                        <img
                            key={index}
                            src={product?.image[image]}
                            className="img-fluid rounded m-1"
                            style={{ opacity: selectedImage === image ? 1 : 0.5 }}
                            alt="product-image"
                            onClick={() => setSelectedImage(product?.image[image])}
                        />
                    ))}
                </div>
                <div className="Active-Image">
                    {selectedImage && (
                        <img src={selectedImage} alt="" className="img-fluid rounded" />
                    )}
                </div>
                <div className="Description">
                    <div className="first-row d-flex flex-column">
                        {/* product-name */}
                        <h2 className="product-name">{product?.name}</h2>
                        {/* rating */}
                        <p>{product?.description}</p>
                        <div className="mt-3">
                        <Rating
                            size={20}
                            interactive
                            rating={product?.star}
                            hoverColor="yellow"
                            onRatingChanged={(e) => console.log(e)}
                        ></Rating>
                        </div>
                        {/* price */}
                        <p className="price mt-3">
                            <h3 className="fs-2">{product?.price}</h3>
                        </p>
                    </div>
                    {/* quantity-change */}
                    <div className="d-flex gap-4 align-items-center">
                    <div class="qty-input mt-3">
                        <button
                            class="qty-count qty-count--minus"
                            data-action="minus"
                            type="button"
                            onClick={() =>
                                quantity < 2 ? setQuantity(1) : setQuantity(quantity - 1)
                            }
                        >
                            -
                        </button>
                        <input
                            class="product-qty"
                            type="number"
                            name="product-qty"
                            min="0"
                            max="100"
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                        />
                        <button
                            class="qty-count qty-count--add"
                            data-action="add"
                            type="button"
                            onClick={() => setQuantity(quantity + 1)}
                        >
                            +
                        </button>
                    </div>
                    {/* add-to-cart-button */}
                    <div className="add-to-cart-button mt-4">
                        <Button className="button-of-productpage">
                            Thêm vào giỏ hàng{" "}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="bi bi-cart"
                                viewBox="0 0 16 16"
                            >
                                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                            </svg>
                        </Button>
                    </div>
                    </div>
                </div>
            </div>
            <div className="list-tab">
                {
                    tabs.map((data, index) => <div className={`tab-button ${tabActive === index ? 'active' : ''}` } onClick={() => setTabActive(index)}>{data}</div>)
                }
                {/* <div className="content-box">
                    <p>Mục này chỉ để nhận xét và đánh giá, Vui lòng dùng mục bình luận để thảo luận, hỏi đáp</p>
                    <div className="rating-box">
                        <img class="rounded-circle shadow-1-strong me-3 user-image" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" />
                        <div>
                            <Rating size={20} interactive rating={0} hoverColor="yellow" onRatingChanged={(e) => console.log(e)}></Rating>
                            <textarea class="form-control" id="" rows="4"
                                style={{ background: '#fff' }} placeholder="Viết đánh giá"></textarea>
                        </div>
                        <div className="rating-box-button">
                            <button class="btn btn-primary btn-sm post-rating">Đăng đánh giá</button>
                            <button class="btn btn-outline-primary btn-sm cancel-rating">Hủy</button>
                        </div>
                    </div>
                </div> */}

            </div>
=======
  const { id } = useParams();
  const [product, setProduct] = useState();

>>>>>>> a942427a129553aa59df26f3b973a5f030bc73ad
  const [selectedImage, setSelectedImage] = useState();
  const productStar = product?.star;
  const [quantity, setQuantity] = useState(1);

  const [comment, setComment] = useState(false);
  const [rating, setRating] = useState(true);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/products/${id}`)
      .then((res) => {
        let product = res.data;
        product.image = JSON.parse(product.image);
        setSelectedImage(product.image[0]);
        setProduct(product);
      })
      .catch(() => {
        console.log("Gọi API lỗi");
      });
  }, []);
  return (
    <div>
      <div className="Product-Page card h-100 col-sm-12 mb-3 d-flex flex-row py-4">
        <div className="Image-List">
          {product?.image &&
            Object.keys(product?.image).map((image, index) => (
              <img
                key={index}
                src={product.image[image]}
                className="img-fluid rounded m-1"
                style={{
                  opacity: selectedImage === product.image[image] ? 1 : 0.5,
                }}
                alt="product"
                onClick={() => setSelectedImage(product.image[image])}
              />
            ))}
<<<<<<< HEAD
=======
>>>>>>> master
>>>>>>> a942427a129553aa59df26f3b973a5f030bc73ad
        </div>
        <div className="Active-Image">
          {selectedImage && (
            <img src={selectedImage} alt="" className="img-fluid rounded" />
          )}
        </div>
        <div className="Description">
          <div className="first-row d-flex flex-column">
            {/* product-name */}
            <h2 className="product-name">{product?.name}</h2>
            {/* rating */}
            <Rating
              size={20}
              interactive
              rating={productStar}
              hoverColor="yellow"
              onRatingChanged={(e) => console.log(e)}
            ></Rating>
            {/* price */}
            <p className="price">
              <h3>{product?.price}đ</h3>
            </p>
          </div>
          {/* quantity-change */}
          <div class="qty-input">
            <button
              class="qty-count qty-count--minus"
              data-action="minus"
              type="button"
              onClick={() =>
                quantity < 2 ? setQuantity(1) : setQuantity(quantity - 1)
              }
            >
              -
            </button>
            <input
              class="product-qty"
              type="number"
              name="product-qty"
              min="0"
              max="10"
              value={quantity}
            />
            <button
              class="qty-count qty-count--add"
              data-action="add"
              type="button"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </button>
          </div>
          {/* add-to-cart-button */}
          <div className="add-to-cart-button mt-4">
            <Button className="button-of-productpage">
              Thêm vào giỏ hàng{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-cart"
                viewBox="0 0 16 16"
              >
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
      <div className="CommentRating">
        {/* button */}
        <div className="button">
          <div>
            <button
              className="rating-button"
              style={{ borderTop: rating === true ? "5px solid #f5b70a" : "" }}
              onClick={() => {
                setComment(false);
                setRating(true);
              }}
            >
              Đánh giá sản phẩm
            </button>
          </div>
          <div>
            <button
              className="comment-button"
              style={{ borderTop: comment === true ? "5px solid #f5b70a" : "" }}
              onClick={() => {
                setComment(true);
                setRating(false);
              }}
            >
              bình luận
            </button>
          </div>
        </div>

        {/* content-box */}
        <div className="content-box">
          {rating && (
            <div>
              <p>
                Mục này chỉ để nhận xét và đánh giá, Vui lòng dùng mục bình luận
                để thảo luận, hỏi đáp
              </p>
              <div className="rating-box">
                <img
                  class="rounded-circle shadow-1-strong me-3 user-image"
                  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                  alt="user"
                />
                <div>
                  <Rating
                    size={20}
                    interactive
                    rating={0}
                    hoverColor="yellow"
                    onRatingChanged={(e) => console.log(e)}
                  ></Rating>
                  <textarea
                    class="form-control"
                    id=""
                    rows="4"
                    style={{ background: "#fff" }}
                    placeholder="Viết đánh giá"
                  ></textarea>
                </div>
                <div className="rating-box-button">
                  <button class="btn btn-outline-warning btn-sm post-rating">
                    Đăng đánh giá
                  </button>
                  <button class="btn btn-outline-warning btn-sm cancel-rating">
                    Hủy
                  </button>
                </div>
              </div>
            </div>
          )}
          {comment && (
            <div>
              <p>
                Mục này chỉ để thảo luận, hỏi đáp, Vui lòng dùng mục đánh giá để
                nhận xét và đánh giá
              </p>
              <div className="rating-box">
                <img
                  class="rounded-circle shadow-1-strong me-3 user-image"
                  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                  alt="user"
                />
                <div>
                  <Rating
                    size={20}
                    interactive
                    rating={0}
                    hoverColor="yellow"
                    onRatingChanged={(e) => console.log(e)}
                  ></Rating>
                  <textarea
                    class="form-control"
                    id=""
                    rows="4"
                    style={{ background: "#fff" }}
                    placeholder="Viết bình luận"
                  ></textarea>
                </div>
                <div className="rating-box-button">
                  <button class="btn btn-outline-warning btn-sm post-rating">
                    Đăng bình luận
                  </button>
                  <button class="btn btn-outline-warning btn-sm cancel-rating">
                    Hủy
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
