import PropTypes from 'prop-types';
// import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function TotalCart({ productsCart }) {
  // const setLocalStorage = () => {
  //   localStorage.setItem('carrinho', JSON.stringify(productsCart));
  // };
  // useEffect(() => {
  //   setLocalStorage();
  // }, [productsCart]);
  const history = useHistory();
  return (
    <button
      className="bg-red-600 text-white p-2 rounded-lg fixed bottom-5 right-5"
      data-testid="customer_products__button-cart"
      type="button"
      disabled={ productsCart.length === 0 }
      onClick={ () => history.push('/customer/checkout') }
    >
      <span>Ver Carrinho </span>
      <span data-testid="customer_products__checkout-bottom-value">
        {`R$ ${productsCart
          .reduce((ant, att) => ant + (att.count * att.price), 0)
          .toFixed(2).toString().replace('.', ',')}`}
      </span>
    </button>
  );
}

TotalCart.propTypes = {
  productsCart: PropTypes.node.isRequired,
};

export default TotalCart;
