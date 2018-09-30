# bamazon


For this assignment, we were instructed to use MYSQL database to hold a table called products, with 5 properties (primary key id, product mane, department name, price and quantity.

I populated the database with 10 different items and then created a node.js application that initially displayed the inventory of the bamazon database. The customer was then prompted to choose an item (by id) and then was asked how many they would like to purchase. If the inventory was too low, they got a message stating insufficient inventory (and the amount avaliable) and then they were asked to choose again. If the inventory could be fulfilled, the console stated the total of their purchase, and then the inventory was update in the database. Please see below for screen shots of the app.

Customer View:

https://github.com/thomwint/bamazon/issues/2#issue-365183218

The application does not end and this includes future development ideas:

Ending application once use requests, displaying the inventory if the user requests, providing better client experience with insufficient inventory.
