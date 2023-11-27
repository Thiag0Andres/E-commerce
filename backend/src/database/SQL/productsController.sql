
--knex.raw 1
select * from `users` where `id` = '+ sellerId +' limit 1

--2
insert into `products` (`availableQuant`,
    `createdAt`,
    `description`, 
    `name`, 
    `price`, 
    `sellerId`, 
    `updatedAt`) 
  
values ('+ `${body.availableQuant}` +',
    '+ `'${body.createdAt}'` +', 
    '+ `'${body.description}'` +', 
    '+ `'${body.name}'` +', 
    '+ `${body.price}` +', 
    '+ `${body.sellerId}` +', 
    '+ `'${body.updatedAt}'` + ')

--3
SELECT last_insert_rowid() as id

--4
select * from `products`

--5
select * from `products` where `id` = '+id+' limit 1

--6
select * from `products` where `id` = '+ id +' limit 1

--7
update `products` set `id` = '+ `${object.id}` +', 
    `sellerId` = '+ `${object.sellerId}` +',
    `description` = '+ `'${object.description}'` +',
    `name` = '+ `'${object.name}'` +',
    `price` = '+ `${object.price}` +',
    `availableQuant` = '+ `${object.availableQuant}` +',
    `createdAt` = '+ `'${object.createdAt}'` +',
    `updatedAt` = '+ `'${object.updatedAt}'` +' where `id` = ' + id + '

--8
select * from `products` where `id` = ' + id + ' limit 1

--9
delete from `products` where `id` = '+ id +'

