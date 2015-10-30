var mysql = require('mysql');
var assert = require('assert');
//var Categry = require('../routes/CatPromises');
var suplier = require('../routes/suplierPromise');


 var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'coder123',
        port: 3306,
        database: 'SpazaApp'
    });
 connection.connect();
// var categorry = new Categry(connection);
 var supper = new suplier(connection);

describe('test the suppliers() ', function(connection){
    it('suppliers should return a specific suppliers', function(done){

        var SuppResults = function(results){
            console.log(results);
            assert.equal(6, results.length);
            done();
        };
        supper.showSuppliers()
        .then(SuppResults)
        .catch(function(err){
            next(err);
         });

//        done();
    });
});