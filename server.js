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
  console.log("Profitable Product" + JSON.stringify(mostProfitableproductResuts));

  var group = products.groupCateg(productList);
  var mostPopularCateg = products.mostPopularCtg(group);
  var leastpopularCateg = products.leastPopularCtg(group);

  var prodctEarnings = products.earningsPerProduct(productList);
  var CategEarnings = products.earningsCategory(productList);
   
  var profitables = products.earningsPerProduct(productList);
  var ProfitableProduct = products.mostProfitableproduct(profitables);
  
  var earningsCategoryResults = products.earningsCategory(productList);
  var ProfitableCategory = products.mostProfitableCategory(earningsCategoryResults);

  app.get('/products', sqlfunctions.showProducts);

	app.get('/products', sqlfunctions.showProducts);
  app.get('/products/edit/:Id', sqlfunctions.get);
  app.post('/products/update/:Id', sqlfunctions.update);
  app.post('/products/add', sqlfunctions.add);
  //this should be a post but this is only an illustration of CRUD - not on good practices
  app.get('/products/delete/:Id', sqlfunctions.delete);


  app.get('/showCat', sqlcategory.showCategorys);

  app.get('/showSuppl', sqlsupp.showSuppliers);
  app.get('/showSuppl/edit/:Id', sqlsupp.get);
  app.post('/showSuppl/update/:Id', sqlsupp.update);
  app.post('/showSuppl/add', sqlsupp.add);
  //this should be a post but this is only an illustration of CRUD - not on good practices
  app.get('/showSuppl/delete/:Id', sqlsupp.delete);


  app.get('/showSale', sqlsales.showSales);
  app.get('/showProdlist', ListOfProdz.showProdsgroup);
  app.get('/ListOfCateg', ListOfCat.showcategList);
  app.get('/showMost', mostPopul.mostProds);
  app.get('/showpopCat', MostPoPCat.mostCat);

  app.post('/add_product', function(req, res){
 var formData = req.body;
 console.log(formData.product_name);
 res.render('product', {product_name :  formData.product_name});
});

   //Displays most profitable category
  var earningCategoryResuts = products.earningsCategory(productList);
  var ProfitableCategory = products.mostProfitableCategory(earningCategoryResuts)
    
  console.log("Profitable Category"+JSON.stringify(ProfitableCategory))

   app.use(express.static('public'));

  //console.log( "productList : " + JSON.stringify(productList));

  var group = products.groupCateg(productList);
  var mostPopularCateg = products.mostPopularCtg(group);
  var leastpopularCateg = products.leastPopularCtg(group);

  var groupCategory = products.groupCateg(productList);
  console.log("groupCategory : " + JSON.stringify(groupCategory));

  console.log("most popular... : " + JSON.stringify(mostPopular));
  console.log("least popular... : " + JSON.stringify(leastPopular));

  console.log("mostpopularCateg... :" + JSON.stringify(mostPopularCateg));
  console.log("leastpopularCateg... :" + JSON.stringify(leastpopularCateg));

  console.log("earnings Product..." + JSON.stringify(prodctEarnings));
  console.log("earnings Category..." + JSON.stringify(CategEarnings));


  //console.log("Profitable Product..." + JSON.stringify(profitableProduct));
  //console.log("Profitable Category..." + JSON.stringify(ProfitableCategory));
  console.log("Profitable Product..." + JSON.stringify(ProfitableProduct));
  console.log("Profitable category..." + JSON.stringify(ProfitableCategory));

  app.get('/', function (req, res) {
    res.render('home',{cat:mostPopularCateg});
 // res.render('home',{cat:leastPopularCateg});

});

  app.use(express.static('public'));
 
    app.get('/showProdlist', ListOfProdz.showProdsgroup);


  app.get('/Category', function (req, res){
    res.render('Category', {
      groupCateg: groupCategory,
    });
  });

  app.get('/most_popular_products', function (req, res) {
  //console.log("*** " + mostPopular.name);
  res.render('most_popular_products', {
    mostPopularProdct: mostPopular,

  });
});

  app.get('/mostpopularCategory', function (req, res){
   res.render('mostpopularCategory', {
    mostPopularCtg:mostPopularCateg,
  });
 });

  app.get('/least_popular_products', function (req, res){
   res.render('least_popular_products', {
    leastPopular: leastPopular,
  });
 });

  app.get('/leastpopularCategory', function (req, res){
   res.render('leastpopularCategory', {
     leastPopularCtg: leastpopularCateg,
   });
 });

   app.get('/most_profitable_product', function (req, res){
   res.render('most_profitable_product', {
     mostProfitableproduct: mostProfitableproductResuts,
   });
 });

    app.get('/most_profitable_category', function (req, res){
   res.render('most_profitable_category', {
     mostProfitableCategory: ProfitableCategory,
   });
 });
     app.get('/earnings_per_category', function (req, res){
   res.render('earnings_per_category', {
     earningsCategory: CategEarnings,
   });
 });
      app.get('/earnings_per_product', function (req, res){
   res.render('earnings_per_product', {
     earningsPerProduct: earningsPerProduct,
   });
 });
  
  

  app.listen(3000);