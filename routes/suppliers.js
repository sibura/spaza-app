exports.showSuppliers = function(req, res, next){
	req.getConnection(function(error, connection){
		if(error){
			return next(error);
		}
			connection.query('SELECT Id, shop  FROM suppliers', [], function(error, results) {
				if (error) return next(error);
				console.log(results);
				res.render( 'Supplist', {
					suppliers : results
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
            		shop : input.shop
        	};
		connection.query('insert into suppliers set ?', data, function(err, results) {
        		if (err)
              			console.log("Error inserting : %s ",err );
         
          		res.redirect('/Supply');
      		});
	});
};

exports.get = function(req, res, next){
	var id = req.params.Id;
	req.getConnection(function(err, connection){
		connection.query('SELECT shop  FROM suppliers WHERE Id = ?', [id], function(err,rows){
			if(err){
    				console.log("Error Selecting : %s ",err );
			}
			res.render('suppliersEdit',{page_title:"Edit Customers - Node.js", data : rows[0]});      
		}); 
	});
};

exports.update = function(req, res, next){

	var data = JSON.parse(JSON.stringify(req.body));
    	var id = req.params.Id;
    	req.getConnection(function(err, connection){
    		connection.query('UPDATE suppliers SET ? WHERE Id = ?', [data, id], function(err, rows){
    			if (err){
              			console.log("Error Updating : %s ",err );
    			}
          		res.redirect('/Supply');
    		});
    		
    });
};

exports.delete = function(req, res, next){
	var id = req.params.Id;
	req.getConnection(function(err, connection){
		connection.query('DELETE FROM suppliers WHERE Id = ?', [id], function(err,rows){
			if(err){
    				console.log("Error Selecting : %s ",err );
			}
			res.redirect('/Supply');
		});
	});
};