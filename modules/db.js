const mysql = require("mysql");
const db = module.exports;

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "1234",
    database: "empCMSdb"
})

connection.connect(function(err){
    if (err) throw err;
});


// Inquirer prompts lists
db.listData = async function (query) {
	return new Promise((resolve) => {
		connection.query(query, function (err, res) {
			if (err) throw err;
			let listArray = res.map((item) => {
				let values = Object.values(item);
				let container = { name: values[1], value: values[0], surname: values[2]};
				return container;
			});
			resolve(listArray);
		});
	});
};

db.end = function(){connection.end()};


db.emplistData = async function () {
	return new Promise((resolve) => {
		connection.query('select employee.empid, roles.title, concat(employee.firstname, " ", employee.surname) from employee join roles on employee.FK_roleid = roles.roleid where employee.state = 1', function (err, res) {
			if (err) throw err;
            let z = res.map(function(item){
                let values = Object.values(item);
                let container = {Title: values[1],name: values[2],id: values[0]}
                return container;
			});
			resolve(z);
		});
	});
};
