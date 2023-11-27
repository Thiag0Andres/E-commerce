/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import './styles.scss';
import { Modal, Form, Button, Row, Spinner } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import SelectSearch from 'react-select-search';
import api from '../../services/api';
import { login } from '../../store/ducks/auth/actions';
import { updateUser } from '../../store/ducks/user/action';
import { environment } from '../../environment/environment';

interface Props {
  show: boolean;
  onHide(): any;
}

interface User {
  userType: string;
  name: string;
  email: string;
  password: string;
  cpf_cnpj: string;
  phone: string;
  addressState: string;
  addressCity: string;
  zipcode: string;
}

const LoginModal: React.FC<Props> = (props: Props) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [newUser, setNewUser] = useState<User>({
    userType: '',
    name: '',
    email: '',
    password: '',
    cpf_cnpj: '',
    phone: '',
    addressState: '',
    addressCity: '',
    zipcode: '',
  });
  const [optionsUserType] = useState([
    {
      name: 'Vendedor',
      value: 'seller',
    },
    {
      name: 'Cliente',
      value: 'customer',
    },
  ]);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    if (isRegister) {
      console.log(newUser);
      api
        .post('/users/register', { ...newUser })
        .then(response => {
          setLoading(false);
          toast.success('Conta criada com sucesso, agora entre em sua conta.');
          setIsRegister(false);
        })
        .catch(error => {
          setLoading(false);
          toast.error(`${error.response.data.message}`);
        });
    } else if (email !== '' && password !== '') {
      api
        .post('/users/authenticate', { email, password })
        .then(response => {
          setLoading(false);
          dispatch(login());
          dispatch(updateUser(response.data.user));
          localStorage.setItem(
            environment.REACT_APP_LOCAL_STORAGE_USER_AUTH,
            response.data.token,
          );
          localStorage.setItem(
            environment.REACT_APP_LOCAL_STORAGE_USER_ID,
            response.data.user.id,
          );
          props.onHide();
        })
        .catch(error => {
          setLoading(false);
          toast.error(`${error.response.data.message}`);
        });
    }
  };

  return (
    <Modal {...props} centered className="modal-access">
      <Modal.Header closeButton>
        <h4> Acesse sua conta </h4>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(event: React.FormEvent) => onSubmit(event)}>
          {isRegister ? (
            <>
              <Form.Control
                className="form-input"
                placeholder="Nome"
                type="name"
                value={newUser.name}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setNewUser({ ...newUser, name: event.target.value })
                }
              />
              <Form.Control
                className="form-input"
                placeholder="E-mail"
                type="text"
                name="email"
                value={newUser.email}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setNewUser({ ...newUser, email: event.target.value })
                }
              />
              <Form.Control
                className="form-input"
                placeholder="Senha"
                type="password"
                name="password"
                value={newUser.password}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setNewUser({ ...newUser, password: event.target.value })
                }
              />
              <Form.Control
                className="form-input"
                placeholder="CPF ou CNPJ"
                type="text"
                name="cpf"
                value={newUser.cpf_cnpj}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setNewUser({ ...newUser, cpf_cnpj: event.target.value })
                }
              />
              <Form.Control
                className="form-input"
                placeholder="Telefone"
                type="text"
                name="phone"
                value={newUser.phone}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setNewUser({ ...newUser, phone: event.target.value })
                }
              />
              <Form.Control
                className="form-input"
                placeholder="Estado"
                type="text"
                name="state"
                value={newUser.addressState}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setNewUser({ ...newUser, addressState: event.target.value })
                }
              />
              <Form.Control
                className="form-input"
                placeholder="Cidade"
                type="text"
                name="city"
                value={newUser.addressCity}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setNewUser({ ...newUser, addressCity: event.target.value })
                }
              />
              <Form.Control
                className="form-input"
                placeholder="CEP"
                type="text"
                name="cep"
                value={newUser.zipcode}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setNewUser({ ...newUser, zipcode: event.target.value })
                }
              />
              <SelectSearch
                value={newUser.userType}
                placeholder="Selecione o tipo de usuário"
                search
                options={optionsUserType}
                onChange={event => {
                  setNewUser({ ...newUser, userType: String(event) });
                }}
              />
            </>
          ) : (
            <>
              <Form.Control
                className="form-input"
                placeholder="E-mail"
                type="email"
                value={email}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(event.target.value)
                }
              />
              <Form.Control
                className="form-input"
                placeholder="Senha"
                type="password"
                name="password"
                value={password}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(event.target.value)
                }
              />
            </>
          )}
          <Row
            noGutters
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: 40,
            }}
          >
            <Button
              className="secundary-button"
              onClick={() => setIsRegister(!isRegister)}
            >
              {!isRegister ? 'Registrar' : 'Login'}
            </Button>
            <Button className="primary-button" type="submit">
              {loading ? (
                <Spinner
                  as="span"
                  animation="border"
                  role="status"
                  aria-hidden="true"
                />
              ) : (
                <>{!isRegister ? 'Entrar' : 'Registrar-se'}</>
              )}
            </Button>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
