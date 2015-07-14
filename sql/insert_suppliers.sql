
--joining suppliers and products table to get the foreign keys........

insert into suppliers (shop)

SELECT stock_purchases_csv.shop FROM stock_purchases_csv, suppliers WHERE stock_purchases_csv.shop = suppliers.shop