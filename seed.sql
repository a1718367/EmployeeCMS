use empCMSdb;

insert into department(name) values ("Business"),("Development");

insert into roles(title, salary, FK_depid) 
values ("Manager", 100000.00,1),("Senior", 90000,2),("Operation", 75000,1),("Operation", 80000,2);

insert into employee (firstname, surname, FK_roleid, FK_managerid)
values ("Bob","Manager",1,1),("Chris","DevSnr",2,1),("Tom","BusOps",3,1),("Jane","DevOps",4,2);

