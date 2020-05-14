

const mainmenu = [
    {
        message: 'Please Select an Option.',
        type: 'list',
        name: 'mainmenu',
        choices: ['View', 'Add', 'Update', 'Delete','Exit']
    }
];

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
    viewmenu: viewmenu,
    addmenu: addmenu,
    updatemenu: updatemenu,
    deletemenu: deletemenu,
}
