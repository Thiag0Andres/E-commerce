import Knex from 'knex';

export async function up(knex: Knex) {
    await knex.raw("create table `orderitems` (`id` integer not null primary key autoincrement, `orderId` integer null, `productId` integer null, `quantity` integer not null, `createdAt` datetime not null default CURRENT_TIMESTAMP, `updatedAt` datetime null default null, foreign key(`orderId`) references `orders`(`id`) on delete CASCADE on update CASCADE, foreign key(`productId`) references `products`(`id`) on delete CASCADE on update CASCADE)");
}

export async function down(knex: Knex) {
    await knex.raw("drop table `orderitems`");
}