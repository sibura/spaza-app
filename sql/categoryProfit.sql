SELECT category_name, SUM(no_sold) AS profit
FROM sales
INNER JOIN products ON sales.product_Id = products.Id
INNER JOIN categories ON products.Category_Id = categories.Id
GROUP BY no_sold, category_name
LIMIT 0 , 30