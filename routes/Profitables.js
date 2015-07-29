exports.MostProfits = function(req, res, next){
 	req.getConnection(function(error, connection){
  			if(error){
  				return next(error);
  			}
			connection.query('SELECT stock_item, sales_price, cost FROM sales_csv INNER JOIN stock_purchases_csv ON stock_item = stock_purchases_csv.item GROUP BY stock_item, sales_price, cost LIMIT 0 , 30', [], function(error, results) {
			    if (error) return next(error);
			    console.log(results);
			    res.render( 'ProfitsProduct', {
				MostProft : results,
		    });

  		});

    });  
  }
    exports.add = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err){ 
			return next(err);
		}
		
			var input = JSON.parse(JSON.stringify(req.body));
			var data = {
	            		stock_item : input.stock_item,	
	            		sale_price : input.sale_price,
	            		cost : input.cost	
	            }
		connection.query('insert into products set ?', data, function(err, results) {
        		if (err)
              			console.log("Error inserting : %s ",err );
         
          		res.redirect('/Profitables');
      		});
	});
};

exports.get = function(req, res, next){
	var Id = req.params.Id;
	req.getConnection(function(err, connection){
		connection.query('SELECT stock_item, sales_price, cost FROM sales_csv WHERE Id = ?', [Id], function(err,rows){
			if(err){
    				console.log("Error Selecting : %s ",err );
			}
			res.render('productsEdit',{page_title:"Edit Customers - Node.js", data : rows[0]});      
		}); 
	});
};

exports.update = function(req, res, next){

	var data = JSON.parse(JSON.stringify(req.body));
    	var Id = req.params.Id;
    	req.getConnection(function(err, connection){
    		connection.query('UPDATE products SET ? WHERE Id = ?', [data, Id], function(err, rows){
    			if (err){
              			console.log("Error Updating : %s ",err );
    			}
          		res.redirect('/Profitables');
    		});
    		
    });
};

exports.delete = function(req, res, next){
	var Id = req.params.Id;
	req.getConnection(function(err, connection){
		connection.query('DELETE FROM sales_csv WHERE Id = ?', [Id], function(err,rows){
			if(err){
    				console.log("Error Selecting : %s ",err );
			}
			res.redirect('/Profitables');
		});
	});
};
