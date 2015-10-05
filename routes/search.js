
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
  		connection.query('SELECT product_name, category_name FROM (SELECT  products.Id,products.product_name, categories.category_name, products.Category_Id FROM products, categories  where products.Category_Id = categories.Id) AS prods_cats WHERE product_name LIKE ? OR category_name LIKE ?', [searchVar,searchVar], function(err, results) {
  			if (err){

         // return next(error);
  				console.log("Error inserting : %s ",err );
        }

        // connection.query('SELECT Id, category_name FROM categories LIKE ?', [searchVar], function(error, results1) {
             //     if (error) return next(error);
        console.log(results);
          res.render('productList', {
             product : results,
              isAdmin: Administrator, 
             action: user
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
      
      connection.query('SELECT products.product_name,date, sale_price, no_sold FROM sales, products WHERE product_name LIKE ?', [sale_search], function(err, results) {
        if (err)
          console.log("Error inserting : %s ",err );
        console.log(sale_search);
        res.render('SaleList', {
           Sale : results,
          isAdmin : Administrator,
          action : user
        });
     // });
    });
  });
};

  exports.Supply_search = function (req, res, next) {
    req.getConnection(function(err, connection){

      var Administrator = req.session.role === "Admin"
      var user = req.session.role !== "Admin"

      if (err){ 
        return next(err);
      }

      var suppl_search = "%" + JSON.parse(JSON.stringify(req.body)).shop  + "%";

      connection.query('SELECT * FROM suppliers WHERE shop LIKE ?', suppl_search, function(err, results) {
        if (err)
          console.log("Error inserting : %s ",err );
        console.log(suppl_search);
        res.render('Supplist', {
          suppliers : results,
          isAdmin: Administrator, 
           action: user 
        });
      });
    });
  };