import React, { useEffect, useState } from 'react';
import './styles.scss';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Row, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { ApplicationState } from '../../store';
import api from '../../services/api';
import { environment } from '../../environment/environment';
import { logout } from '../../store/ducks/auth/actions';

interface Product {
  id?: number;
  sellerId: number;
  description: string;
  name: string;
  price: number;
  availableQuant: number;
}

interface Account {
  bankAccountAgency: string;
  bankAccountNumber: string;
  bankAccountType: string;
  bankName: string;
}

const ShowInfoUser: React.FC = () => {
  const userLogin = useSelector((state: ApplicationState) => state.user.user);
  const dispatch = useDispatch();
  const token = localStorage.getItem(
    environment.REACT_APP_LOCAL_STORAGE_USER_AUTH,
  );
  const [newProduct, setNewProduct] = useState<Product>({
    sellerId: 0,
    description: '',
    name: '',
    price: 0,
    availableQuant: 0,
  });
  const [account, setAccount] = useState<Account>({
    bankAccountAgency: '',
    bankAccountNumber: '',
    bankAccountType: '',
    bankName: '',
  });

  useEffect(() => {
    if (!userLogin) {
      window.location.pathname = '/Home';
    }
  }, [userLogin]);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const body = {
      ...newProduct,
      sellerId: userLogin.id,
    };
    api
      .post('/products', body, { headers: { Authorization: token } })
      .then(response => {
        toast.success('Produto cadastrado');
        setNewProduct({
          ...newProduct,
          sellerId: 0,
          description: '',
          name: '',
          price: 0,
          availableQuant: 0,
        });
      })
      .catch(error => {
        toast.error(`${error.response.data.message}`);
      });
  };

  const onSubmitAccount = (event: React.FormEvent) => {
    event.preventDefault();
    api
      .post('/bankAccount', account, { headers: { Authorization: token } })
      .then(response => {
        toast.success('Conta de banco cadastrada com sucesso!');
        window.location.pathname = '/profile';
      })
      .catch(error => {
        console.log(error.response.data.message);
      });
  };

  const logoutAccount = () => {
    dispatch(logout());
    localStorage.removeItem(environment.REACT_APP_LOCAL_STORAGE_USER_AUTH);
    localStorage.removeItem(environment.REACT_APP_LOCAL_STORAGE_USER_ID);
    window.location.pathname = '/home';
  };

  return (
    <div className="container-profile">
      <div className="container-form">
        <h4> Dados de Perfil </h4>
        <Row>
          <Col>
            <Form.Label>Nome</Form.Label>
            <Form.Text> {userLogin.name} </Form.Text>
          </Col>
          <Col>
            <Form.Label>Email</Form.Label>
            <Form.Text> {userLogin.email} </Form.Text>
          </Col>
          <Col>
            <Form.Label>Telefone</Form.Label>
            <Form.Text> {userLogin.phone} </Form.Text>
          </Col>
          <Col>
            <Form.Label>Estado</Form.Label>
            <Form.Text> {userLogin.addressState} </Form.Text>
          </Col>
          <Col>
            <Form.Label>Cidade</Form.Label>
            <Form.Text> {userLogin.addressCity} </Form.Text>
          </Col>
        </Row>
        <Row noGutters className="mb-2" onClick={logoutAccount}>
          <Button className="secundary-button">Sair da conta</Button>
        </Row>
        {userLogin.userType === 'seller' && !userLogin.accountId && (
          <Row>
            <Col>
              <h4> Cadastrar Conta Bancária </h4>
              <Form
                onSubmit={(event: React.FormEvent) => onSubmitAccount(event)}
              >
                <Form.Label>Agência</Form.Label>
                <Form.Control
                  value={account.bankAccountAgency}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setAccount({
                      ...account,
                      bankAccountAgency: event.target.value,
                    })
                  }
                />
                <Form.Label>Número da conta</Form.Label>
                <Form.Control
                  value={account.bankAccountNumber}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setAccount({
                      ...account,
                      bankAccountNumber: event.target.value,
                    })
                  }
                />
                <Form.Label>Tipo</Form.Label>
                <Form.Control
                  value={account.bankAccountType}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setAccount({
                      ...account,
                      bankAccountType: event.target.value,
                    })
                  }
                />
                <Form.Label>Nome do banco</Form.Label>
                <Form.Control
                  value={account.bankName}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setAccount({
                      ...account,
                      bankName: event.target.value,
                    })
                  }
                />
                <Button className="primary-button mt-4" type="submit">
                  Cadastrar Conta
                </Button>
              </Form>
            </Col>
          </Row>
        )}
        {userLogin.userType === 'seller' && (
          <Row>
            <Col>
              <h4> Cadastrar produtos </h4>
              <Form onSubmit={(event: React.FormEvent) => onSubmit(event)}>
                <Form.Label>Nome do produto</Form.Label>
                <Form.Control
                  value={newProduct.name}
                  type="text"
                  name="name"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setNewProduct({ ...newProduct, name: event.target.value });
                  }}
                />
                <Form.Label>Descrição</Form.Label>
                <Form.Control
                  value={newProduct.description}
                  type="text"
                  name="description"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setNewProduct({
                      ...newProduct,
                      description: event.target.value,
                    });
                  }}
                />
                <Form.Label>Preço</Form.Label>
                <Form.Control
                  value={newProduct.price}
                  type="number"
                  name="price"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setNewProduct({
                      ...newProduct,
                      price: Number(event.target.value),
                    });
                  }}
                />
                <Form.Label>Quantidade no estoque</Form.Label>
                <Form.Control
                  value={newProduct.availableQuant}
                  type="number"
                  name="quant"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setNewProduct({
                      ...newProduct,
                      availableQuant: Number(event.target.value),
                    });
                  }}
                />
                <Button className="primary-button mt-4" type="submit">
                  Cadastrar
                </Button>
              </Form>
            </Col>
          </Row>
        )}
      </div>
    </div>
  );
};

export default ShowInfoUser;
