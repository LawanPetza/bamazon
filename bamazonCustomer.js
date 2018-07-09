var mysql = require("mysql")
var inquirer = require("inquirer")

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

connection.connect(function (err) {
    if (err) throw err;
    displayProducts()
});

function displayProducts() {
    connection.query("SELECT * FROM products;", function (err, results) {
        if (err) throw err;
        // console.log(results)
    
            // for (var i = 0; i < results.lenght; i++) {
            // console.log(results)
            // }
        

        for (var i = 0; i < results.length; i++) {
            console.log("ID: " + results[i].itemID + " | " + "Product: " + results[i].productName + " | " + "Department: " + results[i].departmentName + " | " + "Price: " + results[i].price + " | " + "Quantity: " + results[i].stockQuantity)
        }
        
        shoppingCart();

    });
}
function shoppingCart() {
    inquirer.prompt([
        {
            name: "ProductID",
            type: "input",
            message: "What is the ID of the product you would like to purchase?",

            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                } else {
                    return false;
                }
            }

        }, {
            name: "Quantity",
            type: "input",
            message: "How many would you like to purchase?",
            validate: function (value) {
                if (isNaN(value)){
                    return false;
                } else {
                    return true;
                }
            }

        }
    ]).then(function (answer) {
        console.log(answer)

        connection.query("SELECT * FROM products WHERE itemID = " + answer.ProductID, function (err, results) {
            console.log(results[0].stockQuantity)
            console.log(answer.Quantity)

            if (answer.Quantity <= results[0].stockQuantity) {
                // for (var i = 0; i < results.length; i++) {
                    console.log("We currently have " + results[0].stockQuantity + " " + results[0].productName + ".");
                    console.log("Your order of " + answer.Quantity + " " + results[0].productName + "is now being processed.");
                // }
            } else {
                console.log("Not enough of this product is stock");
            }
            // displayProducts();
        })
    })
};
