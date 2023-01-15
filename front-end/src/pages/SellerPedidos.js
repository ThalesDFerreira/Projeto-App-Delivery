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
        'http://localhost:3001/sales/byseller',
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
    <div>
      <Navbar />
      <h1>Pedidos</h1>

      <div>
        {console.log(dataSale)}
        {dataSale.length > 0 && dataSale.map((item, i) => (
          <button
            key={ item.id }
            type="button"
            onClick={ () => history.push(`/seller/orders/${item.id}`) }
          >
            <span
              data-testid={ dataTestsIds.sellerPedidos.id + item.id }
            >
              {i + 1}

            </span>

            <span
              data-testid={ dataTestsIds.sellerPedidos.status + item.id }
            >
              {item.status}

            </span>

            <div>
              <p
                data-testid={ dataTestsIds.sellerPedidos.date + item.id }
              >
                {item.date}

              </p>

              <p
                data-testid={ dataTestsIds.sellerPedidos.price + item.id }
              >
                {item.totalPrice.replace('.', ',')}

              </p>

            </div>

          </button>

        ))}

      </div>

    </div>
  );
}

export default DetalhesPedido;
