-- Criar Card  
insert into `cards` (`cardNumber`,
 `createdAt`, 
 `cvc`, 
 `dueDate`, 
 `name`, 
 `updatedAt`) 
 
 -- Valor Cards
values (' + body.cardNumber + ',
    '+ `'${body.createdAt}'`+ ', 
    '+ body.cvc+', 
    '+ `'${body.dueDate}'`+', 
    '+ `'${body.name}'`+', 
    '+ `'${body.updatedAt}'`+')

-- Retorna último ID inserido
SELECT last_insert_rowid() as id

-- Associar users a ID do cartão
update `users` set `cardId` = '+ cardId + ' where `id` =  + (req as any).userId

-- listar todos os cartoes
select * from `cards`

-- listar um cartao
select * from `cards` where `id` = '+ id +' limit 1

--Atualizar cartao ??
update `cards` set `id` = ' + object.id + ',
    `name` = ' + `'${object.name}'`+',
    `cardNumber` = '+`'${object.cardNumber}'` +',
    `cvc` = ' + `'${object.cvc}'` +',
    `dueDate` = '+ `'${object.dueDate}'`+',
    `createdAt` = ' + `'${object.createdAt}'` + ',
    `updatedAt` = '+ `'${object.updatedAt}'`+' where `id` = '+ `'${id}

-- Deletar cartão
delete from `cards` where `id` = '+ id +'

-- Destruir conta bancária
update `users` set `cardId` = NULL where `cardId` = ' + id + '