import { useEffect, useState } from 'react';
import './ProductSearchOption.scss';
import {Row, Col} from 'react-bootstrap';
import axios from 'axios';
import { ProductCardSearch } from '../product_card/ProductCardSearch';
import {useLocation} from 'react-router-dom';

export const ProductSearchOption = () => {
    const location = useLocation();

    // Lấy tham số từ query string
    const queryParams = new URLSearchParams(location.search);
    const name = queryParams.get('name');
    const [productName, setProductName] = useState(name);
    const [categories, setCategories]  = useState();
    const [searchs, setSearchs]  = useState({product_type_id : [], price : {}, name : productName});
    const [products, setProducts]  = useState([]);
    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://localhost:8000/api/product_types/',
            withCredentials: true,        
        })
        .then(res => setCategories(res.data))
        .catch(err => {
            // console.log(err)
        })

    }, []);
    const handleSearch = () => {
        axios({
            method: 'get',
            url: 'http://localhost:8000/api/getProductsByCriteria',
            withCredentials: true, 
            params: searchs        
        })
        .then(res => {
            if (Array.isArray(res.data)) {
                var products = res.data;
                products.forEach(item => {
                    item.image = JSON.parse(item.image)
                });
                setProducts(products);
                          } else {
                // ('Kết quả trả về không phải là một mảng.');
              }

        })
        .catch(err => {
        })
    }
    // console.log(searchs);
    useEffect(() => {
        handleSearch();
    }, [JSON.stringify(searchs)])
    return <div className='product-search-option'>
    <Row>
        <Col xl={3}>
            <div className="widget-search-product">
                <div className="widget-title">Theo danh mục</div>
                <div className="widget-product-categories">
                    <ul className="ps-list--categories">
                        {categories?.map((data, index) => {
                            return <>
                            <div class="form-check"><input type="checkbox" name="product_type_id" id={`category-${index}`}  class="form-check-input" onChange={(e) => {
                                let name = e.target.name;
                                let isChecked = e.target.checked;
                                if (isChecked) {
                                  setSearchs({
                                    ...searchs,
                                    [name]: [...searchs.product_type_id, data?.id],
                                  });
                                } else {
                                  setSearchs({
                                    ...searchs,
                                    [name]: searchs.product_type_id.filter((item) => item !== data?.id),
                                  });
                                }
                            
                            }}/><label title="" for={`category-${index}`}  class="form-check-label">{data?.name}</label></div>
                            </>
                        })}
                    </ul>
                </div>
            </div>
            <div className="widget-search-product">
                        <div className="widget-title">
                        Theo giá
                        </div>
                        <div className="widget-product-price d-flex gap-2 align-items-center">
                        <input class="form-control" type="number" min={1000} max={10000000} placeholder="₫ TỪ" onChange={(e) => {
                            let number = Number(e.target.value);
                            setSearchs({...searchs, price : {...searchs.price, min : number}})
                        }}/>
                        <div class="price-range-filter__range-line"></div>
                        <input class="form-control" type="number" min={1000} max={10000000} placeholder="₫ ĐẾN" onChange={(e) => {
                            let number = Number(e.target.value);
                            setSearchs({...searchs, price : {...searchs.price, max : number}})
                        }} />
                        </div>
                        <button className='btn btn-primary w-100 mt-3'>Áp dụng</button>
            </div>
        </Col>
        <Col xl={9}>
                        <div className="product-search-result row">
                           {products?.map((data, index) => <div key={index} className="col-md-3">
                           <ProductCardSearch data={data}></ProductCardSearch>
                           </div>)}
                        </div>
        </Col>
    </Row>
    </div>
}