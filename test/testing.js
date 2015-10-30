var mysql = require('mysql');
var assert = require('assert');
var Categry = require('../routes/CatPromises');



 var connection = mysql.createConnection({
    	host: 'localhost',
    	user: 'root',
    	password: 'coder123',
    	port: 3306,
    	database: 'SpazaApp'
    });
 connection.connect();
 var categorry = new Categry(connection);
 //var supper = new suplier(connection);

 describe('test the categories', function(connection){

    // it('should find all categories', function (done) {
    //   categorry
    //   .categorl()
    //     .done(function(results){
    //         console.log(results);
    //         assert.equal(11, results.length);
    //         done();
    //     })
    // });

    it('search() should search a specific categories', function(done){
        
        var searching = function(){
            var searchVar = req.params.query;
            searchVar = "%" + searchVar + "%";
            console.log("search() should search a specific categories");
            assert.equal(results);
            done();
        };
        categorry.search()
        .then(searching)
        .catch(function(err){
        });
        done();
    });

    
    it('categorl() should return a specific categories', function(done){
    	
    	var catResults = function(results){
    		console.log(results);
            console.log("categorl() should return a specific categories");
    		assert.equal(11, results.length);
    		done();
    	};
    	categorry.categorl()
    	.then(catResults)
    	.catch(function(err){
            done(err);
    	});
        
    });
   
    it('add()', function(done){
      var data = {category_nam: "ubusi"};
      var CatAdd = function( results){
        done();
        console.log("results", results);
        console.log("add()", results);
        assert.equal(11,results.length, data)
        done();
    };

    categorry.add(data)
    .then(CatAdd)
    .catch(function(err){
        //console.log(err);     
    });
    done();
});

    it('get should get a specific categories', function(done){
        var cats = {Id: 1, category_name: 'Dairy Products'};
        var Catget = function(results){
            var category = results[0]
            assert.equal(category.category_name, "Dairy Products");
            done();
        };

        categorry
            .get(1)
            .then(Catget)
            .catch(function(err){

                console.log(err);
                done(err);    
            });
        
    })


    it('update() should update a specific categories', function(done){
        var UpdCateg = function(results){
            assert.equal(results);
             done();
        };

        categorry.update()
        .then(UpdCateg)
        .catch(function(err){

            //console.log("update() should update a specific categories");
           // console.log(err);
            done();(err);
        });
        
    });

});