var Promise = require('bluebird');
module.exports = function(connection){
	this.search = function(){
		return new Promise(function(resolve, reject){
			connection.query('SELECT * FROM sup WHERE category_name LIKE?', searchVar, function(error, results) {
				if (err) return reject(err);
				resolve(results);
			});
		});
	};

	this.showSuppliers = function(){
		return new Promise(function(resolve, reject){
			connection.query('SELECT DISTINCT Id,shop  FROM suppliers LIMIT 0,6;', [], function(err, results) {
				if (err) return reject(err)
				resolve(results);
			});
		});
	};

	this.add = function(data){
		return new Promise(function(resolve, reject){
			connection.query('insert into suppliers set ?', data, function(err, results) {
				if (err) return reject(err);
				resolve(results);
			});
		});
	};

//This is get for Promises of Category//
this.get = function(id){
	return new Promise(function(resolve, reject){
		connection.query('SELECT shop  FROM suppliers WHERE Id = ?', [id], function(err,rows){
			if (err) return reject(err);
			resolve(results);
		});
	});
};

//This is update for Promises of Category//
this.update = function(data, id){
	return new Promise(function(resolve, reject){
		connection.query('UPDATE suppliers SET ? WHERE Id = ?', [data, id], function(err, rows){
			if (err) return reject(err);
			resolve(results);
		});

	});
};

//This is delete for Promises of Category//
this.delete = function(id){
	return new Promise(function(resolve, reject){
		connection.query('DELETE FROM suppliers WHERE id = ?', [id], function(err,results){	
			if (err) return reject(err);
			resolve(results);
		});
	})
}
};