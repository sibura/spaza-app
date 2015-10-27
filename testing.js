var mysql = require('mysql');
var assert = require('assert');
var Categg = require('../CatPromises');

describe('test the Categories', function(){
    // Uncomment the line below and create a connection to your mysql database
    var connection = mysql.createConnection({
    	host: 'localhost',
    	user: 'root',
    	password: 'coder123',
    	port: 3306,
    	database: 'SpazaApp'
    });

    it('sqlcategory should return a specific categories', function(done){
    	var Categg = new categg(connection);
    	Categg.CatPromises(2, function(err, categories) {
        //console.log("me " + products);
        assert.equal('Dairy Products', categories.category_name);
        done();
    });
    });