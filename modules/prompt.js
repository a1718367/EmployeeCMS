// Node dependencies
const inquirer = require("inquirer");

// Local dependencies
const db = require("./db");

// Database queries
async function deptList() {
	let query = "SELECT * FROM department where state = 1";
	let choices = await db.listData(query);
	return choices;
}
async function roleList() {
	let query = "SELECT roleid, title FROM roles where state = 1";
	let choices = await db.listData(query);
	return choices;
}
async function employeeList() {
    let query = `select employee.empid, concat(employee.firstname, " ", employee.surname) from employee join roles on employee.FK_roleid = roles.roleid where roles.directreport = 1`;
	// let query = "SELECT empid, CONCAT(firstname, ' ', surname) FROM employee";
	let choices = await db.listData(query);
	return choices;
}







const chkstring = async function(input){
    if (input == ""){
        console.log(" Input Needed")
    }else{return true}
};
const chknum = async function(input){
    if (isNaN(input) || input == ""){
        console.log(" Number Needed")
    }else{return true}
};

const mainmenu = [
    {
        message: 'Please Select an Option.',
        type: 'list',
        name: 'opchoise',
        choices: ['View', 'Add', 'Update', 'Delete','Exit']
    },
    {
        message: 'Please Select an Option.',
        type: 'list',
        name: 'itemchoise',
        choices: ['Department', 'Roles','Employee']
        
    }
];

const adddept = [
    {
        message: 'Please Enter New Department Name.',
        type: 'input',
        name: 'newdept',
        validate: chkstring,

    }
]

const addrole = [
    {
        message: 'Please Enter Title for New Role.',
        type: 'input',
        name: 'newrole',
        validate: chkstring,

    },
    {
        message: 'Please Enter Salary for New Role.',
        type: 'input',
        name: 'newsalary',
        validate: chknum,
    },
    {
        message: 'Does the New Role has Direct report?.',
        type: 'confirm',
        name: 'directreport',
    },
    {
        type: "list",
        name: "empRole",
        message: "Please Select a Department for thie role.",
        choices: async function (answers) {
            return deptList();
        }
    }

]

const addstaff = [
    {
        message: 'Please Enter Firstname of New staff.',
        type: 'input',
        name: 'firstname',
        validate: chkstring,
    },
    {
        message: 'Please Enter Surname of New staff.',
        type: 'input',
        name: 'surname',
        validate: chkstring,
    },
    {
        message: 'Please Select Role for New staff.',
        type: 'list',
        name: 'role',
        choices: async function(ans){
            return roleList();
        }
    },
    {
        message: 'Please Select A Direct Report for New staff.',
        type: 'list',
        name: 'reportto',
        choices: async function(ans){
            return employeeList();
        }
    },

]

const viewmenu= [
    {
        message: 'Please select an Option to View.',
        type: 'list',
        name: 'viewmenu',
        choices: ['Department','Roles','Employees']
    }
];

const addmenu= [
    {
        message: 'Please select an Option to Add.',
        type: 'list',
        name: 'addmenu',
        choices: ['Department','Roles','Employees']
    }
];

const updatemenu= [
    {
        message: 'Please select an option to Update.',
        type: 'list',
        name: 'updatemenu',
        choices: ['Department','Roles','Employees']
    }
];

const deletemenu= [
    {
        message: 'Please select an option to Delete.',
        type: 'list',
        name: 'deletemenu',
        choices: ['Department','Roles','Employees']
    }
];

module.exports = {
    mainmenu: mainmenu,
    adddept: adddept,
    addrole: addrole,
    addstaff: addstaff,
    viewmenu: viewmenu,
    addmenu: addmenu,
    updatemenu: updatemenu,
    deletemenu: deletemenu,
}
