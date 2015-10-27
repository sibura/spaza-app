var Promise = require('bluebird');
module.exports = function(connection){
	this.search = function(){
		return new Promise(function(resolve, reject){
			connection.query('SELECT * FROM categories WHERE category_name LIKE?', searchVar, function(error, results) {
				if (err) return reject(err);
				resolve(results);
			});
		});
	};

	this.categorl = function(){
		return new Promise(function(resolve, reject){
			connection.query('SELECT * FROM categories',  function(err, results){
				if (err) return reject(err);
				resolve(results);
			});
		});
	};

	this.add = function(data){
		return new Promise(function(resolve, reject){
			connection.query('insert into categories set ?', data, function(err, results){
				if (err) return reject(err);
				resolve(results);
			});
		});
	};

//This is get for Promises of Category//
this.get = function(id){
	return new Promise(function(resolve, reject){
		connection.query('SELECT * FROM categories WHERE Id = ?', [id], function(err,results){
			if (err) return reject(err);
			resolve(results);
		});
	});
};

//This is update for Promises of Category//
this.update = function(data, id){
	return new Promise(function(resolve, reject){
		connection.query('UPDATE categories SET ? WHERE Id = ?', [data, id], function(err, results){
			if (err) return reject(err);
			resolve(results);
		});

	});
};

//This is delete for Promises of Category//
this.delete = function(id){
	return new Promise(function(resolve, reject){
		connection.query('DELETE FROM categories WHERE id = ?', [id], function(err,results){	
			if (err) return reject(err);
			resolve(results);
		});
	})
}
};
//closing module.exports ///