 //var express = require('express');
 //var app = express()
 var express = require('express');
 var exphbs  = require('express-handlebars');
 var mysql = require('mysql'),
	bodyParser = require('body-parser'),
    myConnection = require('express-myconnection');
var sqlfunctions = require('./routes/SqlFunctions');
var sqlcategory = require('./routes/sqlcategory');
var sqlsupp = require('./routes/suppliers');
var sqlsales = require('./routes/sales');
var ListOfProdz = require('./routes/groupProducts');
var ListOfCat = require('./routes/listOfCateg');
var mostPopul = require('./routes/mostPoP');
var MostPoPCat = require('./routes/most_popCateg');

	var dbOptions = {
	     host: 'localhost',
	      user: 'root',
	      password: 'nwabisamilisantmasiko',
	      port: 3306,
	      database: 'SpazaApp'
	};

   // create a route
   var app = express();
   app.use(myConnection(mysql, dbOptions, 'single'));
   app.engine('handlebars', exphbs({defaultLayout: 'main'}));
   app.set('view engine', 'handlebars');
   app.use(bodyParser.urlencoded({ extended: false }));
   app.use(bodyParser.json());
   var fs = require('fs');

   //var products = require('./most_popular_products')

   //var products = require('./least_popular_products')
   //var sortedList = products.productNames('Nelisa  Sales History.csv');

   var Products = require('./most_popular_products');
   var products = new Products();
   var productList = products.productNames('./Nelisa Sales History.csv');

   var groupedProducts = products.groupItems(productList);
   var mostPopular = products.mostpopularproducts(groupedProducts);
   var leastPopular = products.leastpopularproducts(groupedProducts);


   var group = products.groupCateg(productList);
   var mostPopularCateg = products.mostPopularCtg(group);
   var leastpopularCateg = products.leastPopularCtg(group);
   
   var prodctEarnings = products.earningsPerProduct(productList);
   var CategEarnings = products.earningsCategory(productList);

   
  var earningsPerProduct = products.earningsPerProduct(productList);
  var mostProfitableproductResuts = products.mostProfitableproduct(earningsPerProduct);
  // console.log("Profitable Product" + JSON.stringify(mostProfitableproductResuts));

  var group = products.groupCateg(productList);
  var mostPopularCateg = products.mostPopularCtg(group);
  var leastpopularCateg = products.leastPopularCtg(group);

  var prodctEarnings = products.earningsPerProduct(productList);
  var CategEarnings = products.earningsCategory(productList);
   
  var profitables = products.earningsPerProduct(productList);
  var ProfitableProduct = products.mostProfitableproduct(profitables);
  
  var earningsCategoryResults = products.earningsCategory(productList);
  var ProfitableCategory = products.mostProfitableCategory(earningsCategoryResults);
  
  //products
  app.get('/products', sqlfunctions.showProducts);

	app.get('/products', sqlfunctions.showProducts);
  app.get('/products/edit/:Id', sqlfunctions.get);
  app.post('/products/edit/:Id', sqlfunctions.update);
  app.post('/products/add', sqlfunctions.add);
  //this should be a post but this is only an illustration of CRUD - not on good practices
  app.get('/products/delete/:Id', sqlfunctions.delete);
  
  //categories
  app.get('/CatList', sqlcategory.showCategorys);

  app.get('/showCat', sqlcategory.showCategorys);
  //app.get('/showCat', sqlcategory.showSuppliers);
  app.get('/showCat/edit/:Id', sqlcategory.get);
  app.post('/showCat/edit/:Id', sqlcategory.update);
  app.post('/showCat/update/:Id', sqlcategory.update);
  app.post('/showCat/add', sqlcategory.add);
  //this should be a post but this is only an illustration of CRUD - not on good practices
  app.get('/showCat/delete/:Id', sqlcategory.delete);



 //suppiers
  app.get('/Supplist', sqlsupp.showSuppliers);

  app.get('/showSuppl', sqlsupp.showSuppliers);

  app.get('/showSuppl/edit/:Id', sqlsupp.get);
  app.post('/showSuppl/edit/:Id', sqlsupp.update)
  app.post('/showSuppl/update/:Id', sqlsupp.update);
  app.post('/showSuppl/add', sqlsupp.add);

  //this should be a post but this is only an illustration of CRUD - not on good practices
  app.get('/showSuppl/delete/:Id', sqlsupp.delete);

  //hnjhougilo
  app.get('/showSale', sqlsales.showSales);
  app.get('/showProdlist', ListOfProdz.showProdsgroup);
  app.get('/ListOfCateg', ListOfCat.showcategList);
  app.get('/showMost', mostPopul.mostProds);
  app.get('/showpopCat', MostPoPCat.mostCat);

  app.post('/add_product', function(req, res){
 var formData = req.body;
 //console.log(formData.product_name);
 res.render('product', {product_name :  formData.product_name});
});
   app.use(express.static('public'));

  app.get('/', function (req, res) {
    res.render('home',{cat:mostPopularCateg});
 // res.render('home',{cat:leastPopularCateg});

});

  app.use(express.static('public'));
 
    app.get('/showProdlist', ListOfProdz.showProdsgroup);  

  app.listen(3000);