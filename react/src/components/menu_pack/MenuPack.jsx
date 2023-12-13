import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { coffeeProducts, dessertProducts, fastFoodProducts, pizzaProducts, riceMenuProducts } from '../../assets/fake-data/products';
import ProductCard from '../product_card/ProductCard';
import './menu_pack.scss';

const MenuPack = () => {
  const [menuState, setMenuState] = useState({
    filter: 'RICE-MENU',
    products: riceMenuProducts,
  });

  useEffect(() => {
    const { filter } = menuState;

    switch (filter) {
      case 'RICE-MENU':
        setMenuState({ ...menuState, products: riceMenuProducts });
        break;

      case 'FAST-FOOD':
        setMenuState({ ...menuState, products: fastFoodProducts });
        break;

      case 'PIZZA':
        setMenuState({ ...menuState, products: pizzaProducts });
        break;

      case 'DESSERT':
        setMenuState({ ...menuState, products: dessertProducts });
        break;

      case 'COFFEE':
        setMenuState({ ...menuState, products: coffeeProducts });
        break;

      default:
        break;
    }
  },[menuState.filter]);

  const handleFilterClick = (menuType) => {
    setMenuState({ ...menuState, filter: menuType });
  };

  return (
    <section className='menu_pack'>
      <Container>
        <Row>
          <Col lg='12' className='text-center mb-4'>
            <h3 className='menu_tile'>Our Menu Pack</h3>
          </Col>
          <Col lg='12' className='text-center mb-5'>
            <button
              className={`filter-btn ${menuState.filter === 'FAST-FOOD' ? 'active_btn' : ''}`}
              onClick={() => handleFilterClick('FAST-FOOD')}>Fast Food
            </button>
            <button
              className={`filter-btn ${menuState.filter === 'RICE-MENU' ? 'active_btn' : ''}`}
              onClick={() => handleFilterClick('RICE-MENU')}>Rice Menu
            </button>
            <button
              className={`filter-btn ${menuState.filter === 'PIZZA' ? 'active_btn' : ''}`}
              onClick={() => handleFilterClick('PIZZA')}>Pizza
            </button>
            <button
              className={`filter-btn ${menuState.filter === 'DESSERT' ? 'active_btn' : ''}`}
              onClick={() => handleFilterClick('DESSERT')}>Desserts
            </button>
            <button
              className={`filter-btn ${menuState.filter === 'COFFEE' ? 'active_btn' : ''}`}
              onClick={() => handleFilterClick('COFFEE')}>Coffee
            </button>
          </Col>
          {menuState.products.map((item) => (
            <Col lg='3' key={item.id} className='mb-4'>
              <ProductCard item={item} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default MenuPack;
