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
});

//Function to display all products to choose from
    //INCLUDE id,item,price,quantity.

// Prompt asking for ID of product they would like to buy.
    // Prompt asking quantity of product they wish to buy.

// Once order placed log IF store has disired amount of items
    // and price total.
        //UPDATE DATABASE WITH NEW QUANTITY.

        
    //ELSE log insufficient quantity.
        //prevent order from going through.


