/* eslint-disable max-len */
/* eslint-disable max-lines */
/* eslint-disable react/jsx-max-depth */
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

const ok = 200;

function Checkout() {
  const history = useHistory();
  const [cart, setCart] = useState([]);
  // const [name, setName] = useState([]);
  const [seller, setSeller] = useState([]);
  const [sellerId, setSellerId] = useState(0);

  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryNumber, setDeliveryNumber] = useState('');

  const findSeller = async () => {
    try {
      const result = await axios.get('http://localhost:3001/user/seller');
      console.log(result);
      if (result.status === ok) {
        setSeller(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const finishChecout = async () => {
    // const ok = 200;
    // const notFound = 404;
    try {
      const { token } = JSON.parse(localStorage.getItem('user'));
      console.log(token);
      const totalPrice = cart
        .reduce((ant, att) => ant + (att.count * att.price), 0)
        .toFixed(2);

      const result = await axios.post(
        'http://localhost:3001/sales/',
        { sellerId, totalPrice, deliveryAddress, deliveryNumber, products: cart },
        {
          headers: {
            authorization: token,
          },
        },
      );
      console.log(result);
      // if (cart) {
      //   if () {}
      //   history.push('customer/orders/<id>');
      // }
      history.push(`/customer/orders/${result.data.id}`);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  const removeItem = (id) => {
    const aux = [...cart];
    aux.map((el) => {
      const a = el;
      if (el.id === id && el.count !== 0) {
        // a.count -= 1;
        delete a.count;
      }

      return a;
    });
    const auxorder = aux.filter((el) => el.count);
    setCart(auxorder);
    localStorage.setItem('carrinho', JSON.stringify(auxorder));
  };

  const getDataFromDb = () => {
    const lsCart = JSON.parse(localStorage.getItem('carrinho'));
    // const lsUser = JSON.parse(localStorage.getItem('user'));

    // setName(lsUser.name);
    setCart(lsCart);
  };

  useEffect(() => {
    findSeller();
    getDataFromDb();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mx-auto">
        <p className="text-white">{ sellerId }</p>
        <h1 className="text-lg">Finalizar Pedido</h1>
        <div className="border-2 p-3">
          <table className="w-full">
            <thead>
              <tr className="border-4 border-white text-sm">
                <td>Item</td>
                <td>Descrição</td>
                <td>Quantidade</td>
                <td>Valor Unitário</td>
                <td>Sub-total</td>
                <td>Remover Item</td>
              </tr>
            </thead>

            <tbody>
              {cart.length > 0 && cart.map((item, i) => (
                <tr className="border-4 border-white" key={ item.id }>
                  <td
                    className="bg-red-600 text-white text-center p-2"
                    data-testid={
                      `customer_checkout__element-order-table-item-number-${i}`
                    }
                  >
                    {i + 1}

                  </td>

                  <td
                    className="bg-red-100 pl-2"
                    data-testid={ `customer_checkout__element-order-table-name-${i}` }
                  >
                    {item.name}

                  </td>

                  <td
                    className="bg-red-800 text-white text-center"
                    data-testid={
                      `customer_checkout__element-order-table-quantity-${i}`
                    }
                  >
                    {item.count}

                  </td>

                  <td
                    className="bg-yellow-400 text-center"
                    data-testid={
                      `customer_checkout__element-order-table-unit-price-${i}`
                    }
                  >
                    {item.price.replace('.', ',')}

                  </td>

                  <td
                    className="bg-red-400 text-center"
                    data-testid={
                      `customer_checkout__element-order-table-sub-total-${i}`
                    }
                  >
                    {(item.price * item.count).toFixed(2).toString().replace('.', ',')}

                  </td>

                  <td className="bg-green-500 text-center text-white">
                    <button
                      data-testid={
                        `customer_checkout__element-order-table-remove-${i}`
                      }
                      type="button"
                      onClick={ () => removeItem(item.id) }
                    >
                      Remover

                    </button>

                  </td>

                </tr>
              ))}
            </tbody>
          </table>
          <div className="ml-[75%] p-3 bg-red-600 text-white font-bold text-4xl text-center">
            <p>
              Total: R$
              {' '}
              <span
                data-testid="customer_checkout__element-order-total-price"
              >
                {`${cart
                  .reduce((ant, att) => ant + (att.count * att.price), 0)
                  .toFixed(2).toString().replace('.', ',')}`}
              </span>

            </p>
          </div>
        </div>
        <div>
          <h3 className="text-lg mt-3">Detalhes e Endereço para Entrega</h3>
          <div className="border-2 p-3 flex justify-between">
            <label htmlFor="vendedor">
              P. Vendedora Responsável
              <br />
              <select
                className="border-2 rounded p-2 bg-white"
                id="vendedor"
                data-testid="customer_checkout__select-seller"
                onChange={ (e) => setSellerId(e.target.value) }
              >
                <option hidden>Selecione</option>
                {
                  seller ? (seller.map((el) => (
                    <option key={ el.id } value={ el.id }>{el.name}</option>
                  ))
                  )
                    : null
                }
              </select>
            </label>
            <label htmlFor="address">
              Endereço
              <br />
              <input
                className="border-2 rounded p-2 bg-white"
                data-testid="customer_checkout__input-address"
                id="address"
                type="text"
                value={ deliveryAddress }
                onChange={ (e) => setDeliveryAddress(e.target.value) }
              />
            </label>
            <label htmlFor="number">
              Número
              <br />
              <input
                className="border-2 rounded p-2 bg-white"
                data-testid="customer_checkout__input-address-number"
                id="number"
                type="text"
                value={ deliveryNumber }
                onChange={ (e) => setDeliveryNumber(e.target.value) }
              />
            </label>
            <button
              className="bg-green-600 text-white p-2 font-bold rounded"
              data-testid="customer_checkout__button-submit-order"
              type="button"
              onClick={ finishChecout }
            >
              FINALIZAR PEDIDO
            </button>

          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
