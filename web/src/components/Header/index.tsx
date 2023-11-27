import React, { useState, useEffect } from 'react';
import './styles.scss';
import { Navbar, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { LoginModal } from '..';
import { ApplicationState } from '../../store';
import { environment } from '../../environment/environment';
import api from '../../services/api';
import { updateUser } from '../../store/ducks/user/action';

import { ReactComponent as Logo } from '../../images/logo/ePayLogo.svg';
import { ReactComponent as Cart } from '../../images/cart.svg';

const Header: React.FC = () => {
  const [openModalAccess, setOpenModalAccess] = useState<boolean>(false);
  const [cart, setCart] = useState([]);
  const dispatch = useDispatch();
  const userLogin = useSelector((state: ApplicationState) => state.user.user);
  const token = localStorage.getItem(
    environment.REACT_APP_LOCAL_STORAGE_USER_AUTH,
  );
  const id = localStorage.getItem(environment.REACT_APP_LOCAL_STORAGE_USER_ID);
  const history = useHistory();

  useEffect(() => {
    if (id && token) {
      api
        .get(`users/${id}`, { headers: { Authorization: token } })
        .then(response => {
          dispatch(updateUser(response.data));
          console.log(response.data);
          if (response.data.userType === 'customer') {
            const bodyOrders = {
              costumerId: response.data.id,
              paymentType: 'creditcard',
              orderValue: 0,
              shippingValue: 0,
              totalValue: 0,
            };
            console.log(bodyOrders);
            api
              .post(
                '/orders',
                { ...bodyOrders },
                {
                  headers: { Authorization: token },
                },
              )
              .then(res => console.log(res.data))
              .catch(error => console.log(error.response.data.message));
          }
        })
        .catch(error => {
          toast.error(`${error.response.data.message}`);
        });
      api
        .get(`/orders/item/listCard?orderId=${id}`, {
          headers: { Authorization: token },
        })
        .then(response => {
          setCart(response.data.products);
        })
        .catch(error => {
          // toast.error(`${error.response.data.message}`);
        });
    }
  }, [token, id]);

  return (
    <>
      <Navbar expand="lg">
        <button
          type="button"
          className="empty-button"
          onClick={() => history.push('home')}
        >
          <Logo />
        </button>
        <Row>
          {userLogin.name === '' ? (
            <button
              type="button"
              className="empty-button access"
              onClick={() => setOpenModalAccess(true)}
            >
              Login / Registrar
            </button>
          ) : (
            <button
              type="button"
              className="empty-button access"
              onClick={() => history.push('profile')}
            >
              {userLogin.name}
            </button>
          )}
          <div className="container-cart">
            <div className="container-count-cart">
              <div className="count-cart"> {cart.length} </div>
            </div>
            <button type="button" className="empty-button">
              <Cart />
            </button>
          </div>
        </Row>
      </Navbar>
      <LoginModal
        show={openModalAccess}
        onHide={() => setOpenModalAccess(false)}
      />
    </>
  );
};

export default Header;
