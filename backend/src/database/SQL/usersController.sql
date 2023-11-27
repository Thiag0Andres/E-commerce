--knex.raw 1
select * from `users` where `email` = '+ `'${userBody.email}'`'

--2
insert into `users` (`addressCity`,
    `addressState`, 
    `cpf_cnpj`, 
    `createdAt`, 
    `email`, 
    `name`, 
    `password`, 
    `phone`, 
    `updatedAt`, 
    `userType`, 
    `zipcode`) 
 
 
 values ('+ `'${userBody.addressCity}'` +', 
    '+ `'${userBody.addressState}'` +', 
    '+ `'${userBody.cpf_cnpj}'` +', 
    '+ `'${userBody.createdAt}'` +',
    '+ `'${userBody.email}'` +', 
    '+ `'${userBody.name}'` +', 
    '+ `'${userBody.password}'` +', 
    '+ `${userBody.phone}` +', 
    '+ `'${userBody.updatedAt}'` +', 
    '+ `'${userBody.userType}'` +', 
    '+ `'${userBody.zipcode}'` +')

--3
SELECT last_insert_rowid() as id

--4
select * from `users` where `email` = '+ `'${email}'` +' limit 1

--5
select * from `users`

--6
select * from `users` where `id` = '+ id +' limit 1

--7
select * from `users` where `id` = '+ id +' limit 1

--8
update `users` set `id` = '+ `${user.id}` +',
    `userType` = '+ `'${user.userType}'` +', 
    `cardId` = '+ `${user.cardId}` +', 
    `accountId` = '+ `${user.accountId}` +', 
    `name` = '+ `'${user.name}'` +', 
    `email` = '+ `'${user.email}'` +', 
    `password` = '+ `'${user.password}'` +', 
    `cpf_cnpj` = '+ `'${user.cpf_cnpj}'` +', 
    `phone` = '+ `${user.phone}` +', 
    `addressState` = '+ `'${user.addressState}'` +', 
    `addressCity` = '+ `'${user.addressCity}'` +', 
    `zipcode` = '+ `${user.zipcode}` +', 
    `createdAt` = '+ `'${user.createdAt}'` +', 
    `updatedAt` = '+ `'${user.updatedAt}'` +' where `id` = ' + id + '''

--9
select * from `users` where `id` = '+ id +' limit 1

--10
delete from `users` where `id` = '+ id