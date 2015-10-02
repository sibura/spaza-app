exports.showCategorys = function(req, res, next){
 	req.getConnection(function(error, connection){
 		var Administrator = req.session.role === "Admin"
		var user = req.session.role !== "Admin"

  			if(error){
  				return next(error);
  			}

			connection.query('SELECT * FROM categories', [], function(error, results) {
			    if (error) return next(error);
				console.log(results);
			    res.render( 'CatList', {
				category : results,
				isAdmin : Administrator,
				action : user
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
            		category_name : input.category_name,
        	};
		connection.query('insert into categories set ?', data, function(err, results) {
        		if (err)
	      			console.log("Error inserting : %s ",err );
         
          		res.redirect('/CatList');
      		});
	});
};

exports.get = function(req, res, next){
	var id = req.params.Id;
	req.getConnection(function(err, connection){
		connection.query('SELECT * FROM categories WHERE Id = ?', [id], function(err,rows){
			if(err){
    				console.log("Error Selecting : %s ",err );
			}
			res.render('categoryEdit',{page_title:"Edit Customers - Node.js", data : rows[0]});      
		}); 
	});
};

exports.update = function(req, res, next){

	var data = JSON.parse(JSON.stringify(req.body));
    	var id = req.params.Id;
    	req.getConnection(function(err, connection){
    		connection.query('UPDATE categories SET ? WHERE Id = ?', [data, id], function(err, rows){
    			if (err){
              			console.log("Error Updating : %s ",err );
    			}
          		res.redirect('/CatList');
    		});
    		
    });
};

exports.delete = function(req, res, next){
	var id = req.params.Id;
	req.getConnection(function(err, connection){
		connection.query('DELETE FROM categories WHERE id = ?', [id], function(err,rows){
			if(err){
    				console.log("Error Selecting : %s ",err );
			}
			res.redirect('/CatList');
		});
	});
};