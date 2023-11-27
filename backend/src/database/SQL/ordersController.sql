--pesquisar numero da query no arquivo ordersControler.ts

--knex.raw 1
select * from `users` where `id` = ' + customerId + ' limit 1

--2
insert into `orders` (`createdAt`,
    `customerId`, 
    `orderValue`, 
    `paymentType`, 
    `shippingValue`,
    `totalValue`, 
    `updatedAt`) 
 
 values ('+ `'${body.createdAt}'` +',
    '+ `'${body.customerId}'` +',
    '+ `'${body.orderValue}'` +', 
    '+ `'${body.paymentType}'` +', 
    '+ `'${body.shippingValue}'` +', 
    '+ `'${body.totalValue}'` +', 
    '+ `'${body.updatedAt}'` +')

--3
SELECT last_insert_rowid() as id

--4
select * from `orders` where `id` = ' + orderId + ' limit 1

--knex.raw 5
select * from `orderitems` where `orderId` = + orderId

--6
select * from `products` where `id` = ' + value.productId + ' limit 1


--8
select * from `products` where `id` = '+ productId +' limit 1

--9
select * from `orderitems` where `orderId` = '+ orderId + ' and `productId` = ' + productId + ' limit 1

--10
update `orderitems` set `id` = '+ `'${existOrder.id}'` +', 
    `orderId` = '+ `'${existOrder.orderId}'` +', 
    `productId` = '+ `'${existOrder.productId}'` +', 
    `quantity` = '+ `'${existOrder.quantity}'` +', 
    `createdAt` = '+ `'${existOrder.createdAt}'` +', 
    `updatedAt` = '+ `'${existOrder.updatedAt}'` +' where `orderId` = '+ `'${existOrder.orderId}'` +' and `productId` = ' + `'${existOrder.productId}'`'

--11
insert into `orderitems` (`createdAt`, 
    `orderId`, 
    `productId`, 
    `quantity`, 
    `updatedAt`) 

values ('+ `'${body.createdAt}'` +', 
    '+ `'${body.orderId}'` +', 
    '+ `'${body.productId}'` +', 
    '+ `'${body.quantity}'` +', 
    '+ `'${body.updatedAt}'` +')

--13
update `orders` set `orderValue` = '+ Number(Number(order[0].orderValue) + Number(product[0].price * quantity)) +',
    `totalValue` = ' + Number(Number(order[0].totalValue) + Number(product[0].price * quantity)) +' where `id` = ' + orderId'

--17
delete from `orderitems` where `orderId` = '+orderId+' and `productId` = ' +productId'

--18
update `orderitems` set `id` = '+ `'${existOrder.id}'` +',
    `orderId` = '+ `'${existOrder.orderId}'` +',
    `productId` = '+ `'${existOrder.productId}'` +',
    `quantity` = '+ `'${existOrder.quantity}'` +',
    `createdAt` = '+ `'${existOrder.createdAt}'` +',
    `updatedAt` = '+ `'${existOrder.updatedAt}'` +' where `orderId` = '+ `'${existOrder.orderId}'` +' and `productId` = '+ `'${existOrder.productId}'`

--19
update `orders` set `orderValue` = '+ newOrderValue + ',
    `totalValue` = '+ newTotalValue +' where `id` = ' + orderId

--20
select * from `orders` where `id` = '+ orderId +' limit 1

--21
delete from `orderitems` where `orderId` = ' + orderId

--22
update `orders` set `id` = '+ `'${updatedOrder.id}'` +', 
    `customerId` = '+ `'${updatedOrder.customerId}'` +', 
    `paymentType` = '+ `'${updatedOrder.paymentType}'` +', 
    `orderValue` = '+ `'${updatedOrder.orderValue}'` +', 
    `shippingValue` = '+ `'${updatedOrder.shippingValue}'` +', 
    `totalValue` = '+ `'${updatedOrder.totalValue}'` +', 
    `createdAt` = '+ `'${updatedOrder.createdAt}'` +', 
    `updatedAt` = '+ `'${updatedOrder.updatedAt}'` +' where `id` = ' + orderId

--23
select * from `orders`

--24
select * from `orders` where `id` = '+ id +' limit 1

--26
update `orders` set `id` = '+ `'${object.id}'` +', 
    `customerId` = '+ `'${object.customerId}'` +', 
    `paymentType` = '+ `'${object.paymentType}'` +', 
    `orderValue` = '+ `'${object.orderValue}'` +', 
    `shippingValue` = '+ `'${object.shippingValue}'` +', 
    `totalValue` = '+ `'${object.totalValue}'` +', 
    `createdAt` = '+ `'${object.createdAt}'` +', 
    `updatedAt` = '+ `'${object.updatedAt}'` +' where `id` = ' + id

--27
select * from `orders` where `id` = ' + id + ' limit 1

--28
delete from `orders` where `id` = '+ id +''


