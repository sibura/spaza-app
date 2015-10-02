  exports.Prods_search = function (req, res, next) {
  	req.getConnection(function(err, connection){

      var Administrator = req.session.role === "Admin"
      var user = req.session.role !== "Admin"

  		if (err){ 
  			return next(err);
  		}

  		var searchVar = "%" + JSON.parse(JSON.stringify(req.body)).product_name  + "%";
      console.log(searchVar);

      // how do we get parameters from a form?  		
  		connection.query('SELECT * FROM products FROM products WHERE product_name LIKE  '%' OR category_name LIKE  '%'', [searchVar], function(err, results) {
  			if (err){

         // return next(error);
  				console.log("Error inserting : %s ",err );
        }

        // connection.query('SELECT Id, category_name FROM categories LIKE ?', [searchVar], function(error, results1) {
             //     if (error) return next(error);
        console.log(results);
          res.render('productList', {
            product : results,
            categories: results,
            isAdmin: Administrator, 
            action: user
            // categories: results1
          });
       //});
    });
  });
  };

  //This Searches The Categories {{#Cat}}
    exports.Category_search = function (req, res, next) {
    req.getConnection(function(err, connection){

      var Administrator = req.session.role === "Admin"
      var user = req.session.role !== "Admin"

      if (err){ 
        return next(err);
      }

      var cat_search = "%" + JSON.parse(JSON.stringify(req.body)).category_name  + "%";

      connection.query('SELECT * FROM categories WHERE category_name LIKE ?', cat_search, function(err, results) {
        if (err)
          console.log("Error inserting : %s ",err );
        console.log(cat_search);
        res.render('CatList', {
          category : results,
          isAdmin: Administrator, 
           action: user 
        });
      });
    });
  };

  //this searches Sales
   exports.Sales_search = function (req, res, next) {
    req.getConnection(function(err, connection){
      var Administrator = req.session.role === "Admin"
      var user = req.session.role !== "Admin"
      if (err){ 
        return next(err);
      }

      var sale_search = "%" + JSON.parse(JSON.stringify(req.body)).product_name + "%";
      
      connection.query('SELECT sales.Id,products.product_name, date, sale_price, no_sold FROM sales, products WHERE products.Id=sales.product_Id LIKE ?', sale_search, function(err, results) {
        if (err)
          console.log("Error inserting : %s ",err );
        console.log(sale_search);
         //connection.query('SELECT product_name FROM products', [], function(error, results2) {
        //if (error) return next(error);
        res.render('SaleList', {
          Sale : results,
          products : results,
          isAdmin : Administrator,
          action : user
        });
     // });
    });
  });
};
