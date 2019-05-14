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
 //Connection ID.
connection.connect(function(err){
    if (err)throw err;
    
    console.log("WELCOME TO BAMAZON! You are now connected as id # " + connection.threadId);

    //fireing off the function that shows all the items.
    getAll();
});

//Function to display all products to choose from.
function getAll() {
    connection.query("SELECT * FROM products",function(err,results) {
        if (err) throw err;
        results.forEach(function(item) {
            console.log("ID: " + item.item_id + " | Name: " + item.product_name + " |  Department: " + item.department_name + " | Price: $" + item.price + " | In stock: " + item.stock_quantity);
        });
        //Fireing off the function to prompt the user with what item/amount they wish to purchase.
        promptUser(results)

    })
}

// Function to prompt user with Item/amount they wish to purchase.
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

        //parseing the input into an integer for proper search.
        var quantity = parseInt(answer.quantity);

        //Setting item to the item chosen
        var item = findItem(data, parseInt(answer.id))

        //Firing off the function that updates the inventory and finishes your order.
        updateQuantity(item,quantity);
        
    })
}

//Function to find which Item was chosen by input.
function findItem(database, userID) {
    for (var i = 0; i < database.length; i++) {
        if (userID === database[i].item_id){
            return database[i];
        }
    }
    return null;
}

//Function that updates mysql inventory, and finishes off the order with your total amount, or if insufficent stock quantity.
function updateQuantity(item, amount) {
    
    //Logging the item and amount quantity chosen.
    console.log(`Item Name: ${item.product_name} | Quantity ordered # :${amount}`);
    
    //Multiplying the quantity with the price of item for total at checkout.
    var total = amount*item.price;

    //Putting updated quantity into a string variable for easy passthrough parameters.
    var string =   `UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?`
    
    //Responding with your total or insufficient quantity logs
    connection.query(string, [amount, item.item_id] , function(err,res) {
        if (item.stock_quantity === 0){
            //If insufficient quantity log this.
            console.log("We apologize for the inconvenience, but we are all out of stock please adjust your order")
            
            //Fireing off the function with option to Order something diffrent or modify purchase.
            reOrder();
        }else {

            //If quantity is good then complete your purchase with the total.
            console.log("Thank you for your purchase, your total is $" + total );

            //Fireing off the function with option to Order again
            reOrder();
        }
       
    })
}

//Function to give choice of ordering again after purchase/insuffcient quantity.
function reOrder(){
    inquirer.prompt([{
        name: "reOrder",
        type: "list",
        message: "Order again?",
        choices: ["Yes","No"]
    }]).then(function(answer) {

        //If would like to order again.
        if (answer.reOrder === "Yes"){
        
            //Fire off begining of app with all the items/prices/quantity.
            getAll();
            
        }else {

            //Friendly goodbye if no reorder.
            console.log("Thank you,come again!");

            //Exit out of node app in terminal.
            process.exit();
        }
    })
} 



        
    