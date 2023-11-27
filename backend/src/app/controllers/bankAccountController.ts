import { Request, Response } from 'express';
import knex from '../../database/connection';

import HttpStatus from "http-status-codes";
import schemas from '../../config/joiSchemas';

class BankAccountController {
    async create(req: Request, res: Response) {
        try {
            let body = req.body;

            const now = new Date();
            
            body.createdAt = now;
            body.updatedAt = now;
            
            await knex.raw(`insert into 'bankaccount' ('bankAccountAgency', 'bankAccountNumber', 'bankAccountType', 'bankName', 'createdAt', 'updatedAt') values ('${body.bankAccountAgency}', '${body.bankAccountNumber}', '${body.bankAccountType}', '${body.bankName}', '${now}', '${now}')`) 
            const id = await knex.raw('SELECT last_insert_rowid() as id');
            
            body.id = id[0].id;
            
            await knex.raw(`update 'users' set 'accountId' = ${id[0].id} where 'id' = ${(req as any).userId}`)

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
            let bankAccounts = await knex.raw('select * from `bankaccount`');

            bankAccounts = bankAccounts.map((bankAccount: any) => {
                bankAccount.createdAt = new Date(bankAccount.createdAt);
                bankAccount.updatedAt = new Date(bankAccount.updatedAt);

                return bankAccount;
            });
            
            return res.json(bankAccounts);
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
            const bankAccount = await knex.raw('select * from `bankaccount` where `id` = ' + id + ' limit 1');

            if(!bankAccount || bankAccount.length === 0){
                return res.status(HttpStatus.NOT_FOUND).json({ message: 'Bank Account not found.'});
            }

            bankAccount.createdAt = new Date(bankAccount.createdAt);
            bankAccount.updatedAt = new Date(bankAccount.updatedAt);

            return res.json(bankAccount);
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

            const bankAccount = await knex.raw('select * from `bankaccount` where `id` = ' + id + ' limit 1');

            const updatedBankAccount = {
                ...bankAccount[0],
                ...body
            }
                
            if(!bankAccount || bankAccount.length === 0){
                return res.status(HttpStatus.NOT_FOUND).json({ message: 'Bank Account not found.'});
            }

            const now = new Date();
            updatedBankAccount.updatedAt = now;

            await knex.raw('update `bankaccount` set `id` = ' + updatedBankAccount.id + ', `bankAccountAgency` = ' + updatedBankAccount.bankAccountAgency + ', `bankAccountNumber` = ' + updatedBankAccount.bankAccountNumber + ', `bankAccountType` = ' + `'${updatedBankAccount.bankAccountType}'` + ', `bankName` = ' + `'${updatedBankAccount.bankName}'` + ', `createdAt` = ' + `'${updatedBankAccount.createdAt}'` + ', `updatedAt` = ' + `'${updatedBankAccount.updatedAt}'` + ' where `id` = ' + id + '');
            updatedBankAccount.createdAt = new Date(updatedBankAccount.createdAt);

            return res.json(updatedBankAccount);
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

            let bankAccount = await knex.raw('select * from `bankaccount` where `id` = ' + id + ' limit 1');

            if(!bankAccount || bankAccount.length === 0){
                return res.status(HttpStatus.NOT_FOUND).json({ error: 'Bank Account not found' });
            }

            await knex.raw('delete from `bankaccount` where `id` = '+ id +'');
            await knex.raw('update `users` set `accountId` = NULL where `accountId` = ' + id + '');

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

export default new BankAccountController;