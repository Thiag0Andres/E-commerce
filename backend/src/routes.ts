import express, { Request, Response } from 'express';
import cors from 'cors';

// Importing controllers
import usersController from './app/controllers/usersController';
import cardsController from './app/controllers/cardsController';
import bankAccountController from './app/controllers/bankAccountController';
import productsController from './app/controllers/productsController';
import ordersController from './app/controllers/ordersController';

// Importing middlewares
import { celebrate } from 'celebrate';
import authMiddleware from './app/middlewares/auth';

// Schemas to use with Celebrate Middleware
import Schemas from './config/joiSchemas';

const routes = express.Router();

routes.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
  
routes.options('*', cors());

// Authentication
routes.post('/users/register', usersController.register);
routes.post('/users/authenticate', usersController.auth);
routes.get('/products/', productsController.index);

routes.use(authMiddleware);

// Users
routes.get('/users/', usersController.index);
routes.get('/users/:id', usersController.show);
routes.put('/users/:id', usersController.update);
routes.delete('/users/:id', usersController.destroy);

// Cards
routes.post('/cards/', cardsController.create);
routes.get('/cards/', cardsController.index);
routes.get('/cards/:id', cardsController.show);
routes.put('/cards/:id', cardsController.update);
routes.delete('/cards/:id', cardsController.destroy);

// Bank Account
routes.post('/bankAccount/', bankAccountController.create);
routes.get('/bankAccount/', bankAccountController.index);
routes.get('/bankAccount/:id', bankAccountController.show);
routes.put('/bankAccount/:id', bankAccountController.update);
routes.delete('/bankAccount/:id', bankAccountController.destroy);

// Products
routes.post('/products/', productsController.create);
routes.get('/products/:id', productsController.show);
routes.put('/products/:id', productsController.update);
routes.delete('/products/:id', productsController.destroy);

// Orders
routes.post('/orders/', ordersController.create);
routes.get('/orders/', ordersController.index);
routes.get('/orders/:id', ordersController.show);
routes.put('/orders/:id', ordersController.update);
routes.delete('/orders/:id', ordersController.destroy);

// Cart
routes.get('/orders/item/listCard', ordersController.listCart);
routes.post('/orders/item/createItem', ordersController.addItem);
routes.post('/orders/item/removeItem', ordersController.removeItem);
routes.post('/orders/item/clearCart', ordersController.clearCart);

export default routes;