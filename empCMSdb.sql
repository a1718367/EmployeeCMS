create database if not exists empCMSdb;
use empCMSdb;

CREATE TABLE IF NOT EXISTS employee(
    empid int NOT NULL auto_increment,
    firstname VARCHAR(100),
    surname VARCHAR (100),
    FK_roleid int,
    FK_managerid INT,

    PRIMARY KEY (empid)
);

create table if not exists roles(
roleid int not null auto_increment,
title varchar(30) not null,
salary decimal not null,
FK_depid int,

primary key (roleid)
);

create table if not exists department(
depid int not null auto_increment,
name varchar(30),

primary key(depid)
);

alter table employee
add foreign key(FK_roleid) references roles(roleid),
add foreign key(FK_managerid) references employee(empid);

alter table roles
add foreign key (FK_depid) references department(depid);



