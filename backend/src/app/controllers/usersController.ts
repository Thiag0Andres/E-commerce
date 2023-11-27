import { Request, Response } from 'express';
import knex from '../../database/connection';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth.json';
import HttpStatus from "http-status-codes";

//Get user ID and make a unique token based on a Secret key hide in /config
function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400 * 7
    });
};

class UsersController {
    async register(req: Request, res: Response) {
        try {
            let userBody = req.body;
            const { password } = userBody;

            let payload: any = {};
            const now = new Date();

            const existUser: any = await knex.raw('select * from `users` where `email` = '+ `'${userBody.email}'` )

            if(existUser[0]){
                return res.status(HttpStatus.CONFLICT).send({ message: "Usuário já registrado" });
            }
            
            //Hash to encrypt password in a way that if someone ever access database, won't be able to steal password
            const hash = await bcrypt.hash(password, 10);

            userBody.password = hash;
            userBody.createdAt = now;
            userBody.updatedAt = now;

            await knex.raw('insert into `users` (`addressCity`, `addressState`, `cpf_cnpj`, `createdAt`, `email`, `name`, `password`, `phone`, `updatedAt`, `userType`, `zipcode`) values ('+ `'${userBody.addressCity}'` +', '+ `'${userBody.addressState}'` +', '+ `'${userBody.cpf_cnpj}'` +', '+ `'${userBody.createdAt}'` +', '+ `'${userBody.email}'` +', '+ `'${userBody.name}'` +', '+ `'${userBody.password}'` +', '+ `${userBody.phone}` +', '+ `'${userBody.updatedAt}'` +', '+ `'${userBody.userType}'` +', '+ `'${userBody.zipcode}'` +')');
            const id = await knex.raw('SELECT last_insert_rowid() as id');
            
            const user_id = id[0].id;

            userBody.id = user_id;
            
            return res.status(HttpStatus.CREATED).send({
                user: userBody,
                token: `Bearer ${generateToken({ id: user_id })}`
            });
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

    async auth(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            let user = await knex.raw('select * from `users` where `email` = '+ `'${email}'` +' limit 1');

            if (!user[0])
                return res.status(HttpStatus.NOT_FOUND).send({ message: 'User not found' });

            //Compare typed password with the real password stored on MongoDB
            if (!await bcrypt.compare(password, user[0].password))
                return res.status(HttpStatus.BAD_REQUEST).send({ message: 'Wrong password' });

            //Hide password from user, then it won't be sent as response
            user[0].password = undefined;
            user[0].createdAt = new Date(user[0].createdAt);
            user[0].updatedAt = new Date(user[0].updatedAt);

            return res.json({
                user: user[0],
                token: `Bearer ${generateToken({ id: user[0].id })}`
            });
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
            let users = await knex.raw('select * from `users`');

            users = users.map((user: any) => {
                user.password = undefined;
                user.createdAt = new Date(user.createdAt);
                user.updatedAt = new Date(user.updatedAt);
                return user;
            });
            
            return res.json(users);
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

            const user = await knex.raw('select * from `users` where `id` = '+ id +' limit 1');

            if(!user[0]){
                return res.status(HttpStatus.BAD_REQUEST).json({ message: 'User not found.'});
            }
            
            user[0].password = undefined;
            user[0].createdAt = new Date(user[0].createdAt);
            user[0].updatedAt = new Date(user[0].updatedAt);

            return res.json(user[0]);
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
            const { id } = req.params;

            let user = await knex.raw('select * from `users` where `id` = '+ id +' limit 1');

            if(!user[0]){
                return res.status(HttpStatus.BAD_REQUEST).json({ message: 'User not found.'});
            }

            user = {
                ...user[0],
                ...req.body,
            };

            const now = new Date();
            user.updatedAt = now;
            user.createdAt = new Date(user.createdAt);

            await knex.raw('update `users` set `id` = '+ `${user.id}` +', `userType` = '+ `'${user.userType}'` +', `cardId` = '+ `${user.cardId}` +', `accountId` = '+ `${user.accountId}` +', `name` = '+ `'${user.name}'` +', `email` = '+ `'${user.email}'` +', `password` = '+ `'${user.password}'` +', `cpf_cnpj` = '+ `'${user.cpf_cnpj}'` +', `phone` = '+ `${user.phone}` +', `addressState` = '+ `'${user.addressState}'` +', `addressCity` = '+ `'${user.addressCity}'` +', `zipcode` = '+ `${user.zipcode}` +', `createdAt` = '+ `'${user.createdAt}'` +', `updatedAt` = '+ `'${user.updatedAt}'` +' where `id` = ' + id + '');
            
            user.password = undefined;

            return res.json(user);
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

            const user = await knex.raw('select * from `users` where `id` = '+ id +' limit 1');

            if(!user[0]){
                return res.status(HttpStatus.NOT_FOUND).json({ error: 'User not found' });
            }

            await knex.raw('delete from `users` where `id` = '+ id);

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

export default new UsersController;