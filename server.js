   //var express = require('express');
   //var app = express()
   var express = require('express');
   var exphbs  = require('express-handlebars');
   var mysql = require('mysql'),
   bodyParser = require('body-parser'),
   myConnection = require('express-myconnection');
   var sqlfunctions = require('./routes/SqlFunctions');
   var sqlCategorys = require('./routes/sqlcategory');
   var sqlsupp = require('./routes/suppliers');
   var sqlsales = require('./routes/sales');
   var ListOfProdz = require('./routes/groupProducts');
   var ListOfCat = require('./routes/listOfCateg');
   var mostPopul = require('./routes/mostPoP');
   var MostPoPCat = require('./routes/most_popCateg');
   var ProdsEarns = require('./routes/earningsPerProd');
   var ProfitProduct = require('./routes/Profitables');

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

	app.get('/products', sqlfunctions.showProducts);
  app.get('/products/edit/:Id', sqlfunctions.get);
  app.post('/products/update/:Id', sqlfunctions.update);
  app.post('/products/add', sqlfunctions.add);
  //this should be a post but this is only an illustration of CRUD - not on good practices
  app.get('/products/delete/:Id', sqlfunctions.delete);

//Categories Edit Add Delete

  app.get('/category', sqlCategorys.showCategorys);
  app.get('/category/edit/:Id', sqlCategorys.get);
  app.post('/category/update/:Id', sqlCategorys.update);
  app.post('/category/add', sqlCategorys.add);
  //this should be a post but this is only an illustration of CRUD - not on good practices
  app.get('/category/delete/:Id', sqlCategorys.delete);

 //Add Edit UPDATE Delete suppliers
   app.get('/Supply', sqlsupp.showSuppliers);
  app.get('/Supply/edit/:Id', sqlsupp.get);
  app.post('/Supply/update/:Id', sqlsupp.update);
  app.post('/Supply/add', sqlsupp.add);
  //this should be a post but this is only an illustration of CRUD - not on good practices
  app.get('/Supply/delete/:Id', sqlsupp.delete);


  //Add Delete Edit UPDATE  >>>app.get('/Sale', sqlsales.showSales);<<<<--
 app.get('/Sale', sqlsales.showSales);
  app.get('/Sale/edit/:Id', sqlsales.get);
  app.post('/Sale/update/:Id', sqlsales.update);
  app.post('/Sale/add', sqlsales.add);
  //this should be a post but this is only an illustration of CRUD - not on good practices
  app.get('/Sale/delete/:Id', sqlsales.delete);

  app.get('/showProdlist', ListOfProdz.showProdsgroup);
  app.get('/ListOfCateg', ListOfCat.showcategList);
  app.get('/showMost', mostPopul.mostProds);
  app.get('/showpopCat', MostPoPCat.mostCat);


  //EarningsProd Product/Categorys Add Edit Delete****
  app.get('/EarningsProd', ProdsEarns.EarnProduct);
  app.get('/EarningsProd/edit/:Id', ProdsEarns.get);
  app.post('/EarningsProd/update/:Id', ProdsEarns.update);
  app.post('/EarningsProd/add', ProdsEarns.add);
  //this should be a post but this is only an illustration of CRUD - not on good practices
  app.get('/EarningsProd/delete/:Id', ProdsEarns.delete);

//Profitables Product/Categorys Add Edit Delete****
  app.get('/Profitables', ProfitProduct.MostProfits);
  app.get('/Profitables/edit/:Id', ProfitProduct.get);
  app.post('/Profitables/update/:Id', ProfitProduct.update);
  app.post('/Profitables/add', ProfitProduct.add);
  //this should be a post but this is only an illustration of CRUD - not on good practices
  app.get('/Profitables/delete/:Id', ProfitProduct.delete);
   //Displays most profitable category


   app.use(express.static('public'));

  app.get('/', function (req, res) {
  res.render('home')

});

  app.use(express.static('public'));
 
//    app.get('/showProdlist', ListOfProdz.showProdsgroup);

  app.listen(3000);