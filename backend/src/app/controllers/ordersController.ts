import { Request, Response } from 'express';
import knex from '../../database/connection';

import HttpStatus from "http-status-codes";
import schemas from '../../config/joiSchemas';

class OrdersController {
    async create(req: Request, res: Response) {
        try {
            let body = req.body;
            const { customerId } = body;

            const user = await knex.raw('select * from `users` where `id` = ' + customerId + ' limit 1')

            if(!user[0]){
                return res.status(HttpStatus.NOT_FOUND).send({ message: "User not found" });
            }

            if(user[0] && user[0].userType !== 'customer'){
                return res.status(HttpStatus.BAD_REQUEST).send({ message: "User is not a customer" });
            }

            const now = new Date();
            
            body.createdAt = now;
            body.updatedAt = now;

            await knex.raw('insert into `orders` (`createdAt`, `customerId`, `orderValue`, `paymentType`, `shippingValue`, `totalValue`, `updatedAt`) values ('+ `'${body.createdAt}'` +', '+ `'${body.customerId}'` +', '+ `'${body.orderValue}'` +', '+ `'${body.paymentType}'` +', '+ `'${body.shippingValue}'` +', '+ `'${body.totalValue}'` +', '+ `'${body.updatedAt}'` +')')
            const id = await knex.raw('SELECT last_insert_rowid() as id');

            const orderId = id[0].id;
    
            body.id = orderId;

            return res.json(body);
        } catch (error) {
            console.log(error);

            if(error.details){
                return res.status(HttpStatus.BAD_REQUEST).send({ message: error.details[0].message });
            };

            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
              message: "Something went wrong, we will get back to you shortly",
              error: error
            });
        }
    };
    
    async listCart(req: Request, res: Response) {
        try {
            const { orderId } = req.query;

            const order = await knex.raw('select * from `orders` where `id` = ' + orderId + ' limit 1');

            if(!order[0]){
                return res.status(HttpStatus.NOT_FOUND).send({ message: "Order not found" });
            };

            order[0].createdAt = new Date(order[0].createdAt);
            order[0].updatedAt = new Date(order[0].updatedAt);

            const orderItems = await knex.raw('select * from `orderitems` where `orderId` = '+ orderId);

            let products: any = [];

            if(orderItems.length > 0){
                const promises: any = orderItems.map(async (value: any) => {
                    const product = await knex.raw('select * from `products` where `id` = ' + value.productId + ' limit 1')

                    product[0].createdAt = new Date(product[0].createdAt);
                    product[0].updatedAt = new Date(product[0].updatedAt);

                    const object = {
                        ...product[0],
                        quantity: value.quantity
                    };

                    products.push(object);
                });

                await Promise.all(promises);
            }

            const response = {
                ...order[0],
                products
            }

            return res.json(response);
        } catch (error) {
            console.log(error);

            if(error.details){
                return res.status(HttpStatus.BAD_REQUEST).send({ message: error.details[0].message });
            };

            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
              message: "Something went wrong, we will get back to you shortly",
              error: error
            });
        }
    };

    async addItem(req: Request, res: Response) {
        try {
            let body = req.body;
            const { orderId, productId, quantity } = body;

            const order = await knex.raw('select * from `orders` where `id` = ' + orderId + ' limit 1');

            if(!order[0]){
                return res.status(HttpStatus.NOT_FOUND).send({ message: "Order not found" });
            }

            const product = await knex.raw('select * from `products` where `id` = '+ productId +' limit 1');
                
            if(!product[0]){
                return res.status(HttpStatus.NOT_FOUND).send({ message: "Product not found" });
            }

            let existOrder: any = await knex.raw('select * from `orderitems` where `orderId` = '+ orderId + ' and `productId` = ' + productId + ' limit 1');
            
            const now = new Date();

            if(existOrder[0]){
                existOrder = {
                    ...existOrder[0],
                    updatedAt: now,
                    quantity: existOrder[0].quantity + quantity
                }
                
                existOrder.createdAt = new Date(existOrder.createdAt); 
    
                await knex.raw('update `orderitems` set `id` = '+ `'${existOrder.id}'` +', `orderId` = '+ `'${existOrder.orderId}'` +', `productId` = '+ `'${existOrder.productId}'` +', `quantity` = '+ `'${existOrder.quantity}'` +', `createdAt` = '+ `'${existOrder.createdAt}'` +', `updatedAt` = '+ `'${existOrder.updatedAt}'` +' where `orderId` = '+ `'${existOrder.orderId}'` +' and `productId` = '+ `'${existOrder.productId}'`);
            } else {
                body.createdAt = now;
                body.updatedAt = now;
    
                await knex.raw('insert into `orderitems` (`createdAt`, `orderId`, `productId`, `quantity`, `updatedAt`) values ('+ `'${body.createdAt}'` +', '+ `'${body.orderId}'` +', '+ `'${body.productId}'` +', '+ `'${body.quantity}'` +', '+ `'${body.updatedAt}'` +')');
                const id = await knex.raw('SELECT last_insert_rowid() as id');
        
                body.id = id[0].id;
            }

            await knex.raw('update `orders` set `orderValue` = '+ Number(Number(order[0].orderValue) + Number(product[0].price * quantity)) +', `totalValue` = ' + Number(Number(order[0].totalValue) + Number(product[0].price * quantity)) +' where `id` = ' + orderId);

            return res.json(existOrder[0] ? existOrder[0] : body);
        } catch (error) {
            console.log(error);

            if(error.details){
                return res.status(HttpStatus.BAD_REQUEST).send({ message: error.details[0].message });
            };

            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
              message: "Something went wrong, we will get back to you shortly",
              error: error
            });
        }
    };

    async removeItem(req: Request, res: Response) {
        try {
            let body = req.body;
            const { orderId, productId, quantity } = body;

            const order = await knex.raw('select * from `orders` where `id` = ' + orderId + ' limit 1');
            
            if(!order[0]){
                return res.status(HttpStatus.NOT_FOUND).send({ message: "Order not found" });
            }

            const product = await knex.raw('select * from `products` where `id` = '+ productId +' limit 1');

            if(!product[0]){
                return res.status(HttpStatus.NOT_FOUND).send({ message: "Product not found" });
            }

            let existOrder: any = await knex.raw('select * from `orderitems` where `orderId` = '+ orderId + ' and `productId` = ' + productId + ' limit 1');

            const now = new Date();
            const oldQuantity = existOrder[0].quantity;

            if(existOrder[0]){
                existOrder = {
                    ...existOrder[0],
                    updatedAt: now,
                    quantity: existOrder[0].quantity - quantity
                }

                if(existOrder.quantity <= 0){
                    await knex.raw('delete from `orderitems` where `orderId` = '+orderId+' and `productId` = ' +productId);

                    existOrder = {
                        message: "Order item deleted"
                    }
                } else {
                    existOrder.createdAt = new Date(existOrder.createdAt);
                    
                    await knex.raw('update `orderitems` set `id` = '+ `'${existOrder.id}'` +', `orderId` = '+ `'${existOrder.orderId}'` +', `productId` = '+ `'${existOrder.productId}'` +', `quantity` = '+ `'${existOrder.quantity}'` +', `createdAt` = '+ `'${existOrder.createdAt}'` +', `updatedAt` = '+ `'${existOrder.updatedAt}'` +' where `orderId` = '+ `'${existOrder.orderId}'` +' and `productId` = '+ `'${existOrder.productId}'`);
                }
            } else {
                return res.status(HttpStatus.NOT_FOUND).send({ message: "Order item don't exist" });
            }

            const newOrderValue = order[0].orderValue - ((oldQuantity - quantity) <= 0 ? (product[0].price * oldQuantity) : (product[0].price * quantity));
            const newTotalValue = order[0].totalValue - ((oldQuantity - quantity) <= 0 ? (product[0].price * oldQuantity) : (product[0].price * quantity));

            await knex.raw('update `orders` set `orderValue` = '+ newOrderValue + ', `totalValue` = '+ newTotalValue +' where `id` = ' + orderId);

            return res.json(existOrder ? existOrder : body);
        } catch (error) {
            console.log(error);

            if(error.details){
                return res.status(HttpStatus.BAD_REQUEST).send({ message: error.details[0].message });
            };

            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
              message: "Something went wrong, we will get back to you shortly",
              error: error
            });
        }
    };
    
    async clearCart(req: Request, res: Response) {
        try {
            let body = req.body;
            const { orderId } = body;

            const order = await knex.raw('select * from `orders` where `id` = '+ orderId +' limit 1');

            if(!order[0]){
                return res.status(HttpStatus.NOT_FOUND).send({ message: "Order not found" });
            }

            await knex.raw('delete from `orderitems` where `orderId` = ' + orderId);

            const now = new Date();

            const updatedOrder = {
                ...order[0],
                updatedAt: now,
                totalValue: order[0].totalValue - order[0].orderValue,
                orderValue: 0
            }

            updatedOrder.createdAt = new Date(updatedOrder.createdAt);
            await knex.raw('update `orders` set `id` = '+ `'${updatedOrder.id}'` +', `customerId` = '+ `'${updatedOrder.customerId}'` +', `paymentType` = '+ `'${updatedOrder.paymentType}'` +', `orderValue` = '+ `'${updatedOrder.orderValue}'` +', `shippingValue` = '+ `'${updatedOrder.shippingValue}'` +', `totalValue` = '+ `'${updatedOrder.totalValue}'` +', `createdAt` = '+ `'${updatedOrder.createdAt}'` +', `updatedAt` = '+ `'${updatedOrder.updatedAt}'` +' where `id` = ' + orderId);

            return res.json(updatedOrder);
        } catch (error) {
            console.log(error);

            if(error.details){
                return res.status(HttpStatus.BAD_REQUEST).send({ message: error.details[0].message });
            };

            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
              message: "Something went wrong, we will get back to you shortly",
              error: error
            });
        }
    };

    async index(req: Request, res: Response){
        try {
            let orders = await knex.raw('select * from `orders`');

            orders = orders.map((order: any) => {
                order.createdAt = new Date(order.createdAt);
                order.updatedAt = new Date(order.updatedAt);

                return order;
            });
            
            return res.json(orders);
        } catch (error) {
            console.log(error);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
                message: "Something went wrong, we will get back to you shortly",
                error: error
            });
        }
    };

    async show(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const order = await knex.raw('select * from `orders` where `id` = '+ id +' limit 1');

            if(!order[0]){
                return res.status(HttpStatus.NOT_FOUND).json({ message: 'Order not found.'});
            }

            order[0].createdAt = new Date(order[0].createdAt);
            order[0].updatedAt = new Date(order[0].updatedAt);

            return res.json(order[0]);
        } catch (error) {
            console.log(error);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
                message: "Something went wrong, we will get back to you shortly",
                error: error
            });
        }
    };

    async update(req: Request, res: Response) {
        try {
            let body = req.body;
            const { id } = req.params;

            const order = await knex.raw('select * from `orders` where `id` = '+ id +' limit 1');

            if(!order[0]){
                return res.status(HttpStatus.NOT_FOUND).json({ message: 'Order not found.'});
            }

            const now = new Date();

            const object = {
                ...order[0],
                ...body
            }

            object.updatedAt = now;
            object.createdAt = new Date(order[0].createdAt);

            await knex.raw('update `orders` set `id` = '+ `'${object.id}'` +', `customerId` = '+ `'${object.customerId}'` +', `paymentType` = '+ `'${object.paymentType}'` +', `orderValue` = '+ `'${object.orderValue}'` +', `shippingValue` = '+ `'${object.shippingValue}'` +', `totalValue` = '+ `'${object.totalValue}'` +', `createdAt` = '+ `'${object.createdAt}'` +', `updatedAt` = '+ `'${object.updatedAt}'` +' where `id` = ' + id);

            return res.json(object);
        } catch (error) {
            console.log(error);

            if(error.details){
                return res.status(HttpStatus.BAD_REQUEST).send({ message: error.details[0].message });
            };

            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
                message: "Something went wrong, we will get back to you shortly",
                error: error
            });
        }
    };
    
    async destroy(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const order = await knex.raw('select * from `orders` where `id` = ' + id + ' limit 1');

            if(!order[0]){
                return res.status(HttpStatus.NOT_FOUND).json({ error: 'Order not found' });
            }

            await knex.raw('delete from `orders` where `id` = '+ id +'');

            return res.json({
                message: "Success"
            });
        } catch (error) {
            console.log(error);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
                message: "Something went wrong, we will get back to you shortly",
                error: error
            });
        }
    };
}

export default new OrdersController;