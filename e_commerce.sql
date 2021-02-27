CREATE DATABASE e_commerce;
use e_commerce;

CREATE TABLE accounts (
	lastname varchar(50) NOT NULL,
	username varchar(50) NOT NULL,
    password varchar(50) NOT NULL,
    role varchar(50) NOT NULL
);
INSERT INTO accounts (lastname, username, password, role)
	VALUES ("Gaspard", "user@gmail.com", 123, "user"),
	("Lisa", "admin@gmail.com", "123", "admin");

CREATE TABLE products (
	id INT auto_increment NOT NULL primary key,
	image varchar(500) NOT NULL,
    category varchar(50) NOT NULL,
    name varchar(50) NOT NULL,
    price INT NOT NULL,
    description varchar(50) NOT NULL
);
INSERT INTO products (image, category, name, price, description)
	VALUES ("/./pictures/dumpling_1.jpg", "Dumpling", "Pork Dumpling", 17, ""),
    ("/./pictures/dumpling_2.jpg", "Dumpling", "Mushroom", 15, ""),
    ("/./pictures/dumpling_3.jpg", "Dumpling", "Spring Rolls", 13, ""),
    ("/./pictures/dumpling_4.jpg", "Dumpling", "Veggie", 20, ""),
    ("/./pictures/dumpling_5.jpg", "Dumpling", "Rainbow", 19, ""),
    ("/./pictures/meat_1.jpg", "Meat", "Port Belly", 78, ""),
    ("/./pictures/meat_2.jpg", "Meat", "Gua Bao", 55, ""),
    ("/./pictures/meat_3.jpg", "Meat", "Baked Sea Bass", 210, ""),
    ("/./pictures/meat_4.jpg", "Meat", "Steak", 113, ""),
    ("/./pictures/meat_5.jpg", "Meat", "Rosted Chicken", 103, ""),
    ("/./pictures/veggie_1.jpg", "Veggie", "Baked Sprout", 88, ""),
    ("/./pictures/veggie_2.jpg", "Veggie", "Asparagus", 77, ""),
    ("/./pictures/veggie_3.jpg", "Veggie", "Roasted Carrot", 50, ""),
    ("/./pictures/veggie_4.jpg", "Veggie", "Grilled Eggplant", 50, ""),
    ("/./pictures/veggie_5.jpg", "Veggie", "Roasted Root", 50, ""),
    ("/./pictures/fruit_1.jpg", "Fruit", "Orange", 80, ""),
    ("/./pictures/fruit_2.jpg", "Fruit", "Banana", 80, ""),
    ("/./pictures/fruit_3.jpg", "Fruit", "Apple", 80, ""),
    ("/./pictures/fruit_4.jpg", "Fruit", "Blueberry", 113, ""),
    ("/./pictures/fruit_5.jpg", "Fruit", "Strawberry", 80, ""),
    ("/./pictures/dessert_1.jpg", "Dessert", "Brulee", 180, ""),
    ("/./pictures/dessert_2.jpg", "Dessert", "Orange Cupcake", 250, ""),
    ("/./pictures/dessert_3.jpg", "Dessert", "Crepe Cake",150, ""),
    ("/./pictures/dessert_4.jpg", "Dessert", "Brownies", 110, ""),
    ("/./pictures/dessert_5.jpg", "Dessert", "Sangria Cake", 130, "");

CREATE TABLE cart (
	id INT auto_increment NOT NULL primary key,
	image varchar(50) NOT NULL,
    category varchar(50) NOT NULL,
    name varchar(50) NOT NULL,
    quantity INT NOT NULL,
    price INT NOT NULL
);

CREATE TABLE upload (
	image varchar(50) NOT NULL
);

