exports.LeastCat = function(req, res, next){
	req.getConnection(function(error, connection){
		if(error){
			return next(error);
		}

		connection.query('SELECT  categories.category_name, sum(sales.no_sold) as total FROM sales INNER JOIN products ON sales.product_Id = products.Id INNER JOIN categories ON products.Category_Id = categories.Id GROUP BY categories.category_name ORDER BY sum(sales.no_sold) ASC LIMIT 0,1;', [], function(error, results) {
			if (error) {
				return next(error);
			}
			console.log(results);
			res.render('least_popcateg', {
				LeastPopularCategory : results
			});
		});
	});
};