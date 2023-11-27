
create table `cards` (
    `id` integer not null primary key autoincrement,
    `name` varchar(255) not null, 
    `cardNumber` varchar(255) not null,
    `cvc` varchar(255) not null, 
    `dueDate` date not null, 
    `createdAt` datetime not null default CURRENT_TIMESTAMP, 
    `updatedAt` datetime null default null
);

create index `cards_cardnumber_index` on `cards` (`cardNumber`);
create index `cards_cvc_index` on `cards` (`cvc`);

create table `bankaccount` (
    `id` integer not null primary key autoincrement,
    `bankAccountAgency` varchar(255) not null, 
    `bankAccountNumber` varchar(255) not null, 
    `bankAccountType` text check (`bankAccountType` in ('savings', 'current')) not null, 
    `bankName` varchar(255) not null, 
    `createdAt` datetime not null default CURRENT_TIMESTAMP, 
    `updatedAt` datetime null default null
);

create index `bankaccount_bankaccountagency_index` on `bankaccount` (`bankAccountAgency`);
create index `bankaccount_bankaccountnumber_index` on `bankaccount` (`bankAccountNumber`);

create table `users` (
    `id` integer not null primary key autoincrement, 
    `userType` text check (`userType` in ('customer', 'seller')) not null, 
    `cardId` integer null, 
    `accountId` integer null,
    `name` varchar(255) not null, 
    `email` varchar(255) not null,
    `password` varchar(255) not null,
    `cpf_cnpj` varchar(255) not null,
    `phone` varchar(255) not null, 
    `addressState` varchar(255) not null,
    `addressCity` varchar(255) not null, 
    `zipcode` varchar(255) not null, 
    `createdAt` datetime not null default CURRENT_TIMESTAMP, 
    `updatedAt` datetime null default null, 
    
    foreign key(`cardId`) references `cards`(`id`) on delete CASCADE on update CASCADE, 
    foreign key(`accountId`) references `bankaccount`(`id`) on delete CASCADE on update CASCADE
);

create table `products` (
    `id` integer not null primary key autoincrement, 
    `sellerId` integer null, 
    `description` varchar(255) not null, 
    `name` varchar(255) not null, 
    `price` float not null, 
    `availableQuant` integer not null, 
    `createdAt` datetime not null default CURRENT_TIMESTAMP, 
    `updatedAt` datetime null default null, 

    foreign key(`sellerId`) references `users`(`id`) on delete CASCADE on update CASCADE
);

create table `orders` (
    `id` integer not null primary key autoincrement, 
    `customerId` integer null, 
    `paymentType` text check (`paymentType` in ('creditcard', 'billet', 'transfer')) not null, 
    `orderValue` float not null, 
    `shippingValue` float not null, 
    `totalValue` float not null, 
    `createdAt` datetime not null default CURRENT_TIMESTAMP, 
    `updatedAt` datetime null default null, 

    foreign key(`customerId`) references `users`(`id`) on delete CASCADE on update CASCADE
);

create table `orderitems` (
    `id` integer not null primary key autoincrement, 
    `orderId` integer null, 
    `productId` integer null, 
    `quantity` integer not null, 
    `createdAt` datetime not null default CURRENT_TIMESTAMP, 
    `updatedAt` datetime null default null, 
    
    foreign key(`orderId`) references `orders`(`id`) on delete CASCADE on update CASCADE, 
    foreign key(`productId`) references `products`(`id`) on delete CASCADE on update CASCADE
);