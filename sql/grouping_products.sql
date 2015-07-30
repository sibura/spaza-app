SELECT products.product_name, SUM( sales.no_sold ) AS total
FROM products, sales
WHERE products.Id = sales.product_Id
GROUP BY products.product_name;