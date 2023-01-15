import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import dataTestsIds from '../utils/dataTestIds';
import Navbar from '../components/Navbar';

const ok = 200;
const EMTRANSITO = 'Em Trânsito';

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

      console.log(status, token);
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
    <div>
      <Navbar />
      <h1>Detalhes do Pedido</h1>

      {Object.keys(dataSale).length > 0 && (

        <div>
          <span>Pedido </span>
          <span data-testid={ dataTestsIds.sellerDetalPed.id }>
            {saleId}
          </span>
          <span data-testid={ dataTestsIds.sellerDetalPed.name }>
            {dataSale?.idSeller?.name}
          </span>
          <span data-testid={ dataTestsIds.sellerDetalPed.date }>
            {dataSale?.date}
          </span>
          <span data-testid={ dataTestsIds.sellerDetalPed.status }>
            {dataSale.status}
          </span>

          <button
            data-testid={ dataTestsIds.sellerDetalPed.preparando }
            type="button"
            disabled={ dataSale.status !== 'Pendente' }
            onClick={ () => {
              changeStatus('Preparando');
              setDataSale({ ...dataSale, status: 'Preparando' });
            } }
          >
            Preparando Pedido
          </button>

          <button
            data-testid={ dataTestsIds.sellerDetalPed.saiuEntrega }
            type="button"
            disabled={ ['Pendente', EMTRANSITO, 'Entregue'].includes(dataSale.status) }
            onClick={ () => {
              changeStatus(EMTRANSITO);
              setDataSale({ ...dataSale, status: EMTRANSITO });
            } }
          >
            Saiu para Entrega
          </button>

        </div>
      )}
      <table>
        <thead>
          <tr>
            <td>Item</td>
            <td>Descrição</td>
            <td>Quantidade</td>
            <td>Valor Unitário</td>
            <td>Sub-total</td>
          </tr>

        </thead>

        <tbody>
          {console.log(dataSale)}
          {Object.keys(dataSale).length > 0 && dataSale.products.map((item, i) => (
            <tr key={ item.id }>
              <td
                data-testid={ dataTestsIds.sellerDetalPed.itemId + i }
              >
                {i + 1}

              </td>

              <td
                data-testid={ dataTestsIds.sellerDetalPed.itemName + i }
              >
                {item.name}

              </td>

              <td
                data-testid={ dataTestsIds.sellerDetalPed.itemQtd + i }
              >
                {item.SaleProduct.quantity}

              </td>

              <td
                data-testid={ dataTestsIds.sellerDetalPed.itemPrice + i }
              >
                {item.price}

              </td>

              <td
                data-testid={ dataTestsIds.sellerDetalPed.itemSubTotal + i }
              >
                {item.SaleProduct.quantity * item.price}

              </td>

            </tr>

          ))}

        </tbody>
      </table>

      {Object.keys(dataSale).length > 0 && (
        <div>
          <p>
            Total
            {' '}
            <span
              data-testid={ dataTestsIds.sellerDetalPed.totalPrice }
            >
              {(dataSale.totalPrice).replace('.', ',')}
            </span>

          </p>
        </div>
      )}

    </div>
  );
}

export default DetalhesPedido;
