exports.showSales = function(req, res, next){
	req.getConnection(function(error, connection){
		if(error){
			return next(error);
		}
		connection.query('SELECT products.product_name, sale_price, no_sold FROM sales, products WHERE products.Id=sales.product_Id order by sales.Id', [], function(error, results) {
			if (error) return next(error);
			connection.query('SELECT product_name FROM products', [], function(error, results2) {
				if (error) return next(error);
				console.log(results2);
				res.render( 'SaleList', {
					Sale : results,
					products : results2
				});
			});
		});
	});
};

exports.add = function (req, res, next) {
		req.getConnection(function(err, connection){
			if (err){
				return next(err);
			}
			var input = JSON.parse(JSON.stringify(req.body));
			var data = {
						product_name : input.product_name,
						sale_price : input.sale_price,
						no_sold : input.no_sold
			};
			connection.query('insert into sales set ?', data, function(err, results) {
				if (err)
					console.log("Error inserting : %s ",err );
				res.redirect('/Sale');
			});
		});
	};
exports.get = function(req, res, next){
	var Id = req.params.Id;
	req.getConnection(function(err, connection){
		connection.query('SELECT date, sale_price, no_sold FROM sales WHERE Id = ?', [Id], function(err,rows){
			if(err){
    				console.log("Error Selecting : %s ",err );
			}
			res.render('salesEdit',{page_title:"Edit Customers - Node.js", data : rows[0]});      
		}); 
	});
};

exports.update = function(req, res, next){

	var data = JSON.parse(JSON.stringify(req.body));
    	var Id = req.params.Id;
    	req.getConnection(function(err, connection){
    		connection.query('UPDATE sales SET ? WHERE Id = ?', [data, Id], function(err, rows){
    			if (err){
              			console.log("Error Updating : %s ",err );
    			}
          		res.redirect('/Sale');
    		});
    		
    });
};

exports.delete = function(req, res, next){
	var Id = req.params.Id;
	req.getConnection(function(err, connection){
		connection.query('DELETE FROM sales WHERE Id = ?', [Id], function(err,rows){
			if(err){
    				console.log("Error Selecting : %s ",err );
			}
			res.redirect('/Sale');
		});
	});
};