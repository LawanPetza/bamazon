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
    //display the products and details for sale
    connection.query("SELECT * FROM products;", function (err, results) {

        if (err) throw err;
        console.log(' ')
        console.log("Welcome to Bamazon!")
        console.log(' ')
        console.log("Here are all the items available for sale: ")
        console.log('-----------------------------------------------------------------------------------------------------------------------')

        for (var i = 0; i < results.length; i++) {
            console.log("ID: " + results[i].itemID + " | " + "Product: " + results[i].productName + " | " + "Department: " + results[i].departmentName + " | " + "Price: " + results[i].price + " | " + "Quantity: " + results[i].stockQuantity)
            console.log('-------------------------------------------------------------------------------------------------------------------')
        }
        console.log(' ')
        processOrder();

    });
}
function processOrder() {
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
                if (isNaN(value)) {
                    return false;
                } else {
                    return true;
                }
            }

        }
    ]).then(function (answer) {
        // console.log(answer)

        connection.query("SELECT * FROM products WHERE itemID = " + answer.ProductID, function (err, results) {
            // console.log(results[0].stockQuantity)
            // console.log(answer.Quantity)

            if (answer.Quantity <= results[0].stockQuantity) {
                // check if quantity is sufficient
                console.log(' ')
                // console.log("We currently have " + results[0].stockQuantity + " " + results[0].productName + ".");
                console.log("Your order of " + answer.Quantity + " " + results[0].productName + " is now being processed.");
                console.log(' ')

                var newQty = results[0].stockQuantity - answer.Quantity
                var totalCost = results[0].price * answer.Quantity
                console.log(results[0].price)
                console.log("Your total for " + results[0].productName + " is $" + totalCost.toFixed(2));
                // console.log(totalCost)
                
                connection.query(
                    "UPDATE products SET ? WHERE ?",
                    [
                        {
                            stockQuantity: newQty
                        }, {
                            itemID: answer.ProductID
                        }
            
                    ],
                    function (err, res) {
                        console.log(res.affectedRows + " product(s) updated!\n");
                        displayProducts();
                        // console.log(price + "Price")
                        // reprompt();
                        // displayProducts();
                    }
                )
                
                // updateProduct(answer.ProductID, newQty, totalCost)
            } else {
                console.log(' ')
                console.log("Sorry, there's not enough of this product for sale at this time. All we have is " + results[0].stockQuantity + " in our Inventory. ");
                console.log(' ')

                reprompt();
            }

        })
        // displayProducts();
    })
};


// function updateProduct(id, qty, price) {
//     console.log(id, qty, price)

//     connection.query(
//         "UPDATE products SET ? WHERE ?",
//         [
//             {
//                 stockQuantity: qty
//             }, {
//                 itemID: id
//             }

//         ],
//         function (err, res) {
//             console.log(res.affectedRows + " product(s) updated!\n");
//             console.log(price + "Price")
//             displayProducts();
//         }
//     )

// }
//ask if they would like to purchase another item
function reprompt() {

    inquirer.prompt([{
        name: "reply",
        type: "confirm",
        message: "Would you like to purchase another item?"

    }]).then(function (ans) {
        console.log(ans)

        if (ans.reply) {
            displayProducts();

        } else {
            console.log("Thank you for shopping with us! Hope to see you soon!")
        }
    })
}

// displayProducts();

