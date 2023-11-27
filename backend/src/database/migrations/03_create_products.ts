import Knex from 'knex';

export async function up(knex: Knex) {
    await knex.raw("create table `products` (`id` integer not null primary key autoincrement, `sellerId` integer null, `description` varchar(255) not null, `name` varchar(255) not null, `price` float not null, `availableQuant` integer not null, `createdAt` datetime not null default CURRENT_TIMESTAMP, `updatedAt` datetime null default null, foreign key(`sellerId`) references `users`(`id`) on delete CASCADE on update CASCADE)");
}

export async function down(knex: Knex) {
    await knex.raw("drop table `products`");
}