var suplier = require('../routes/supplierPromise');
exports.search = function(req, res, next){
	req.getConnection(function(error, connection){
		var searchVar = req.params.query;
		searchVar = "%" + searchVar + "%";
		//console.log(searchVar);

		var Administrator = req.session.role === "Admin"
		var user = req.session.role !== "Admin"
		var SuppSearch = function(){
			res.render( 'suplistSearch', {
				suppliers : results,
				layout : false,
				isAdmin : Administrator,
				action : user
			});
		});
});
};

exports.showSuppliers = function(req, res, next){
	req.getConnection(function(error, connection){
		var Administrator = req.session.role === "Admin"
		var user = req.session.role !== "Admin"
		var SuppResults = function(results){
			res.render( 'Supplist', {
				suppliers : results,
				isAdmin : Administrator,
				action : user
			});

			var supper = new suplier(connection);
			supper.showSuppliers()
			.then(SuppResults)
			.catch(function(err){
			});
		};
    });
});

exports.add = function (req, res, next) {
	req.getConnection(function(err, connection){

		var input = JSON.parse(JSON.stringify(req.body));
		var data = {
			shop : input.shop
		};
		var AddSupp = function(data, results){
			res.redirect('/Supply');
		};
	});
};

exports.get = function(req, res, next){
	var id = req.params.Id;
	req.getConnection(function(err, connection){
		var getSupplier = function(id){
			res.render('suppliersEdit',{page_title:"Edit Customers - Node.js", data : rows[0]});      
		}; 
	});
};

exports.update = function(req, res, next){

	var data = JSON.parse(JSON.stringify(req.body));
	var id = req.params.Id;
	req.getConnection(function(err, connection){
		var updateSuppl =function(id, results){
			res.redirect('/Supply');
		};

	});
};

exports.delete = function(req, res, next){
	var id = req.params.Id;
	req.getConnection(function(err, connection){
		var deleteSupplir = function(id, results){
			res.redirect('/Supply');
		});
});
};