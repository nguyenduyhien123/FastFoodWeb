import { Link } from 'react-router-dom';
import './ProductCardSearch.scss';
import Rating from 'react-star-review';

export const ProductCardSearch = ({data}) => {
    return <div className="product-card-search card h-100">
        <img className="card-img" src={data?.image[0]?.startsWith('https') ? data?.image[0] : `http://localhost:8000/storage/uploads/${data?.image[0]}` }/>
        <div class="card-body">
            <div className="card-category">{data?.product_type?.name}</div>
            <h5 class="card-title">{data?.name}</h5>
            <div className="card-rating">
            <Rating size={16} rating={data?.star}></Rating>

            </div>
            <div className="card-price"><span className="unit">₫</span> {data?.price}</div>
            <Link to={`http://localhost:3000/products/${data?.id}`} class="stretched-link link-product"></Link>
        </div>    </div>
}