select sum(no_sold) as totalqty, product_name
from sales
inner join products
on sales.product_Id=products.Id
group by product_name
order by sum(no_sold) DESC
LIMIT 0, 1