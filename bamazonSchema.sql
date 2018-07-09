DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  itemID INT NOT NULL AUTO_INCREMENT,
  productName VARCHAR(255) NOT NULL,
  departmentName VARCHAR(255) NOT NULL,
  price DECIMAL (10,2) NOT NULL,
  stockQuantity INT(10) NOT NULL,
  PRIMARY KEY (itemID)
);
SELECT * FROM products;


INSERT INTO products (productName, departmentName, price, stockQuantity)
VALUES ("infant car seat", "Baby", 89.99, 20),
	("Huggies Diapers", "Baby", 24.29, 30),
	("Stand Mixer",	"Kitchen", 254.99, 20),
    ("Pressure Cooker 6qt",	"Kitchen", 99.95, 15),
    ("Electronic Air Fryer", "Kitchen", 99.99, 20),
    ("Downy Liquid Fabric Conditioner",	"Household Essentials",	9.99, 120),
    ("Corner TV Stand 44in", "Furniture", 188.99, 20),
    ("Wood Wall Cabinet-Threshold", "Furniture", 79.99, 10),
    ("Ergobaby Baby Carrier - Black", "Baby", 179.99, 50),
    ("Swissgear 22in Suitcase" , "Home", 169.99, 30); 







