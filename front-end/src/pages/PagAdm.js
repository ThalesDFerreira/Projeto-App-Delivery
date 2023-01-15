import { useState, useEffect } from 'react';
import axios from 'axios';
import dataTestsIds from '../utils/dataTestIds';

import { emailValidate, passwordValidate, nameValidate } from '../utils/validationLogin';

const ok = 200;
function DetalhesPedido() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const [isDisabled, setIsDisabled] = useState(false);

  const [isInvalidUser, setIsInvalidUser] = useState(true);

  const [dataUsers, setDataUsers] = useState({});

  const getUsers = async () => {
    try {
      const result = await axios.get('http://localhost:3001/user/');
      // result
      if (result.status === ok) {
        setDataUsers(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const validateButton = () => {
    let aux = true;
    if (emailValidate(email)
      && passwordValidate(password)
      && nameValidate(name)
      && role) {
      aux = false;
    }
    console.log(aux);
    setIsDisabled(aux);
    return aux;
  };

  const createUser = async () => {
    try {
      const { token } = JSON.parse(localStorage.getItem('user'));

      await axios.post(
        'http://localhost:3001/user/registerByAdm',
        { name, email, password, role },
        {
          headers: {
            authorization: token,
          },
        },
      );
      getUsers();
      setIsInvalidUser(true);
    } catch (error) {
      setIsInvalidUser(false);
      console.log(error);
    }
  };

  const deleteUser = async (id) => {
    try {
      const { token } = JSON.parse(localStorage.getItem('user'));
      console.log(id);
      await axios.delete(
        `http://localhost:3001/user/removeByAdm/${id}`,
        {
          headers: {
            authorization: token,
          },
        },
      );
      getUsers();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    validateButton();
  }, [name, email, password, role]);

  return (
    <div>
      <nav>
        <span data-testid={ dataTestsIds.admPag.navLinkOrder }>Gerenciar Usuários</span>
        <span data-testid={ dataTestsIds.admPag.navUser }>
          {JSON.parse(localStorage.getItem('user')).name}
        </span>
        <button
          data-testid={ dataTestsIds.admPag.navLogout }
          type="button"
          onClick={ () => localstorage.clear() }
        >
          Sair
        </button>

      </nav>
      <h1>Cadastrar Novo usuário</h1>

      {!isInvalidUser && (
        <p data-testid={ dataTestsIds.admPag.invalidRegister }>Usuário Já Existe</p>
      )}

      <div>
        <label htmlFor="nameNav">
          Nome
          <input
            data-testid={ dataTestsIds.admPag.name }
            id="nameNav"
            type="text"
            value={ name }
            onChange={ (e) => setName(e.target.value) }
          />
        </label>
        <label htmlFor="emailNav">
          Email
          <input
            data-testid={ dataTestsIds.admPag.email }
            id="emailNav"
            type="email"
            value={ email }
            onChange={ (e) => setEmail(e.target.value) }
          />
        </label>

        <label htmlFor="passwordNav">
          Senha
          <input
            data-testid={ dataTestsIds.admPag.password }
            id="passwordNav"
            type="password"
            value={ password }
            onChange={ (e) => setPassword(e.target.value) }
          />
        </label>

        <label htmlFor="tipo">
          Tipo
          <select
            data-testid={ dataTestsIds.admPag.role }
            id="tipo"
            onChange={ (e) => setRole(e.target.value) }
          >
            <option value="customer">Cliente</option>
            <option value="seller">Vendedor</option>

          </select>
        </label>

        <button
          data-testid={ dataTestsIds.admPag.register }
          type="button"
          disabled={ isDisabled }
          onClick={ () => createUser() }
        >
          Cadastrar
        </button>

      </div>

      <h3>Lista de usuários</h3>
      <table>
        <thead>
          <tr>
            <td>Item</td>
            <td>Nome</td>
            <td>E-mail</td>
            <td>Tipo</td>
            <td>Excluir</td>
          </tr>

        </thead>

        <tbody>
          {dataUsers.length > 0 && dataUsers.map((item, i) => (
            <tr key={ item.id }>
              <td
                data-testid={ dataTestsIds.admPag.numberUser + i }
              >
                {i + 1}

              </td>

              <td
                data-testid={ dataTestsIds.admPag.nameUser + i }
              >
                {item.name}

              </td>

              <td
                data-testid={ dataTestsIds.admPag.emailUser + i }
              >
                {item.email}

              </td>

              <td
                data-testid={ dataTestsIds.admPag.roleUser + i }
              >
                {item.role}

              </td>

              <td>
                <button
                  data-testid={ dataTestsIds.admPag.removeUser + i }
                  type="button"
                  onClick={ () => deleteUser(item.id) }
                >
                  Excluir
                </button>

              </td>

            </tr>

          ))}

        </tbody>
      </table>

    </div>
  );
}

export default DetalhesPedido;
