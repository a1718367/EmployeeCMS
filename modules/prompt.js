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
async function employeeListRpt() {
    let query = `select employee.empid, concat(employee.firstname, " ", employee.surname) from employee join roles on employee.FK_roleid = roles.roleid where roles.directreport = 1 and employee.state = 1`;
	// let query = "SELECT empid, CONCAT(firstname, ' ', surname) FROM employee";
	let choices = await db.listData(query);
	return choices;
}

async function employeeList() {
	let query = `select employee.empid, concat(employee.firstname, " ", employee.surname," ","Title: ",roles.title) from employee join roles on employee.FK_roleid = roles.roleid where employee.state = 1`;
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
        message: 'Please Select an Action.',
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
        message: 'Please Select A Line Manager for New staff.',
        type: 'list',
        name: 'reportto',
        choices: async function(ans){
            return employeeListRpt();
        }
    },

]

const updatedep = [
    {
        message: "Please select a Department to Update.",
        type: 'list',
        name: 'dep',
        choices: async function(ans){
            return deptList();
        }
    },
    {
        message: "Please Enter Updated Name for the Department.",
        type: 'input',
        name: 'updatedep',
        validate: chkstring,
    }
];

const updateroles = [
    {
        message: 'Please select a Role to Update',
        type: 'list',
        name: 'role',
        choices: async function(ans){
            return roleList();
        },
    },
    {
        message: 'Please select a field to Update.',
        type: 'list',
        name: 'field',
        choices: ['Title', 'Salary', 'Direct Report'],
    },
];

const updaterolename = [
    {
        message: 'Please Enter new name for this Role.',
        type: 'input',
        name: 'rolename',
        validate: chkstring,
    }
]

const updaterolesalary = [
    {
        message: 'Please Enter new Salary for this Role.',
        type: 'input',
        name: 'salary',
        validate: chknum,
    }
];

const updatedirectreport = [
    {
        message: 'Please confirm direct report for this Role.',
        type: 'confirm',
        name: 'directreport',
    }
]


const updateemployee = [
    {
        message: 'Please Select an employee to Update.',
        type: 'list',
        name: 'employee',
        choices: async function(ans){
            return employeeList();
        }
    },
    {
        message: 'Please Select a Employee field to Update.',
        type: 'list',
        name: 'field',
        choices: ['First name', 'Surname', 'Role', 'Report to'],
    }
];

const updateemployeename =[
    {
        message: 'Please Enter New Name.',
        type: 'input',
        name: 'name',
        validate: chkstring,
    }
];

const updateemployeerole = [
    {
        message: 'Please select a New Role.',
        type: 'list',
        name: 'role',
        choices: async function(ans){
            return roleList();
        },
    },
]

const updateemployeedreport =[
    {
        message: 'Please Select A Line Manager.',
        type: 'list',
        name: 'reportto',
        choices: async function(ans){
            return employeeListRpt();
        }
    },
]

const deletedep = [
    {
        message: "Please select a Department to De-Activate.",
        type: 'list',
        name: 'dep',
        choices: async function(ans){
            return deptList();
        }
    },
]
const deleterole = [
    {
        message: 'Please select a Role to De-Activate',
        type: 'list',
        name: 'role',
        choices: async function(ans){
            return roleList();
        },
    },
];

const deleteemp = [
    {
        message: 'Please Select an Employee to De-Activate.',
        type: 'list',
        name: 'employee',
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
    updatedep: updatedep,
    updateroles: updateroles,
    updaterolename: updaterolename,
    updaterolesalary: updaterolesalary,
    updatedirectreport: updatedirectreport,
    updateemployee: updateemployee,
    updateemployeename: updateemployeename,
    updateemployeerole: updateemployeerole,
    updateemployeedreport: updateemployeedreport,
    deletedep: deletedep,
    deleterole: deleterole,
    deleteemp: deleteemp,
    viewmenu: viewmenu,
    addmenu: addmenu,
    updatemenu: updatemenu,
    deletemenu: deletemenu,
}
