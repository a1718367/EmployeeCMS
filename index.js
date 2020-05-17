//Dependencies
const inqurier = require('inquirer');
const menu = require('./modules/prompt');
const mysql = require("mysql");



const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "1234",
    database: "empCMSdb"
})

connection.connect(function(err){
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    start()
});

async function start(){
    console.log(`
___________________________________
########## Employee CMS ###########
___________________________________`)
    let a = await inqurier.prompt(menu.mainmenu);
    let ops = a.opchoise;
    let obj;
    let queryobj;
    let objaction
    let objprompts;
    let objpromptfield;
    if (ops == "Exit"){
        connection.end();
        process.exit()
    }else if(ops == "View by Manager"){
        queryobj = await query (`select 
        concat(m.firstname," ",m.surname) as manager,
        concat(e.firstname," ",e.surname) as staff
        from
        employee e
        inner join employee m on m.empid = e.FK_managerid;`);
        console.table(queryobj);
        start()
    }else if(ops == 'Total Overhead'){
        queryobj = await query(
        `select sum(roles.salary) as 'Total Overhead' from employee
        join roles on employee.FK_roleid = roles.roleid;`);
        let depoh = await query(`
        select sum(roles.salary) as 'Department Total', department.name as Department from employee
        join roles on employee.FK_roleid = roles.roleid
        join department on roles.FK_depid = department.depid
        group by department.name;`);
        console.table(queryobj);
        console.table(depoh);
        start();

    }
    else{
        let b = await inqurier.prompt(menu.supmenu);
        console.log(b);
        obj = b.itemchoise;
        switch (ops) {

            case "View":
                switch (obj) {
                    case "Department":
                        queryobj = await query('select name from department where state = 1');
                        console.table(queryobj)
                        break;
                    case "Roles":
                        queryobj = await query('select roles.roleid, roles.title, roles.salary, department.name as department from roles join department on roles.FK_depid = department.depid where roles.state = 1 order by department.name');
                        console.table(queryobj);
                        break;                    
                    case "Employee":
                        queryobj = await query('select employee.empid, employee.firstname, employee.surname, roles.title, department.name as department from employee join roles on employee.FK_roleid = roles.roleid join department on roles.FK_depid = department.depid where employee.state = 1 order by department.name');
                        console.table(queryobj);
                        break;            
                    default:
                        break;
                };
                break;
            case "Add":
                switch (obj) {
                    case "Department":
                        objprompts = await inqurier.prompt(menu.adddept)
                        objaction = await query('insert into department (name) values (?)',objprompts.newdept)
                        console.log (`New Department ${objprompts.newdept} Added`)
                        break;
                    case "Roles":
                        objprompts = await inqurier.prompt(menu.addrole);
                        console.log(objprompts)
                        objaction = await query('insert into roles (title, salary, directreport, FK_depid) values (?,?,?,?)',[objprompts.newrole, objprompts.newsalary, objprompts.directreport,objprompts.empRole]);
                        console.log (`New Role ${objprompts.newrole} Added`)
                        break;
                    case "Employee":
                        objprompts = await inqurier.prompt(menu.addstaff);
                        console.log(objprompts);
                        objaction = await query('insert into employee (firstname, surname, FK_roleid, FK_managerid) values (?,?,?,?)',[objprompts.firstname, objprompts.surname, objprompts.role,objprompts.reportto]);
                        console.log (`New Employee ${objprompts.firstname} ${objprompts.surname} Added`)
                        break;                                
                    default:
                        break;
                };
                break;
            case "Update":
                switch (obj) {
                    case "Department":
                        objprompts = await inqurier.prompt(menu.updatedep);
                        console.log(objprompts);
                        objaction = await query(`update department set name =(?) where depid = (?)`,[objprompts.updatedep, objprompts.dep]);
                        console.log(`New Department Name updated to ${objprompts.updatedep}`);
                        break;
                    case "Roles":
                        objprompts = await inqurier.prompt(menu.updateroles);
                        console.log(objprompts);
                        switch (objprompts.field) {
                            case 'Title':
                                objpromptfield = await inqurier.prompt(menu.updaterolename);
                                console.log(objpromptfield);
                                objaction = await query(`update roles set title = (?) where roleid = (?)`, [objpromptfield.rolename, objprompts.role])
                                console.log(`Role Title updated to ${objpromptfield.rolename}`)
                                break;
                            case 'Salary':
                                objpromptfield = await inqurier.prompt(menu.updaterolesalary);
                                console.log(objpromptfield);
                                objaction = await query(`update roles set salary = (?) where roleid = (?)`, [objpromptfield.salary, objprompts.role])
                                console.log(`Role Salary updated to ${objpromptfield.salary}`)
                                break;
                            case 'Direct Report':
                                objpromptfield = await inqurier.prompt(menu.updatedirectreport);
                                console.log(objpromptfield);
                                objaction = await query(`update roles set directreport = (?) where roleid = (?)`, [objpromptfield.directreport, objprompts.role])
                                console.log(`Role Direct Report updated to ${objpromptfield.directreport}`)
                                break;                                                
                            default:
                                break;
                        };
                        break;
                    case "Employee":
                        objprompts = await inqurier.prompt(menu.updateemployee);
                        console.log(objprompts);
                        switch (objprompts.field) {
                            case "First name":
                                objpromptfield = await inqurier.prompt(menu.updateemployeename);
                                console.log(objpromptfield);
                                objaction = await query(`update employee set firstname = (?) where empid = (?)`,[objpromptfield.name, objprompts.employee]);
                                console.log(`First name updated to ${objpromptfield.name}`)
                                break;
                            case "Surname":
                                objpromptfield = await inqurier.prompt(menu.updateemployeename);
                                console.log(objpromptfield);
                                objaction = await query(`update employee set surname = (?) where empid = (?)`,[objpromptfield.name, objprompts.employee]);
                                console.log(`Surname updated to ${objpromptfield.name}`)
                                break;
                            case "Role":
                                objpromptfield = await inqurier.prompt(menu.updateemployeerole);
                                console.log(objpromptfield);
                                objaction = await query(`update employee set FK_roleid = (?) where empid = (?)`,[objpromptfield.role, objprompts.employee]);
                                console.log(`Employee's Role Updated`)
                                break;
                            case "Report to":
                                objpromptfield = await inqurier.prompt(menu.updateemployeedreport);
                                console.log(objpromptfield);
                                objaction = await query(`update employee set FK_managerid = (?) where empid = (?)`,[objpromptfield.reportto, objprompts.employee]);
                                console.log(`Employee's Role Updated`)
                                break;                                                                            
                            default:
                                break;
                        };
                
                        break;
    
                    default:
                        break;
                };
                break;
            case "Delete":
                switch (obj) {
                    case "Department":
                        objprompts = await inqurier.prompt(menu.deletedep);
                        console.log(objprompts);
                        objaction = await query(`update department set state = 0 where depid = (?)`,[objprompts.dep]);
                        console.log(`Department Deactivated`);
                        break;
                    case "Roles":
                        objprompts = await inqurier.prompt(menu.deleterole);
                        console.log(objprompts);
                        objaction = await query(`update roles set state = 0 where roleid = (?)`,[objprompts.role]);
                        console.log(`Role Deactivated`);
                        break;
                    case "Employee":
                        objprompts = await inqurier.prompt(menu.deleteemp);
                        console.log(objprompts);
                        objaction = await query(`update employee set state = 0 where empid = (?)`,[objprompts.employee]);
                        console.log(`Employee Deactivated`);
                        break;                                
                    default:
                        break;
                };
                break;
            // case "Exit":
            // connection.end();
            // process.exit();
            
            default:
                break;
        }
    
        start();
    }

    }

    async function query(cmd, val) {
        return new Promise (function (resolve,reject){
            connection.query(cmd,val, function(err,res){
                if (err) reject(err);
                else resolve(res);
    
            })
        })
    }