//mysql package
const mysql = require("mysql");
//inquirer package
const inquirer = require("inquirer");

//connection to mysql
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "ThomasW",
  password: "Britty123!",
  database: "bamazon_db"
});

//Initial start of the program
connection.connect(err => {
  if (err) throw err;
  displayInventory();
});

//Displays the Inventory on hand
const displayInventory = () => {
  connection.query("SELECT * FROM products", (queryErr, queryResp) => {
    if (queryErr) throw queryErr;
    console.log("Current Inventory:");
    console.log(
      "........................................................................\n"
    );
    queryResp.forEach(element => {
      console.log(
        `Item ID: ${element.id} || Product Name: ${
          element.product_name
        } || Price: ${element.price}\n`
      );
    });
    console.log(
      "........................................................................\n"
    );
    customerQuestions();
  });
};

//Asks the customer purchase questions
const customerQuestions = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "product",
        message:
          "Please choose the Item ID of the item you would like to purchase.",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
      {
        type: "input",
        name: "quantity",
        message: "How many would you like to buy?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(answer => {
      let query =
        "SELECT id, product_name, stock_quantity, price FROM products WHERE ?";
      connection.query(query, { id: answer.product }, function(err, res) {
        if (err) throw err;
        //Check if there are less in stock than customer wants
        if (answer.quantity > res[0].stock_quantity) {
          console.log(
            `\n**Insufficient quantity! There are ${
              res[0].stock_quantity
            } left in stock for ${res[0].product_name}**\n`
            
          );
        } 
        else {
          //if enough, update the customer what and how much they bought and the update the database,
          //then display the inventory, ask questions
          console.log(
            `Your purchased ${answer.quantity} of ${res[0].product_name}`
          );
          console.log(
            `Your purchase totaled: ${res[0].price * answer.quantity}`
          );
          const sql =
            `UPDATE products SET stock_quantity = ${res[0].stock_quantity - answer.quantity} WHERE id = ${answer.product}`;
          connection.query(sql, function(err, result) {
            if (err) console.log(err);
          });
        }
        customerQuestions();
      });
      
    });
};
