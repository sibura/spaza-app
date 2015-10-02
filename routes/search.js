  exports.Prods_search = function (req, res, next) {
  	req.getConnection(function(err, connection){
  		if (err){ 
  			return next(err);
  		}

  		var searchVar = "%" + req.params.value  + "%";
  		
  		connection.query('SELECT  products.Id,products.product_name, categories.category_name, products.Category_Id FROM products, categories  where products.Category_Id = categories.Id LIKE ?', [searchVar], function(err, results) {
  			if (err)
  				console.log("Error inserting : %s ",err );
        console.log(searchVar);
        res.render('searchProducts', {
          Prdsearch : results
        });
      });
    });
  };

  //This Searches The Categories {{#Cat}}
    exports.Category_search = function (req, res, next) {
    req.getConnection(function(err, connection){
      if (err){ 
        return next(err);
      }

      var cat_search = "%" + req.params.value  + "%";

      connection.query('SELECT * FROM categories WHERE category_name LIKE ?', cat_search, function(err, results) {
        if (err)
          console.log("Error inserting : %s ",err );
        console.log(cat_search);
        res.render('searchCateg', {
          Catsearch : results
        });
      });
    });
  };

  //this searches Sales
   exports.Sales_search = function (req, res, next) {
    req.getConnection(function(err, connection){
      if (err){ 
        return next(err);
      }

      var sale_search = "%" + req.params.value  + "%";
      
      connection.query('SELECT * FROM sales WHERE Id LIKE ?', sale_search, function(err, results) {
        if (err)
          console.log("Error inserting : %s ",err );
        console.log(sale_search);
        res.render('Sales_searcher', {
          search_sale : results
        });
      });
    });
  };