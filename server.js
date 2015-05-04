 var express = require('express');
 var app = express();

 var express = require('express');
 var exphbs  = require('express-handlebars');

   // create a route
   var app = express();

   app.engine('handlebars', exphbs({defaultLayout: 'main'}));
   app.set('view engine', 'handlebars');

   var fs = require('fs');

  var products = require('./least_popular_products')
  var sortedList = products.productNames('Nelisa  Sales History.csv');

  var Products = require('./most_popular_products');
  var products = new Products();
  var productList = products.productNames('./Nelisa Sales History.csv');

  var groupedProducts = products.groupItems(productList);
  var mostPopular = products.mostpopularproducts(groupedProducts);
  var leastPopular = products.leastpopularproducts(groupedProducts);

  var group = products.groupCateg(productList);
  var mostPopularCateg = products.mostPopularCtg(group);
  var leastpopularCateg = products.leastPopularCtg(group);

  app.use(express.static('public'));

  console.log( "productList : " + JSON.stringify(productList));

  var group = products.groupCateg(productList);
  var mostPopularCateg = products.mostPopularCtg(group);
  var leastpopularCateg = products.leastPopularCtg(group);

  var groupCategory = products.groupCateg(productList);
  console.log("groupCategory : " + JSON.stringify(groupCategory));


  console.log("most popular... : " + JSON.stringify(mostPopular));
  console.log("least popular... : " + JSON.stringify(leastPopular));

  console.log("mostpopularCateg... :" + JSON.stringify(mostPopularCateg));
  console.log("leastpopularCateg... :" + JSON.stringify(leastpopularCateg));

  app.get('/', function (req, res) {
    res.render('home',{cat:mostPopularCateg});
 // res.render('home',{cat:leastPopularCateg});

});

  app.use(express.static('public'));

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

  app.listen(3000);


 /*app.get('/', function (req, res) {
   res.send('Hello codeX!');
 });
 */
 
/*
 app.get('/hello', function (req, res) {
   res.send('Hello sbu!');
 });

 app.get('/hells', function (req, res){
  res.send('linkie');
});
 */
   //start the server
  // var server = app.listen(3000, function () {
/*
     var host = server.address().address;
     var port = server.address().port;
    var handlebars = sever.address().compile;

     console.log('Example app listening at  http://%s:%s', host, port);
     */
  // });
