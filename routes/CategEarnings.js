exports.EarningsCateg = function(req, res, next){
	req.getConnection(function(error, connection){
		if(error){
			return next(error);
		}

		connection.query('SELECT category_name, sum(no_Sold) as total_sold FROM products, categories, sales  WHERE products.Id = sales.product_Id AND categories.Id = products.Category_Id GROUP BY category_name ORDER BY total_sold DESC;', [], function(error, results) {
			if (error) {
				return next(error);
			}
			console.log(results);
			res.render('EarningsCatego', {
				EarningsPerCatego : results
			});
		});
	});
};