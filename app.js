//Dependencies
const inqurier = require('inquirer');
const menu = require('./modules/prompt');


async function name() {
    let a = await inqurier.prompt(menu.mainmenu);
    let b;
    switch (a.mainmenu) {
        case "View":
            b = await inqurier.prompt(menu.viewmenu);
            console.log(b);
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
name();



