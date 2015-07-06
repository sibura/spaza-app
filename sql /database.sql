CREATE TABLE suppliers
(
    Id int NOT NULL auto_increment primary key,
	shop VARCHAR(255) NOT NULL
);

CREATE TABLE categories 
(
   Id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
   category_name VARCHAR(15)
);

CREATE TABLE products 
(
	Id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
	Category_Id int not NULL,
	product_name VARCHAR(15),
	FOREIGN KEY (category_Id) REFERENCES categories(Id)
);

CREATE TABLE purchases
(
   Id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
   product_Id int NOT NULL,
   cost_price int,
   supplier_ID int,
   FOREIGN KEY (Supplier_Id) REFERENCES suppliers(Id),
   FOREIGN KEY (Product_Id) REFERENCES products(Id)
);

CREATE TABLE sales
(
  Id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  product_Id int NOT NULL,
  date text,
  sale_price int,
  no_sold int,
  FOREIGN KEY (product_Id) REFERENCES products(Id)
);
