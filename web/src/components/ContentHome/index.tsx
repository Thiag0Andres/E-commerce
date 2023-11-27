import React, { useState, useEffect } from 'react';
import './styles.scss';
import { Form, Container, Row, Card, Col, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Pagination, AddCartModal } from '..';
import Search from '../../images/search.svg';
import api from '../../services/api';
import { environment } from '../../environment/environment';

interface Product {
  id: number;
  sellerId: number;
  description: string;
  name: string;
  price: number;
  availableQuant: number;
}

const PRODUCTS_PER_PAGE = 8;

const ContentHome: React.FC = () => {
  const token = localStorage.getItem(
    environment.REACT_APP_LOCAL_STORAGE_USER_AUTH,
  );
  const [currrentPage, setCurrentPage] = useState(1);
  const [currentSearch, setCurrentSearch] = useState('');
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [listProducts, setListProducts] = useState<Product[]>([]);
  const [showModalAddCart, setShowModalAddCart] = useState(false);
  const [productId, setProductId] = useState(0);

  useEffect(() => {
    api
      .get('/products')
      .then(response => {
        setAllProducts(response.data);
        setListProducts(response.data);
      })
      .catch(error => {
        toast.error(`${error.response.data.message}`);
      });
  }, []);

  const filtering = (nameProduct: string) => {
    setCurrentSearch(nameProduct);
    if (nameProduct !== '') {
      setListProducts(
        allProducts.filter(
          product =>
            product.name.toLowerCase().indexOf(nameProduct.toLowerCase()) !==
            -1,
        ),
      );
    } else {
      setListProducts(allProducts);
    }
  };

  console.log(listProducts);

  const renderSearch = (
    <Row noGutters className="container-search">
      <div className="container-input">
        <Form.Control
          className="input-search"
          placeholder="Pesquise seu produto aqui"
          value={currentSearch}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            filtering(event.target.value)
          }
        />
        <img src={Search} alt="serach-icon" />
      </div>
    </Row>
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const payProduct = (id: number) => {
    setProductId(id);
    setShowModalAddCart(true);
  };

  const renderListProducts = (
    <Col className="container-list-products">
      <Row style={{ width: '80vw', padding: 15 }}>
        <Pagination
          paginate={paginate}
          postsPerPage={PRODUCTS_PER_PAGE}
          totalPosts={listProducts.length}
        />
      </Row>
      <Row style={{ width: '80vw' }}>
        {listProducts.map(product => (
          <Col
            key={product.id}
            xs={12}
            sm={6}
            md={4}
            lg={3}
            className="collum-product"
          >
            <Card className="product-item">
              <Card.Body>
                <Card.Text> {product.name} </Card.Text>
                <Card.Text>{product.description}</Card.Text>
                <Card.Text>
                  {Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(product.price)}
                </Card.Text>
                <Row className="container-button">
                  <Button
                    className="primary-button"
                    onClick={() => payProduct(product.id)}
                  >
                    Comprar
                  </Button>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Col>
  );

  return (
    <>
      <Container fluid className="container-content">
        {renderSearch}
        {renderListProducts}
      </Container>
      <AddCartModal
        show={showModalAddCart}
        onHide={() => setShowModalAddCart(false)}
        productId={productId}
      />
    </>
  );
};

export default ContentHome;
