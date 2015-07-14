--joining the sales and products tafile
SELECT sales.no_sold, products.product_name
FROM sales
INNER JOIN products
ON sales.product_Id=products.Id;


--group by


--sum it up