select product_name, sum(no_sold) as totalqty
from sales
inner join products
on sales.product_Id=products.Id
group by product_name
order by sum(no_sold) ASC