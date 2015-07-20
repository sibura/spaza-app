  exports.add = function(req, res, next){
  		req.getConnection(function(error, connection){
  			if(error){
  				return next(error);
  			}

			connection.query('SELECT * FROM products', [], function(error, results) {
			    if (error) return next(error);
				console.log(results);
			    res.render( 'productList', {
				product : results
			    });
			});
  		});
  }

  exports.showProducts = function(req, res, next){
  		req.getConnection(function(error, connection){
  			if(error){
  				return next(error);
  			}

			connection.query('SELECT * FROM products', [], function(error, results) {
			    if (error) return next(error);
				console.log(results);
			    res.render( 'productList', {
				product : results
			    });
			});
  		});
  }