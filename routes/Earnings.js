exports.EarningsPro = function(req, res, next){
	req.getConnection(function(error, connection){
		if(error){
			return next(error);
		}

		connection.query('select products.product_name, SUM(sales.sale_price * sales.no_sold) as earningPerProduct from sales inner join products on sales.product_Id = products.Id group by product_name order by SUM(sales.sale_price) DESC;', [], function(error, results) {
			if (error) {
				return next(error);
			}
			console.log(results);
			res.render('Earnings', {
				EarningsPerProd : results
			});
		});
	});
};