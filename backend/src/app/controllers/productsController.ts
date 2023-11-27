import { Request, Response } from 'express';
import knex from '../../database/connection';

import HttpStatus from "http-status-codes";
import schemas from '../../config/joiSchemas';

class ProductsController {
    async create(req: Request, res: Response) {
        try {
            let body = req.body;
            const { sellerId } = body;

            const user = await knex.raw('select * from `users` where `id` = '+ sellerId +' limit 1');

            if(!user[0]){
                return res.status(HttpStatus.NOT_FOUND).send({ message: "User not found" });
            }

            if(user[0] && user[0].userType !== 'seller'){
                return res.status(HttpStatus.BAD_REQUEST).send({ message: "User is not a seller" });
            }

            const now = new Date();
            
            body.createdAt = now;
            body.updatedAt = now;

            await knex.raw('insert into `products` (`availableQuant`, `createdAt`, `description`, `name`, `price`, `sellerId`, `updatedAt`) values ('+ `${body.availableQuant}` +', '+ `'${body.createdAt}'` +', '+ `'${body.description}'` +', '+ `'${body.name}'` +', '+ `${body.price}` +', '+ `${body.sellerId}` +', '+ `'${body.updatedAt}'` + ')');
            const id = await knex.raw('SELECT last_insert_rowid() as id');

            const productId = id[0].id;
    
            body.id = productId;

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

    async index(req: Request, res: Response){
        try {
            let products = await knex.raw('select * from `products`');

            products = products.map((product: any) => {
                product.createdAt = new Date(product.createdAt);
                product.updatedAt = new Date(product.updatedAt);

                return product;
            });
            
            return res.json(products);
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

            const product = await knex.raw('select * from `products` where `id` = '+id+' limit 1');

            if(!product[0]){
                return res.status(HttpStatus.NOT_FOUND).json({ message: 'Products not found.'});
            }

            product[0].createdAt = new Date(product[0].createdAt);
            product[0].updatedAt = new Date(product[0].updatedAt);

            return res.json(product[0]);
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

            const product = await knex.raw('select * from `products` where `id` = '+ id +' limit 1');

            if(!product[0]){
                return res.status(HttpStatus.NOT_FOUND).json({ message: 'Product not found.'});
            }

            const now = new Date();

            const object = {
                ...product[0],
                ...body
            }

            object.updatedAt = now;
            object.createdAt = new Date(product[0].createdAt);

            await knex.raw('update `products` set `id` = '+ `${object.id}` +', `sellerId` = '+ `${object.sellerId}` +', `description` = '+ `'${object.description}'` +', `name` = '+ `'${object.name}'` +', `price` = '+ `${object.price}` +', `availableQuant` = '+ `${object.availableQuant}` +', `createdAt` = '+ `'${object.createdAt}'` +', `updatedAt` = '+ `'${object.updatedAt}'` +' where `id` = ' + id + '');

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

            const product = await knex.raw('select * from `products` where `id` = ' + id + ' limit 1');

            if(!product[0]){
                return res.status(HttpStatus.NOT_FOUND).json({ error: 'Product not found' });
            }

            await knex.raw('delete from `products` where `id` = '+ id +'');

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

export default new ProductsController;