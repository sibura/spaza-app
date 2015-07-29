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
 var sqlsales = require('./routes/Sale');
 var ListOfProdz = require('./routes/groupProducts');
 var ListOfCat = require('./routes/listOfCateg');
 var mostPopul = require('./routes/mostPoP');
 var MostPoPCat = require('./routes/most_popCateg');

 var dbOptions = {
   host: 'localhost',
   user: 'root',
   password: 'coder123',
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

  app.get('/category', sqlcategory.showCategorys);
  //app.get('/showCat', sqlcategory.showSuppliers);
  app.get('/showCat/edit/:Id', sqlcategory.get);
  app.post('/showCat/edit/:Id', sqlcategory.update);
  app.post('/showCat/update/:Id', sqlcategory.update);
  app.post('/showCat/add', sqlcategory.add);
  //this should be a post but this is only an illustration of CRUD - not on good practices
  app.get('/showCat/delete/:Id', sqlcategory.delete);



 //suppiers
 app.get('/Supplist', sqlsupp.showSuppliers);

 app.get('/Supply', sqlsupp.showSuppliers);

 app.get('/showSuppl/edit/:Id', sqlsupp.get);
 app.post('/showSuppl/edit/:Id', sqlsupp.update)
 app.post('/showSuppl/update/:Id', sqlsupp.update);
 app.post('/showSuppl/add', sqlsupp.add);

  //this should be a post but this is only an illustration of CRUD - not on good practices
  app.get('/showSuppl/delete/:Id', sqlsupp.delete);

  //hnjhougilo
<<<<<<< HEAD
 // app.get('/showSale', sqlsales.showSales);
 app.get('/Sale', sqlsales.showSales);
app.get('/Sale/edit/:Id', sqlsales.get);
app.post('/Sale/edit/:Id', sqlsales.update)
// app.post('/Sales/update/:Id', sqlsales.update);
app.post('/Sale/add', sqlsales.add);
//this should be a post but this is only an illustration of CRUD - not on good practices
app.get('/Sale/delete/:Id', sqlsales.delete);
=======

 app.get('/Sale', sqlsales.showSales);
 app.get('/Sale/edit/:Id', sqlsales.get);
 app.post('/Sale/edit/:Id', sqlsales.update)
// app.post('/Sales/update/:Id', sqlsales.update);
 app.post('/Sale/add', sqlsales.add);

  //this should be a post but this is only an illustration of CRUD - not on good practices
  app.get('/Sale/delete/:Id', sqlsales.delete);


>>>>>>> ed2f908231610318c0be1d5fd0de7d1f24330470

  app.get('/showProdlist', ListOfProdz.showProdsgroup);
  app.get('/ListOfCateg', ListOfCat.showcategList);
  app.get('/showMost', mostPopul.mostProds);
  app.get('/showpopCat', MostPoPCat.mostCat);

  app.post('/add_product', function(req, res){
   var formData = req.body;
 //console.log(formData.product_name);
 res.render('product', {product_name :  formData.product_name});
});
  //app.use(express.static('public'));

  app.get('/', function (req, res) {
    res.render('home')
 // res.render('home',{cat:leastPopularCateg});

});

  app.use(express.static('public'));

  app.get('/showProdlist', ListOfProdz.showProdsgroup);  

  app.listen(3000);