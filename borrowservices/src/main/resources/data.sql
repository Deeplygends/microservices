insert into borrow(id, isbn, reader, date_borrow, date_return)
values (1, 09498409840, 1, parsedatetime('2020-05-17', 'yyyy-MM-dd'), parsedatetime('2020-05-28', 'yyyy-MM-dd')),
       (2, 86539838737, 1, parsedatetime('2020-05-18', 'yyyy-MM-dd'), null),
       (3, 09498409840, 2, parsedatetime('2020-05-25', 'yyyy-MM-dd'), null);

