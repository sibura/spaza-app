select  sum(no_sold) as totalqty, category_name
from sales, categories 
inner join products
on sales.products_Id=products.Category_Id
group by category_name