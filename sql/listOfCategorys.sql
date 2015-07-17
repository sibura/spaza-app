SELECT  categories.category_name, sum(sales.no_sold)
FROM sales
INNER JOIN products ON sales.product_Id = products.Id
INNER JOIN categories ON products.Category_Id = categories.Id
GROUP BY categories.category_name
ORDER BY sum(sales.no_sold)  LIMIT 0, 30; 