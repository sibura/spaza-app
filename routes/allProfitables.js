exports.profitableProdz = function(req, res, next){
	req.getConnection(function(error, connection){
		if(error){
			return next(error);
		}

		connection.query('SELECT stock_item, sales_price, cost As profit FROM sales_csv INNER JOIN stock_purchases_csv ON stock_item = stock_purchases_csv.item GROUP BY stock_item, sales_price, cost LIMIT 0 , 30', [], function(error, results) {
			if (error) {
				return next(error);
			}
			console.log(results);
			res.render('allProfitables', {
				profitable : results
			});
		});
	});
};