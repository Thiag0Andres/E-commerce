import Knex from 'knex';

export async function up(knex: Knex) {
    await knex.raw('create table `cards` (`id` integer not null primary key autoincrement, `name` varchar(255) not null, `cardNumber` varchar(255) not null, `cvc` varchar(255) not null, `dueDate` date not null, `createdAt` datetime not null default CURRENT_TIMESTAMP, `updatedAt` datetime null default null)');
    await knex.raw('create index `cards_cardnumber_index` on `cards` (`cardNumber`)');
    await knex.raw('create index `cards_cvc_index` on `cards` (`cvc`)');
}

export async function down(knex: Knex) {
    await knex.raw("drop table `cards`");
}