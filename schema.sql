DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
	id INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    department_name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2),
    stock_quantity FLOAT
);