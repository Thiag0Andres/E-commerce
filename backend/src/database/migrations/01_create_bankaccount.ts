import Knex from 'knex';

export async function up(knex: Knex) {
    await knex.raw("create table `bankaccount` (`id` integer not null primary key autoincrement, `bankAccountAgency` varchar(255) not null, `bankAccountNumber` varchar(255) not null, `bankAccountType` text check (`bankAccountType` in ('savings', 'current')) not null, `bankName` varchar(255) not null, `createdAt` datetime not null default CURRENT_TIMESTAMP, `updatedAt` datetime null default null)");
    await knex.raw("create index `bankaccount_bankaccountagency_index` on `bankaccount` (`bankAccountAgency`)")
    await knex.raw("create index `bankaccount_bankaccountnumber_index` on `bankaccount` (`bankAccountNumber`)")
}

export async function down(knex: Knex) {
    await knex.raw("drop table `bankaccount`");
}