select products.product_name, SUM(sales.sale_price * sales.no_sold) as earningPerProduct
from sales
inner join products
on sales.product_Id = products.Id
group by product_name order by SUM(sales.sale_price) ASC;

limit 0,1