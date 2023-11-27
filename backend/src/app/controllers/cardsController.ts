import { Request, Response } from 'express';
import knex from '../../database/connection';

import HttpStatus from "http-status-codes";
import schemas from '../../config/joiSchemas';

class CardsController {
    async create(req: Request, res: Response) {
        try {
            let body = req.body;

            const now = new Date();
            
            body.createdAt = now;
            body.updatedAt = now;

            await knex.raw('insert into `cards` (`cardNumber`, `createdAt`, `cvc`, `dueDate`, `name`, `updatedAt`) values (' + body.cardNumber + ', '+ `'${body.createdAt}'`+ ', '+ body.cvc+', '+ `'${body.dueDate}'`+', '+ `'${body.name}'`+', '+ `'${body.updatedAt}'`+')')
            const id = await knex.raw('SELECT last_insert_rowid() as id');

            const cardId = id[0].id;
            body.id = cardId;

            await knex.raw('update `users` set `cardId` = '+ cardId + ' where `id` = ' + (req as any).userId);

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
            let cards = await knex.raw('select * from `cards`');

            cards = cards.map((card: any) => {
                card.createdAt = new Date(card.createdAt);
                card.updatedAt = new Date(card.updatedAt);

                return card;
            });
            
            return res.json(cards);
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

            const card = await knex.raw('select * from `cards` where `id` = '+ id +' limit 1')

            if(!card || card.length === 0){
                return res.status(HttpStatus.NOT_FOUND).json({ message: 'Card not found.'});
            }

            card[0].createdAt = new Date(card[0].createdAt);
            card[0].updatedAt = new Date(card[0].updatedAt);

            return res.json(card[0]);
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

            const card = await knex.raw('select * from `cards` where `id` = '+ id +' limit 1')

            if(!card || card.length === 0){
                return res.status(HttpStatus.NOT_FOUND).json({ message: 'Card not found.'});
            }

            const now = new Date();

            const object = {
                ...card[0],
                ...body
            }

            object.createdAt = new Date(card[0].createdAt);
            object.updatedAt = now;

            await knex.raw('update `cards` set `id` = ' + object.id + ', `name` = ' + `'${object.name}'`+', `cardNumber` = '+`'${object.cardNumber}'` +', `cvc` = ' + `'${object.cvc}'` +', `dueDate` = '+ `'${object.dueDate}'`+', `createdAt` = ' + `'${object.createdAt}'` + ', `updatedAt` = '+ `'${object.updatedAt}'`+' where `id` = '+ `'${id}'`);

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

            const card = await knex.raw('select * from `cards` where `id` = ' + id + ' limit 1');

            if(!card || card.length === 0){
                return res.status(HttpStatus.NOT_FOUND).json({ error: 'Card not found' });
            }

            await knex.raw('delete from `cards` where `id` = '+ id +'');
            await knex.raw('update `users` set `cardId` = NULL where `cardId` = ' + id + '');

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

export default new CardsController;