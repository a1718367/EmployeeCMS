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
   // connection.end();

});


async function name() {
    let a = await inqurier.prompt(menu.mainmenu);
    let b;
    switch (a.mainmenu) {
        case "View":
            b = await inqurier.prompt(menu.viewmenu);
            console.log(b);
            view();
            break;
        case "Add":
            b = await inqurier.prompt(menu.addmenu);
            console.log(b);
            break;
        case "Update":
            b = await inqurier.prompt(menu.updatemenu);
            console.log(b);
            break;
        case "Delete":
            b = await inqurier.prompt(menu.deletemenu);
            console.log(b);
            break;
        case "Exit":
            return;           
        default:
            console.log("System Error, Get Help!")
            break;
    };
};
//name();

function start(){
    inqurier.prompt(menu.mainmenu).then(function(ans){
        if(ans.opchoise === "View"){
            inqurier.prompt(menu.viewmenu).then(function(ans){
                view()
            })
        }
    })
}


function view (){
    console.log("test")
    connection.query(
        "select*from employee join roles on employee.FK_roleid = roles.roleid join department on roles.FK_depid = department.depid ", 
        function(err, res){
        if (err) throw err;
        console.log(res)
        start();
})}