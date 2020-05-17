use empCMSdb;

select*from roles;

select roles.roleid, roles.title, roles.salary, department.name from roles
inner join department on roles.FK_depid = department.depid;

select employee.empid, employee.firstname, employee.surname, roles.title, roles.salary, department.name, manager.firstname
from employee
inner join roles on employee.FK_roleid = roles.roleid
inner join department on roles.FK_depid = department.depid
left join employee as manager on employee.FK_managerid = manager.empid;
