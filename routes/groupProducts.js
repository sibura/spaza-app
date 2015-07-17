exports.showProdsgroup = function(req, res, next){
 		req.getConnection(function(error, connection){
  			if(error){
  				return next(error);
  			}

	 		connection.query('SELECT products.product_name, SUM(no_sold) AS total FROM products, sales WHERE products.Id = sales.product_Id GROUP BY products.product_name', [], function(error, results) {
			    if (error) return next(error);
				console.log(results);
			    res.render( 'Products_Group', {
				GroupOfproducts : results
			    });
			});
  		});
  }

  /*connection.query('SELECT products.product_name, SUM(no_sold) AS total FROM products, sales WHERE products.Id = sales.product_Id GROUP BY products.product_name', [], function(error, results) {
			    if (error) return next(error);
				connection.query('SELECT products.product_name, SUM(no_sold) AS total FROM products, sales WHERE products.Id = sales.product_Id GROUP BY products.product_name', [], function(error, result1) {
			    if (error) return next(error);
				res.render( 'Products_Group', {
				GroupOfproducts : result1
			    });
});

})
  } 
  console.log(results, results1);
})*/