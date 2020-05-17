use empCMSdb;

select*from roles;

select roles.roleid, roles.title, roles.salary, department.name from roles
inner join department on roles.FK_depid = department.depid;

select employee.empid, employee.firstname, employee.surname, roles.title, roles.salary, department.name, manager.firstname
from employee
inner join roles on employee.FK_roleid = roles.roleid
inner join department on roles.FK_depid = department.depid
left join employee as manager on employee.FK_managerid = manager.empid;

select roles.roleid, roles.title, roles.salary, department.name 
from roles 
join department on roles.FK_depid = department.depid 
where roles.state = 1;

select 
concat(m.surname," ",m.firstname) as manager,
concat(e.surname," ",e.firstname) as 'direct report'
from
employee e
inner join employee m on m.empid = e.FK_managerid;

