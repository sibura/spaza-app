var mysql = require('mysql');
var assert = require('assert');
var Categry = require('../routes/CatPromises');

//
 var connection = mysql.createConnection({
    	host: 'localhost',
    	user: 'root',
    	password: 'coder123',
    	port: 3306,
    	database: 'SpazaApp'
    });
 connection.connect();
 var categorry = new Categry(connection);
 describe('test the categories', function(connection){
    // Uncomment the line below and create a connection to your mysql database
    it('categorl should return a specific categories', function(done){
    	
    	var catResults = function(results){
    		console.log(results);
    		assert.equal[{ id: 1, category_name: 'Dairy Products' }, results];
    		done();
    	};
    	categorry.categorl()
    	.then(catResults)
    	.catch(function(err){
    		console.log(err);

    	});
    });
});
