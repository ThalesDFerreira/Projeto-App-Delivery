import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import TotalCart from '../components/TotalCartProduct';

function Product() {
  const [products, setProducts] = useState([]);
  const [productsCart, setProductsCart] = useState([]);
  const [name, setName] = useState('');

  const getDatafromLocalstorage = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    // const cart = JSON.parse(localStorage.getItem('carrinho'));
    // console.log(cart);
    // setProducts(cart);

    setName(user.name);
  };

  const addAndRemoveQtd = (e, op, id) => {
    if (op === '+') {
      const newList = products.map((item) => {
        if (item.id === id) {
          item.count += 1;
        }
        return item;
      });
      setProducts(newList);
      setProductsCart(newList.filter((el) => el.count));
    }
    if (op === '-') {
      const newList = products.map((item) => {
        if (item.id === id && item.count > 0) {
          item.count -= 1;
        }
        return item;
      });
      setProducts(newList);
      setProductsCart(newList.filter((el) => el.count));
    }
    if (op === 'geral') {
      const newList = products.map((item) => {
        if (item.id === id) {
          item.count = +e.target.value;
        }
        return item;
      });
      setProducts(newList);
      setProductsCart(newList.filter((el) => el.count));
    }
  };

  const getProducts = async () => {
    const ok = 200;
    const notFound = 404;
    // console.log('awd');
    try {
      const result = await axios.get('http://localhost:3001/products/');
      // console.log(result.data[1].url_image);
      if (result.status === ok) {
        const teste = result.data.map((item) => ({ ...item, count: 0 }));
        setProducts(teste);
        // setQtd(result.data.map(() => 0));
      }
    } catch (error) {
      if (error.response.status === notFound) {
        setProducts(true);
      }
      // console.log(error.response.status);
    }
    getDatafromLocalstorage();
  };

  const setLocalStorage = () => {
    localStorage.setItem('carrinho', JSON.stringify(productsCart));
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('carrinho'));
    if (products.length === 0) {
      return null;
    }
    console.log(cart);

    setLocalStorage();
  }, [productsCart]);
  return (
    <div>
      <Navbar name={ name } />
      {/* <CardProducts products={ products } /> */}

      <TotalCart productsCart={ productsCart } />
      <div className="flex flex-wrap justify-center">
        {products.length !== 0 && (
          products.map((product) => (
            <div className="p-2 m-2 border-2 border-gray-300 w-64 h-72 flex flex-col items-center" key={ product.id }>
              <p
                className="text-2xl font-bold"
                data-testid={ `customer_products__element-card-price-${product.id}` }
              >
                {`R$ ${product.price.replaceAll('.', ',')}`}
              </p>
              <img
                className="h-[60%] text-center"
                data-testid={ `customer_products__img-card-bg-image-${product.id}` }
                src={ product.url_image }
                alt={ product.name }
              />
              <p
                data-testid={ `customer_products__element-card-title-${product.id}` }
              >
                {product.name}
              </p>
              <div className="mt-2 mb-2 bg-red-100 flex justify-center">
                <button
                  className="w-10 bg-red-600 text-white p-2 rounded-lg"
                  data-testid={ `customer_products__button-card-rm-item-${product.id}` }
                  type="button"
                  onClick={ (e) => addAndRemoveQtd(e, '-', product.id) }
                >
                  -
                </button>
                <input
                  className="w-8 text-center hover:outline-0 focus:outline-0"
                  data-testid={ `customer_products__input-card-quantity-${product.id}` }
                  type="text"
                  value={ product.count }
                  onChange={ (e) => addAndRemoveQtd(e, 'geral', product.id) }
                />
                <button
                  className="w-10 bg-red-600 text-white p-2 rounded-lg"
                  data-testid={ `customer_products__button-card-add-item-${product.id}` }
                  type="button"
                  onClick={ (e) => addAndRemoveQtd(e, '+', product.id) }

                >
                  +
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Product;
