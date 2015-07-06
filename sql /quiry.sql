/*joining sales table & products table using...*/


insert into sales (product_Id, no_sold, date, sale_price)
SELECT products.Id, sales_csv.no_sold, date, sales_csv.sales_price FROM sales_csv, products WHERE sales_csv.stock_item = products.product_name;

--joining suppliers and products table to get the foreign keys........

insert into suppliers (shop)

SELECT stock_purchases_csv.shop FROM stock_purchases_csv, suppliers WHERE stock_purchases_csv.shop = suppliers.shop