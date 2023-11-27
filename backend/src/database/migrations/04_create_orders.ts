import Knex from 'knex';

export async function up(knex: Knex) {
    await knex.raw("create table `orders` (`id` integer not null primary key autoincrement, `customerId` integer null, `paymentType` text check (`paymentType` in ('creditcard', 'billet', 'transfer')) not null, `orderValue` float not null, `shippingValue` float not null, `totalValue` float not null, `createdAt` datetime not null default CURRENT_TIMESTAMP, `updatedAt` datetime null default null, foreign key(`customerId`) references `users`(`id`) on delete CASCADE on update CASCADE)");
}

export async function down(knex: Knex) {
    await knex.raw("drop table `orders`");
}