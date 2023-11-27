import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import api from '../../services/api';
import { ApplicationState } from '../../store';
import { environment } from '../../environment/environment';

interface Props {
  show: boolean;
  onHide(): any;
  productId: number;
}

const AddCartModal: React.FC<Props> = (props: Props) => {
  const [quantity, setQuantity] = useState(1);
  const userLogin = useSelector((state: ApplicationState) => state.user.user);
  const token = localStorage.getItem(
    environment.REACT_APP_LOCAL_STORAGE_USER_AUTH,
  );

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const body = {
      orderId: userLogin.id,
      productId: props.productId,
      quantity,
    };
    api
      .post('/orders/item/createItem', body, {
        headers: { Authorization: token },
      })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error.response.data.message);
      });
  };

  return (
    <Modal {...props} centered size="sm">
      <Modal.Header closeButton>Adicionar ao carrinho</Modal.Header>
      <Modal.Body>
        <Form onSubmit={(event: React.FormEvent) => onSubmit(event)}>
          <Form.Label>Selecione a quantidade do item para a compra</Form.Label>
          <Form.Control
            value={quantity}
            type="number"
            name="quantity"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setQuantity(Number(event.target.value))
            }
          />
          <Button className="primary-button mt-3" type="submit">
            Adicionar ao Carrinho
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddCartModal;
