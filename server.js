 /*var express = require('express');
   var app = express();
   */
   var express = require('express');
   var exphbs  = require('express-handlebars');

   // create a route
   var app = express();

   app.engine('handlebars', exphbs({defaultLayout: 'main'}));
   app.set('view engine', 'handlebars');

   var fs = require('fs');

  //var products = require('./least_popular_products')
  //var sortedList = products.productNames('Nelisa  Sales History.csv');

  var Products = require('./most_popular_products');
  var products = new Products();
  var productList = products.productNames('./Nelisa Sales History.csv');

  var groupedProducts = products.groupItems(productList);
  var mostPopular = products.mostpopularproducts(groupedProducts);
  var leastPopular = products.leastpopularproducts(groupedProducts);

  console.log( "productList : " + JSON.stringify(productList));

  var groupCategory = products.groupCateg(productList);
  console.log("groupCategory : " + JSON.stringify( groupCategory));

 var mostPopularCateg = products.mostPopularCtg(groupCategory);
 var leastpopularCategory = products.leastPopularCtg(groupCategory);

console.log("most popular... : " + mostPopular.name);
console.log("least popular... : " + leastPopular.name);

console.log("most popular Categ... :1" + JSON.stringify(mostPopularCateg));
console.log("least popular Category... :" + leastpopularCategory.name);

 app.get('/', function (req, res) {
  res.render('home');

});

 app.get('/most_popular_products', function (req, res) {

    //console.log("*** " + mostPopular.name);

    res.render('most_popular_products', {
      mostpopular : mostPopular,
      leastPopular: leastPopular,
      mostPopularCtg: mostPopularCateg,
      leastpopularCateg: leastpopularCategory, 

    });

  });

 app.listen(3000);

/*
  var fs = require('fs');

var products = require('./most_popular_products')
var products = require('./least_popular_products')

var products = new Products();

var sortedList = products.productNames('Nelisa  Sales History.csv');

var group = products.groupItems(sortedList);
var mostPopular = products.mostpopularproducts(group);
var leastPopular = products.leastpopularproducts(group);


   var group = products.groupItems(sortedCategory);
var mostPopularCateg = products.mostpopularCateg(group);
var leastPopularCateg = products.leastpopularCateg(group);

  console.log(leastPopular);
  console.log(mostPopular);

  console.log(mostPopularCateg);
  console.log(leastpopularCateg);

  
   app.get('/', function (req, res) {
     res.send('Hello codeX!');
   });
   app.use(express.static('public'));
  
   app.get('/hello', function (req, res) {
     res.send('Hello sbu!');
   });

   app.get('/hells', function (req, res){
    res.send('linkie');
   });

   //start the server
   var server = app.listen(3000, function () {

     var host = server.address().address;
     var port = server.address().port;
    // var handlebars = sever.address().compile;

     console.log('Example app listening at  http://%s:%s', host, port);

   });
 */
//});