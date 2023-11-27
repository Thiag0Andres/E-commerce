
--Cria Conta bancaria
insert into 'bankaccount' ('bankAccountAgency', 
    'bankAccountNumber', 
    'bankAccountType', 
    'bankName', 
    'createdAt', 
    'updatedAt') 

-- Valores Conta bancária
values ('${body.bankAccountAgency}', 
    '${body.bankAccountNumber}', 
    '${body.bankAccountType}', 
    '${body.bankName}', 
    '${now}', 
    '${now}')

-- Retorna último ID inserido
SELECT last_insert_rowid() as id

-- Associa user a conta bancaria *?*
update 'users' set 'accountId' = ${id[0].id} where 'id' = ${(req as any).userId}

-- Lista contas bancarias
select * from `bankaccount`

-- Busca uma conta bancaria
select * from `bankaccount` where `id` = ' + id + ' limit 1

-- Atualizar conta bancaria
update `bankaccount` set `id` = ' + updatedBankAccount.id + ',
    `bankAccountAgency` = ' + updatedBankAccount.bankAccountAgency + ',
    `bankAccountNumber` = ' + updatedBankAccount.bankAccountNumber + ',
    `bankAccountType` = ' + `'${updatedBankAccount.bankAccountType}'` + ',
    `bankName` = ' + `'${updatedBankAccount.bankName}'` + ',
    `createdAt` = ' + `'${updatedBankAccount.createdAt}'` + ',
    `updatedAt` = ' + `'${updatedBankAccount.updatedAt}'` + ' where `id` = ' + id + '

-- Deletar conta bancaria
delete from `bankaccount` where `id` = '+ id +'

-- Destruir conta bancaria
update `users` set `accountId` = NULL where `accountId` = ' + id + '
