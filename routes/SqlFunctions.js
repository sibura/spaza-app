 exports.showProducts = function(req, res, next){
  		req.getConnection(function(error, connection){
  			
		var Administrator = req.session.role === "Admin"
		var user = req.session.role !== "Admin"
  				
  			if(error){
  				return next(error);

  			}

			connection.query('SELECT  products.Id,products.product_name, categories.category_name, products.Category_Id FROM products, categories  where products.Category_Id = categories.Id;', [], function(error, results) {
			    if (error) return next(error);
			connection.query('SELECT Id, category_name FROM categories', [], function(error, results1) {
                 if (error) return next(error);
                 
				console.log(Administrator);
			    res.render( 'productList', {
				product : results,
				categories: results1,
				 in_ca: Administrator, 
                 action: user
			    });
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
            		product_name : input.product_name,
            		Category_Id : input.Category_Id
            		
        	};
		connection.query('insert into products set ?', data, function(err, results) {
        		if (err)
              			console.log("Error inserting : %s ",err );
         
          		res.redirect('/products');
      		});
	});
};

exports.get = function(req, res, next){
	var Id = req.params.Id;
	req.getConnection(function(err, connection){
		connection.query('SELECT * FROM products WHERE Id = ?', [Id], function(err,rows){
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
          		res.redirect('/products');
    		});
    		
    });
};

exports.delete = function(req, res, next){
	var Id = req.params.Id;
	req.getConnection(function(err, connection){
		connection.query('DELETE FROM products WHERE Id = ?', [Id], function(err,rows){
			if(err){
		         //alert("Are You sure You Want To delete This Product?");
    				console.log("Error Selecting : %s ",err );
			}
			res.redirect('/products');
		});
	});
};