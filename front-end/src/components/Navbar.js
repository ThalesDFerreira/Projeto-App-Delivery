import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Navbar() {
  const history = useHistory();
  const [name, setName] = useState('');
  const [roleUser, setRoleUser] = useState('customer');
  const makeLogout = () => {
    localStorage.clear();
    history.push('/login');
  };

  const getDatafromLS = () => {
    const { name: n } = JSON.parse(localStorage.getItem('user'));
    setName(n);
  };

  const getRoleUser = () => {
    const { role } = JSON.parse(localStorage.getItem('user'));
    // console.log(pathname.split('/').includes('seller'));
    if (role === 'seller') {
      return setRoleUser('seller');
    }
    if (role === 'administrator') {
      return setRoleUser('administrator');
    }
    setRoleUser('customer');
  };

  useEffect(() => {
    getDatafromLS();
    getRoleUser();
  }, []);
  return (
    <nav className="bg-red-600 text-white flex justify-between">
      <div>
        <button
          className="p-4 bg-red-500 text-black font-bold"
          type="button"
          href="/products"
          data-testid="customer_products__element-navbar-link-products"
          onClick={ () => history.push(`/${roleUser}/products`) }

        >
          Produtos
        </button>
        <button
          className="bg-red-600 p-4 font-bold"
          type="button"
          href="/orders"
          data-testid="customer_products__element-navbar-link-orders"
          onClick={ () => history.push(`/${roleUser}/orders`) }

        >
          Meus Pedidos
        </button>
      </div>
      <div>
        <button
          className="bg-yellow-400 p-4 text-black font-bold"
          type="button"
          href="/userFullName"
          data-testid="customer_products__element-navbar-user-full-name"
        >
          {name}
        </button>
        <button
          className="bg-green-500 p-4 font-bold"
          type="button"
          onClick={ makeLogout }
          href="/logout"
          data-testid="customer_products__element-navbar-link-logout"
        >
          Sair
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
