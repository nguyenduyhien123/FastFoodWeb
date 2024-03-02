import { useEffect, useRef, useState } from 'react';
import { IconField } from '../fields';
import './ProductSearch.scss';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import Rating from 'react-star-review';
import { Link, useNavigate } from 'react-router-dom';

export const ProductSearch = () => {
    const navigate = useNavigate();
<<<<<<< HEAD
    const [show, setShow] = useState(false);
    const [contentSearch, setContentSearch ] = useState("");
    const [results, setResults ] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const searchRef = useRef();
    const getProductsByName = (name ) => {
        axios({
            method: 'get',
            url: 'http://localhost:8000/api/getProductsByCriteria',
            withCredentials: true, 
            params: {
                name: name,
              }         
        })
        .then(res => {
            if (Array.isArray(res.data)) {
                var products = res.data;
                products.forEach(item => {
                    item.image = JSON.parse(item.image)
                });
                setResults(products);
                setShowResults(true)
                          } else {
                console.log('Kết quả trả về không phải là một mảng.');
              }

        })
        .catch(err => {
        })
    }
    const handleOutside = (e) => {
        if (!e.target.closest('.product-search') || e.target.matches('.btn-product-search')) {
          setShowResults(false);
        }
      }
    const handleSearch = (e) => {
        if(e.target.value != '')
        {
            getProductsByName(e.target.value);
        }
        else
        {
            setShowResults(false);
        }
    }
    
  useEffect(() => {
    window.addEventListener('click', handleOutside);
    return () => {
      window.removeEventListener('click', handleOutside);
    }
  }, []);

    return <div className='product-search'>
        <div className="search-field d-flex" onClick={() => {
            if(searchRef?.current.value !== '')
            {
                setShowResults(true);
            }
        }}>
    <input type={"text"} icon="search" className="h-lg gray input-product-search" name="search" placeholder='Tìm kiếm sản phẩm ...' onChange={(e) => {handleSearch(e)}} ref={searchRef}/>
    <button className='material-symbols-outlined search btn-product-search' onClick={() => {
                    setShowResults(true);
                    navigate(`/search?name=${searchRef?.current.value}`)

    }}>search</button>
    </div>
    { (Array.isArray(results) && showResults) && <div className="list-result">
        <div className="search-content">
        {results?.map((product, index) => {
            return <Link to={ `http://localhost:3000/products/${product?.id}`} className='result-item d-flex gap-4 align-item-center'>
                <img className="product-thumbnail" src={product?.image[0]?.startsWith('https') ? product?.image[0] : `http://localhost:8000/storage/uploads/${product?.image[0]}`} />
                <div className="product-content">
                    <div className="product-name">{product?.name}</div>
                    <Rating size={16} rating={product?.star}></Rating>
                    <div className="product-price mt-1">{product?.price?.toLocaleString("vi-VN")}</div>
                </div>
            </Link>
        })}
        </div>
        <Link to={ `http://localhost:3000/search?name=${searchRef?.current.value}`} className='btn btn-primary w-100' onClick={() => {
            setShowResults(false);
        }}>Xem tất cả kết quả</Link>
    </div>
}
=======
    const [count, setCount] = useState(1);
    const [contentSearch, setContentSearch] = useState("");
    const [results, setResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const searchRef = useRef();
    const getProductsByName = (name) => {
        axios({
            method: 'get',
            url: 'http://localhost:8000/api/getProductsByCriteria',
            withCredentials: true,
            params: {
                name: name,
            }
        })
            .then(res => {
                if (Array.isArray(res.data)) {
                    var products = res.data;
                    products.forEach(item => {
                        item.image = JSON.parse(item.image)
                    });
                    setResults(products);
                } else {
                    // console.log('Kết quả trả về không phải là một mảng.');
                }

            })
            .catch(err => {
            })
    }
    const handleOutside = (e) => {
        if (!e.target.closest('.product-search') || e.target.matches('.btn-product-search')) {
            setShowResults(false);
        }
    }
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            // Gọi hàm tìm kiếm ở đây
            getProductsByName(contentSearch);
        }, 300); // Đợi 300ms trước khi gọi hàm tìm kiếm
        return () => clearTimeout(delayDebounceFn);
    }, [contentSearch]);
    useEffect(() => {
        setShowResults(false)
    }, [])
    useEffect(() => {
        window.addEventListener('click', handleOutside);
        return () => {
            window.removeEventListener('click', handleOutside);
        }
    }, []);

    return <div className='product-search'>
        <div className="search-field d-flex" onClick={() => {
            if (searchRef?.current.value !== '') {
                setShowResults(true);
            }
        }}>
            <input type={"text"} icon="search" className="h-lg gray input-product-search" name="search" placeholder='Tìm kiếm sản phẩm ...' onChange={(e) => {
                setContentSearch(e.target.value)
                setShowResults(true)
             }} ref={searchRef} value={contentSearch} />
            <button className='material-symbols-outlined search btn-product-search' onClick={() => {
                setShowResults(true);
                navigate(`/search?name=${searchRef?.current.value}`)

            }}>search</button>
        </div>
        {(Array.isArray(results) && showResults == true && results?.length > 0) && <div className="list-result">
            <div className="search-content">
                {results?.map((product, index) => {
                    return <Link to={`http://localhost:3000/products/${product?.id}`} className='result-item d-flex gap-4 align-item-center'>
                        <img className="product-thumbnail" src={product?.image[0]?.startsWith('https') ? product?.image[0] : `http://localhost:8000/storage/uploads/${product?.image[0]}`} />
                        <div className="product-content">
                            <div className="product-name">{product?.name}</div>
                            <Rating size={16} rating={product?.star}></Rating>
                            <div className="product-price mt-1">{product?.price?.toLocaleString("vi-VN")}</div>
                        </div>
                    </Link>
                })}
            </div>
            <Link to={`http://localhost:3000/search?name=${searchRef?.current.value}`} className='btn btn-primary w-100' onClick={() => {
                setShowResults(false);
            }}>Xem tất cả kết quả</Link>
        </div>
        }
        {
            (Array.isArray(results) && showResults && results?.length == 0 && contentSearch != '') && <p>Không có kết quả nào để hiển thị</p>
        }
>>>>>>> master
    </div>
}