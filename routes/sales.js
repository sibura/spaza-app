exports.showSales = function(req, res, next){
 	req.getConnection(function(error, connection){
  			if(error){
  				return next(error);
  			}

			connection.query('SELECT * FROM sales', [], function(error, results) {
			    if (error) return next(error);
				console.log(results);
			    res.render( 'SaleList', {
				sales : results
			    });
			});
  		});
  };