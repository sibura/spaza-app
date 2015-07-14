select distinct category_name, SUM(no_sold)
from categories, sales
inner join  products
on categories.Id=products.category_Id and sales.Id= products.Id
group by category_name;