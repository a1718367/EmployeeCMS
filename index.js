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
    let a = await inqurier.prompt(menu.mainmenu);
    let obj = a.itemchoise;
    let ops = a.opchoise;
    let queryobj;
    let objaction
    let objprompts;

    switch (ops) {
        case "View":
            switch (obj) {
                case "Department":
                    queryobj = await query('select name from department where state = 1');
                    console.log(queryobj)
                    break;
                case "Roles":
                    queryobj = await query('select roles.roleid, roles.title, roles.salary, department.name from roles join department on roles.FK_depid = department.depid where roles.state = 1');
                    console.log(queryobj);
                    break;                    
                case "Employee":
                    queryobj = await query('select employee.empid, employee.firstname, employee.surname, roles.title, department.name from employee join roles on employee.FK_roleid = roles.roleid join department on roles.FK_depid = department.depid where employee.state = 1');
                    console.log(queryobj);
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
            }
    
        case "Exit":
            connection.end();
            process.exit();
        default:
            break;
    }

    start();
}



async function query(cmd, val) {
    return new Promise (function (resolve,reject){
        connection.query(cmd,val, function(err,res){
            if (err) reject(err);
            else resolve(res);

        })
    })
}

