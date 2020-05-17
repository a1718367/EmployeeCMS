use empCMSdb;

insert into department(name) values ("Business"),("Development");

insert into roles(title, salary, directreport, FK_depid) 
values ("Manager", 100000.00,1,1),("Senior Developer", 90000,1,2),("Business Associate", 75000,0,1),("Developer", 80000,0,2);

insert into employee (firstname, surname, FK_roleid, FK_managerid)
values ("Bob","Manager",1,1),("Chris","DevSnr",2,1),("Tom","BusOps",3,1),("Jane","DevOps",4,2);

update empCMSdb.roles
set title = 'Senior Developer'
where roleid = 2;

update empCMSdb.roles
set title = 'Business Associate'
where roleid = 3;

update empCMSdb.roles
set title = 'Developer'
where roleid = 4

