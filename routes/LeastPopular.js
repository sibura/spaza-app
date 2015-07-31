exports.LeastProds = function(req, res, next){
	req.getConnection(function(error, connection){
		if(error){
			return next(error);
		}

		connection.query('SELECT product_name, sum(no_sold) as totalqty FROM sales inner join products where sales.product_Id=products.Id group by product_name order by sum(no_sold) ASC LIMIT 0, 1', [], function(error, results) {
			if (error) {
				return next(error);
			}
			console.log(results);
			res.render('LeastPopular', {
				Popularprod : results
			});
		});
	});
};