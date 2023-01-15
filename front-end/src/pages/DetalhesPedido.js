/* eslint-disable max-len */
/* eslint-disable react/jsx-max-depth */
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import dataTestsIds from '../utils/dataTestIds';
import Navbar from '../components/Navbar';

const ok = 200;

function DetalhesPedido() {
  const params = useLocation();
  const [saleId, setSaleId] = useState(0);
  // const [name, setName] = useState([]);
  const [dataSale, setDataSale] = useState({});
  const changeStatus = async (status) => {
    try {
      const { token } = JSON.parse(localStorage.getItem('user'));
      const sale = params.pathname.split('/').pop();
      setSaleId(params.pathname.split('/').pop());

      await axios.patch(
        `http://localhost:3001/sales/${sale}`,
        { status },
        {
          headers: {
            authorization: token,
          },
        },
      );
    } catch (error) {
      console.log(error);
    }
  };
  const getDataSale = async () => {
    try {
      const sale = params.pathname.split('/').pop();
      setSaleId(params.pathname.split('/').pop());

      const result = await axios.get(`http://localhost:3001/sales/bysaleId/${sale}`);
      // result
      if (result.status === ok) {
        console.log(result.data.saleDate);
        const dia = new Date(result.data.saleDate).getDate().toString();
        const diaF = (dia.length === 1) ? `0${dia}` : dia;
        const mes = (new Date(result.data.saleDate).getMonth() + 1).toString();
        const mesF = (mes.length === 1) ? `0${mes}` : mes;
        const anoF = new Date(result.data.saleDate).getFullYear();

        setDataSale({ ...result.data, date: `${diaF}/${mesF}/${anoF}` });
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
        <h1 className="mt-5 text-lg">Detalhes do Pedido</h1>

        {Object.keys(dataSale).length > 0 && (

          <div className="flex justify-between text-lg bg-gray-100 mb-5">
            <div className="font-bold p-2">
              <span>Pedido </span>
              <span data-testid={ dataTestsIds.detalhesPedido.id }>
                {saleId}
              </span>
            </div>
            <span className="p-2" data-testid={ dataTestsIds.detalhesPedido.name }>
              {dataSale?.idSeller?.name}
            </span>
            <span className="font-bold p-2" data-testid={ dataTestsIds.detalhesPedido.date }>
              {dataSale?.date}
            </span>
            <span className="font-bold p-2 bg-red-100 rounded" data-testid={ dataTestsIds.detalhesPedido.status }>
              {dataSale.status}
            </span>

            <button
              className="font-bold p-2 bg-red-300 rounded"
              data-testid={ dataTestsIds.detalhesPedido.check }
              type="button"
              disabled={ dataSale.status !== 'Em Trânsito' }
              onClick={ () => {
                changeStatus('Entregue');
                setDataSale({ ...dataSale, status: 'Entregue' });
              } }
            >
              Marcar como Entregue
            </button>

          </div>
        )}
        <div>
          <table className="w-full">
            <thead>
              <tr className="border-4 border-white text-sm">
                <td>Item</td>
                <td>Descrição</td>
                <td>Quantidade</td>
                <td>Valor Unitário</td>
                <td>Sub-total</td>
              </tr>

            </thead>

            <tbody>
              {Object.keys(dataSale).length > 0 && dataSale.products.map((item, i) => (
                <tr className="border-4 border-white" key={ item.id }>
                  <td
                    className="bg-red-600 text-white text-center p-2"
                    data-testid={ dataTestsIds.detalhesPedido.itemId + i }
                  >
                    {i + 1}

                  </td>

                  <td
                    className="bg-red-100 pl-2"
                    data-testid={ dataTestsIds.detalhesPedido.itemName + i }
                  >
                    {item.name}

                  </td>

                  <td
                    className="bg-red-800 text-white text-center"
                    data-testid={ dataTestsIds.detalhesPedido.itemQtd + i }
                  >
                    {item.SaleProduct.quantity}

                  </td>

                  <td
                    className="bg-yellow-400 text-center"
                    data-testid={ dataTestsIds.detalhesPedido.itemPrice + i }
                  >
                    {item.price}

                  </td>

                  <td
                    className="bg-red-400 text-center"
                    data-testid={ dataTestsIds.detalhesPedido.itemSubTotal + i }
                  >
                    {item.SaleProduct.quantity * item.price}

                  </td>

                </tr>

              ))}

            </tbody>
          </table>
        </div>

        {Object.keys(dataSale).length > 0 && (
          <div className="ml-[75%] p-3 bg-red-600 text-white font-bold text-4xl text-center">
            <p>
              Total: R$
              {' '}
              <span
                data-testid={ dataTestsIds.detalhesPedido.totalPrice }
              >
                {(dataSale.totalPrice).replace('.', ',')}
              </span>

            </p>
          </div>
        )}

      </div>
    </>
  );
}

export default DetalhesPedido;
