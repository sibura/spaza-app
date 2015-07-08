INSERT INTO categories (category_name) VALUES ("Dairy Products"),
INSERT INTO categories (category_name) VALUES ("Bakery Products"),
INSERT INTO categories (category_name) VALUES ("Can Food"),
INSERT INTO categories (category_name) VALUES ("Cosmetics"),
INSERT INTO categories (category_name) VALUES ("Soup"),
INSERT INTO categories (category_name) VALUES ("Confectionaries"),
INSERT INTO categories (category_name) VALUES ("Valentine Goodies"),
INSERT INTO categories (category_name) VALUES ("Bulk"),
INSERT INTO categories (category_name) VALUES ("Fruits"),
INSERT INTO categories (category_name) VALUES ("Cold Beverages");

--- insert scripts that will create Products linked to their Categories --
/*
INSERT INTO products (category_Id)
SELECT Id
FROM categories;
*/

INSERT INTO products (category_Id, product_name) values (1, 'Milk 1l'),
INSERT INTO products (category_Id, product_name) values (1,'Imasi'),
INSERT INTO products (category_Id, product_name) values (2, 'Bread'),
INSERT INTO products (category_Id, product_name) values (3,'Chakalaka Can'),
INSERT INTO products (category_Id, product_name) values (3, 'Gold Dish Vegetable Curry Can'),
INSERT INTO products (category_Id, product_name) values (10, 'Fanta 500ml'),
INSERT INTO products (category_Id, product_name) values (10, 'Coke 500ml'),
INSERT INTO products (category_Id, product_name) values (10, 'Cream Soda 500ml'),
INSERT INTO products (category_Id, product_name) values (8, 'Iwisa Pap 5kg'),
INSERT INTO products (category_Id, product_name) values (5, 'Top Class Soy Mince'),
INSERT INTO products (category_Id, product_name) values (4, 'Shampoo 1 litre'),
INSERT INTO products (category_Id, product_name) values (4, 'Soap Bar'),
INSERT INTO products (category_Id, product_name) values (9, 'Bananas - loose'),
INSERT INTO products (category_Id, product_name) values (9, 'Apples - loose'),
INSERT INTO products (category_Id, product_name) values (6, 'Mixed Sweets 5s'),
INSERT INTO products (category_Id, product_name) values (7, 'Heart Chocolates'),
INSERT INTO products (category_Id, product_name) values (7, 'Rose (plastic)'),
INSERT INTO products (category_Id, product_name) values (7, 'Valentine Cards');

INSERT INTO suppliers (shop) VALUES ("Makro");
INSERT INTO suppliers (shop) VALUES ("Epping Market");
INSERT INTO suppliers (shop) VALUES ("HomeMade");
INSERT INTO suppliers (shop) VALUES ("China Town");
INSERT INTO suppliers (shop) VALUES ("Joe Spaza Shop");


/*INSERT INTO sales (product_Id, sales_price, no_sold) values (1, 10.00, ),
INSERT INTO sales (product_Id, sales_price, no_sold) values (),
INSERT INTO sales (product_Id, sales_price, no_sold) values (),
INSERT INTO sales (product_Id, sales_price, no_sold) values (),
INSERT INTO sales (product_Id, sales_price, no_sold) values (),
INSERT INTO sales (product_Id, sales_price, no_sold) values (),*/

