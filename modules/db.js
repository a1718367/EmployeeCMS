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


function dlist() {
    connection.query("select * from department", function(err,res){
        if (err) throw err;
        list = res.map(v => ({id: v.depid, name: v.name}))
        console.log(list);
        return list;
        
    }
    )
}
// Inquirer prompts lists
db.listData = async function (query) {
	return new Promise((resolve) => {
		connection.query(query, function (err, res) {
			if (err) throw err;
			let listArray = res.map((item) => {
				let values = Object.values(item);
				let container = { name: values[1], value: values[0] };
				return container;
			});
			resolve(listArray);
		});
	});
};



