/* eslint-disable max-len */
/* eslint-disable react/jsx-max-depth */
import * as React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { emailValidate, passwordValidate, nameValidate } from '../utils/validationLogin';
import Header from '../components/Header';
import '../styles/pages/register.css';

function Register() {
  const history = useHistory();

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isDisabled, setIsDisabled] = React.useState(true);
  const [isDataCorect, setIsDataCorect] = React.useState(false);

  const createUser = async () => {
    const ok = 201;
    const alreadyExists = 409;
    try {
      const result = await axios.post('http://localhost:3001/user/register', { name, email, password });
      if (result.status === ok) {
        setIsDataCorect(false);
        delete result.id;

        localStorage.setItem('user', JSON.stringify(result.data));
        history.push('/customer/products');
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === alreadyExists) {
        setIsDataCorect(true);
      }
      console.log(error.response.status);
    }
  };

  React.useEffect(() => {
    if (nameValidate(name)
      && emailValidate(email)
      && passwordValidate(password)) return setIsDisabled(false);
    setIsDisabled(true);
  }, [name, email, password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    createUser();
  };

  return (
    <>
      <Header />
      <div className="w-full h-screen flex flex-col justify-center items-center bg-cover bg-white bg-opacity-50">
        <h1 className="text-red-600 text-6xl">Cadastre-se</h1>
        <div className="w-96 flex bg-red-600 p-8 text-white mt-3">
          <form className="flex flex-col" onSubmit={ handleSubmit }>
            <label className="mb-2" htmlFor="name">
              Nome:
              <br />
              <input
                className="p-1 w-full text-black"
                data-testid="common_register__input-name"
                type="text"
                value={ name }
                onChange={ (e) => setName(e.target.value) }
                id="name"
              />
            </label>
            <label className="mb-2" htmlFor="email">
              Email:
              <input
                className="p-1 w-full text-black"
                data-testid="common_register__input-email"
                type="email"
                value={ email }
                onChange={ (e) => setEmail(e.target.value) }
                id="email"
              />
            </label>
            <label className="mb-2" htmlFor="password">
              Password:
              <input
                className="p-1 w-full text-black"
                data-testid="common_register__input-password"
                type="password"
                value={ password }
                onChange={ (e) => setPassword(e.target.value) }
                id="password"
              />
            </label>
            <button
              className="mb-2 bg-white text-black"
              type="submit"
              data-testid="common_register__button-register"
              disabled={ isDisabled }
            >
              CADASTRAR
            </button>

            {isDataCorect ? (
              <p data-testid="common_register__element-invalid_register">
                Usuário Já Existe
              </p>) : null}
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
