var mysql = require ("mysql")
var inquirer = require ("inquirer")

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "root",
    database: "bamazon"
  });

  connection.connect(function(err) {
    if (err) throw err;
    start()
  });
  function start(){
      connection.query ( "SELECT * FROM products;", function(err, results) {
          if(err) { 
            throw err;
          }
          else {
              console.log(results)
          }
      } )
  }