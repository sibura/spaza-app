SELECT stock_item, sales_price, cost As prfit
FROM sales_csv
INNER JOIN stock_purchases_csv ON stock_item = stock_purchases_csv.item
GROUP BY stock_item, sales_price, cost
LIMIT 0 , 30