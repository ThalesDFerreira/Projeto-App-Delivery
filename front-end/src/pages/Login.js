/* eslint-disable max-len */
/* eslint-disable react/jsx-max-depth */
import * as React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { emailValidate, passwordValidate } from '../utils/validationLogin';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/pages/login.css';

function Login() {
  const history = useHistory();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isDisabled, setIsDisabled] = React.useState(true);
  const [isDataCorect, setIsDataCorect] = React.useState(false);

  const makeLogin = async () => {
    const ok = 200;
    const notFound = 404;
    try {
      const result = await axios.post('http://localhost:3001/user', { email, password });
      console.log(result.status);
      if (result.status === ok) {
        setIsDataCorect(false);
        delete result.id;

        localStorage.setItem('user', JSON.stringify(result.data));

        if (result.data.role === 'seller') {
          console.log(result.data.role);
          history.push('seller/orders');
        } else if (result.data.role === 'administrator') {
          history.push('admin/manage');
        } else {
          history.push('/customer/products');
        }
      }
    } catch (error) {
      if (error.response.status === notFound) {
        setIsDataCorect(true);
      }
      console.log(error.response.status);
    }
  };

  const getDataFromLS = () => {
    try {
      console.log(JSON.parse(localStorage.getItem('user')));
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        if (user.role === 'customer') {
          history.push('customer/products');
        }
        if (user.role === 'seller') {
          history.push('seller/orders');
        }
      }
    } catch (error) {
      history.push('customer/products');
    }
  };

  React.useEffect(() => {
    if (emailValidate(email) && passwordValidate(password)) return setIsDisabled(false);
    setIsDisabled(true);
  }, [email, password]);

  React.useEffect(() => {
    getDataFromLS();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    makeLogin();
  };

  return (
    <>
      <Header />
      <div className="w-full h-screen flex flex-col justify-center items-center bg-cover bg-white bg-opacity-50">
        <h1 className="text-red-600 text-6xl">Delivery Drinks</h1>
        <div className="w-96 flex bg-red-600 p-8 text-white mt-3">
          <form className="flex flex-col" onSubmit={ handleSubmit }>
            <label className="mb-2" htmlFor="email">
              Email:
              <br />
              <input
                className="p-1 w-full text-black"
                data-testid="common_login__input-email"
                type="email"
                value={ email }
                onChange={ (e) => setEmail(e.target.value) }
                id="email"
              />
            </label>
            <label className="mb-2" htmlFor="password">
              Password:
              {' '}
              <input
                className="p-1 w-full text-black"
                data-testid="common_login__input-password"
                type="password"
                value={ password }
                onChange={ (e) => setPassword(e.target.value) }
                id="password"
              />
            </label>
            <button
              className="mb-2 bg-white text-black"
              type="submit"
              data-testid="common_login__button-login"
              disabled={ isDisabled }
            >
              Login
            </button>

            <button
              className="mb-2 bg-white text-black"
              type="button"
              data-testid="common_login__button-register"
              onClick={ () => history.push('/register') }
            >
              Ainda não tenho Conta
            </button>

            {isDataCorect ? (
              <p data-testid="common_login__element-invalid-email">
                Usuário não Encontrado
              </p>) : null}
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;
