var Categry = require('../routes/CatPromises');
exports.search = function(req, res, next){
	req.getConnection(function(error, connection){
	
		var searchVar = req.params.query;
		searchVar = "%" + searchVar + "%";
		//console.log(searchVar);

		var Administrator = req.session.role === "Admin"
		var user = req.session.role !== "Admin"
		var searching = function(results){
			res.render( 'category', {
				category : results,
				isAdmin : Administrator,
				layout: false,
				action : user
			});

			var Searcher = new Categry(connection);
			Searcher.search()
			.then(searching)
			.catch(function(err){
				next(err);
			});
		}
	});
};

exports.showCategorys = function(req, res, next){
	req.getConnection(function(error, connection){
		var Administrator = req.session.role === "Admin"
		var user = req.session.role !== "Admin"
		var catResults = function(results){
			res.render( 'CatList', {
				category : results,
				isAdmin : Administrator,
				action : user
			});
		};
		var categorry = new Categry(connection);
		categorry.categorl()
		.then(catResults)
		.catch(function(err){
			next (err);
		});
	});
};

exports.add = function (req, res, next) {
	req.getConnection(function(err, connection){	
		var input = JSON.parse(JSON.stringify(req.body));
		var data = {
			category_name : input.category_name};
			var CatAdd = function(results){
				res.redirect('/CatList')
			};
			var addCat = new Categry(connection);
			addCat.add(data)
			.then(CatAdd)
			.catch(function(err){
				next(err);
			});
		});
};

exports.get = function(req, res, next){
	var id = req.params.Id;
	req.getConnection(function(err, connection){
		var Catget = function(id){
			res.render('categoryEdit',{page_title:"Edit Customers - Node.js", data : rows[0]});      
		};
		var getCat = new Categry(connection);
		getCat.get(id)
		.then(Catget)
		.catch(function(err){
			next(err);
		});
	}); 
 };

 exports.update = function(req, res, next){
 	var data = JSON.parse(JSON.stringify(req.body));
 	var id = req.params.Id;
 	req.getConnection(function(err, connection){
 		var UpdCateg = function(data, id){
 			res.redirect('/CatList');

 		};
 		var CatUpdte = new Categry(connection);
 		CatUpdte.update(data, id)
 		.then(UpdCateg)
 		.catch(function(err){
 			next(err);
 		});
 	});

 };

 exports.delete = function(req, res, next){
 	var id = req.params.Id;
 	req.getConnection(function(err, connection){
 		var DeltCateg = function(id){
 			res.redirect('/CatList');

 		};
 		var CatDelete = new Categry(connection);
 		CatDelete.delete(id)
 		.then(DeltCateg)
 		.catch(function(err){
 			next(err);
 		});
 	});
 }