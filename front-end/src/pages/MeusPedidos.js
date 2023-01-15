/* eslint-disable max-len */
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import dataTestsIds from '../utils/dataTestIds';
import Navbar from '../components/Navbar';

const ok = 200;

function DetalhesPedido() {
  const history = useHistory();
  // const [name, setName] = useState([]);
  const [dataSale, setDataSale] = useState({});
  const getDataSale = async () => {
    const { token } = JSON.parse(localStorage.getItem('user'));
    try {
      const result = await axios.get(
        'http://localhost:3001/sales/byuser',
        {
          headers: {
            authorization: token,
          },
        },
      );
      // result
      if (result.status === ok) {
        // console.log(result.data);

        const aux = result.data.map((item) => {
          const dia = new Date(item.saleDate).getDate().toString();
          const diaF = (dia.length === 1) ? `0${dia}` : dia;
          const mes = (new Date(item.saleDate).getMonth() + 1).toString();
          const mesF = (mes.length === 1) ? `0${mes}` : mes;
          const anoF = new Date(item.saleDate).getFullYear();
          const auxDate = item;
          auxDate.date = `${diaF}/${mesF}/${anoF}`;
          return auxDate;
        });

        // console.log(aux);

        setDataSale(aux);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataSale();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mx-auto">
        <h1 className="text-lg mt-5">Pedidos</h1>
        <div className="flex">
          {dataSale.length > 0 && dataSale.map((item, i) => (
            <button
              className="m-2 w-full flex justify-between items-center bg-gray-100 p-2 w-96"
              key={ item.id }
              type="button"
              onClick={ () => history.push(`/customer/orders/${item.id}`) }
            >
              <span
                className="bg-white p-2 rounded"
                data-testid={ dataTestsIds.meusPedidos.id + item.id }
              >
                Pedido:
                <br />
                0
                {i + 1}
              </span>
              <span
                className="bg-red-100 p-2 rounded font-bold"
                data-testid={ dataTestsIds.meusPedidos.status + item.id }
              >
                {item.status}
              </span>
              <div>
                <p
                  className="bg-white p-2 rounded font-bold mb-2  "
                  data-testid={ dataTestsIds.meusPedidos.date + item.id }
                >
                  {item.date}
                </p>
                <p
                  className="bg-white p-2 rounded font-bold"
                  data-testid={ dataTestsIds.meusPedidos.price + item.id }
                >
                  R$
                  {' '}
                  {item.totalPrice.replace('.', ',')}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export default DetalhesPedido;
