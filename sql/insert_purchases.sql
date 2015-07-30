insert into purchases(product_Id, supplier_ID)
SELECT products.Id, suppliers.Id FROM products, suppliers WHERE products.Id = suppliers.Id;