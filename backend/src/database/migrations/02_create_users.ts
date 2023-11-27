import Knex from 'knex';

export async function up(knex: Knex) {
    await knex.raw("create table `users` (`id` integer not null primary key autoincrement, `userType` text check (`userType` in ('customer', 'seller')) not null, `cardId` integer null, `accountId` integer null, `name` varchar(255) not null, `email` varchar(255) not null, `password` varchar(255) not null, `cpf_cnpj` varchar(255) not null, `phone` varchar(255) not null, `addressState` varchar(255) not null, `addressCity` varchar(255) not null, `zipcode` varchar(255) not null, `createdAt` datetime not null default CURRENT_TIMESTAMP, `updatedAt` datetime null default null, foreign key(`cardId`) references `cards`(`id`) on delete CASCADE on update CASCADE, foreign key(`accountId`) references `bankaccount`(`id`) on delete CASCADE on update CASCADE)")
}

export async function down(knex: Knex) {
    await knex.raw("drop table `users`");
}