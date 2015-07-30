SELECT  category_name, no_sold
FROM sales
INNER JOIN products ON sales.product_Id = products.Id
INNER JOIN categories ON products.Category_Id = categories.Id
GROUP BY no_sold, category_name;