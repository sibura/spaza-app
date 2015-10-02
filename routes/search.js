exports.get = function(req, res, next){
	var Id = req.params.Id;
	req.getConnection(function(err, connection){
		connection.query('SELECT product_name from products where product_name like "%'+req.query.key+'%"', [Id], function(err,rows){
			if(err){
				console.log("Error Selecting : %s ",err );
			}
			res.render('products',{page_title:"Edit Customers - Node.js", data : rows[0]});      
		}); 
	});
};