SELECT stock_purchases_csv.quantity, stock_purchases_csv.cost, stock_purchases_csv.date, products.Id AS product_id, suppliers.Id AS supplier_id
FROM stock_purchases_csv, products, suppliers
where suppliers.shop = stock_purchases_csv.shop
and products.product_name = stock_purchases_csv.item
Group by supplier_id 
LIMIT 0 , 30;