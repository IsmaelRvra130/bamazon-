//Require mysql/inquirer files.
const mysql = require("mysql");
const inquirer = require("inquirer");

//Connect to mysql.
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Altima1987",
    database: "bamazon"
});

connection.connect(function(err){
    if (err)throw err;
    console.log("Connected as id # " + connection.threadId);
    getAll();
});

//Function to display all products to choose from
    //INCLUDE id,item,price,quantity.
function getAll() {
    connection.query("SELECT * FROM products",function(err,results) {
        if (err) throw err;
        results.forEach(function(item) {
            console.log("ID: " + item.item_id + ", Name: " + item.product_name + ", Department: " + item.department_name + ", Price: " + item.price + ", In stock: " + item.stock_quantity);
        });
        promptUser(results)
    })
}

function promptUser(data) {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the product ID that you would like to purchase?",
            name: "id"
        },
        {
            type: "input",
            message: "How many would you like?",
            name: "quantity"
        },

    ]).then(function(answer) {
        var quantity = parseInt(answer.quantity);
        var item = findItem(data, parseInt(answer.id))
        updateQuantity(item,quantity);

    })
}

function findItem(database, userID) {
    for (var i = 0; i < database.length; i++) {
        if (userID === database[i].item_id){
            return database[i];
        }
    }
    return null;
}

function updateQuantity(item, amount) {
    console.log(`Name: ${item.product_name}, Ordered#: ${amount}`);
    var string = `UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?`;
    if (amount <= results[0].stock_quantity) {
        var total = results[0].price * amount;
        console.log("Good news we have the amount you need in stock!");
        console.log("Your total cost for " + amount + " " + result[0].product_name + "is" + total + ", thank you!");
        connection.query(string, [ amount, item.item_id ],function(err, results);
        console.log(results)
         
    } else {
        console.log("Insufficient quantity")
    };

    /*connection.query(string, [ amount, item.item_id ],function(err, results) {
        console.log(results)
    })*/
};

// Prompt asking for ID of product they would like to buy.
    // Prompt asking quantity of product they wish to buy.

// Once order placed log IF store has disired amount of items
    // and price total.
        //UPDATE DATABASE WITH NEW QUANTITY.

        
    //ELSE log insufficient quantity.
        //prevent order from going through.


