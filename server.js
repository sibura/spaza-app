var express = require('express');
var exphbs  = require('express-handlebars');
var mysql = require('mysql'),
cookieParser = require('cookie-parser');
bodyParser = require('body-parser'),
myConnection = require('express-myconnection');
session = require('express-session');
var cookieSession =require('cookie-session');
var bcrypt = require('bcrypt');
var request = require('request');
//var path = require('path');


 var sqlfunctions = require('./routes/SqlFunctions');
 var sqlcategory = require('./routes/sqlcategory');
 var sqlsupp = require('./routes/suppliers');
 var sqlsales = require('./routes/sales');
 var ListOfProdz = require('./routes/groupProducts');
 var ListOfCat = require('./routes/listOfCateg');
 var mostPopul = require('./routes/mostPoP');
 var MostPoPCat = require('./routes/most_popCateg');
 var LeastPopCat = require('./routes/least_popCateg');
 var LeastPopular = require('./routes/LeastPopular');
 var earningsPerProduct = require('./routes/Earnings');
 var catEarning = require('./routes/CategEarnings');
 var profitables = require('./routes/allProfitables');
 var loggin = require('./routes/login');
 var register = require('./routes/Users');
 var usrs =require('./routes/Users');
 var supplyers = require('./routes/search');
 var searchAll = require('./routes/search');
 var searchCat = require('./routes/search');
 var searchSales = require('./routes/search');

 var dbOptions = {
   host: 'localhost',
   user: 'root',
   password: 'coder123',
   port: 3306,
   database: 'SpazaApp'
 };

   // create a route
var app = express();
app.use(express.static('public'));
app.use(myConnection(mysql, dbOptions, 'single'));
//app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({ 
secret : 'coder123', resave : true,   saveUninitialized: true, cookie: { maxAge: 60000 }}));

var fs = require('fs');

app.use(function(req, res, next){
  console.log('in my middleware!');
  //proceed to the next middleware component
  next();
});
var contains = function(str, part){
  return str.indexOf(part) !== -1;
};

var checkUser = function(req, res, next){
  console.log("path : " + req.path);
  if (req.session.user){

    var pathNeedsAdminRights = contains(req.path, "add") || 
          contains(req.path, "edit") || 
          contains("delete");

    if(pathNeedsAdminRights && req.session.role !== "Admin"){
      //why is there are error
      res.send(500, "ACCESS DENIED");
    }

    return next();
  }

  // the user is not logged in redirect them to the login page
  res.redirect('/');
};

app.get('/users:Id',checkUser, function(req, res){
  var userData = userService.getUserData();
  res.render('users', userData)
});
 app.get('/', function(req, res){
  res.render('login', {layout: false});
});


app.post('/home', loggin.login);

app.get('/home', function (req, res) {
    res.render('login', {layout: false})
});

app.get('/login', function (req, res) {
  res.render('home');
});

 app.get('/signup', function(req, res){
  res.render('signup', {layout: false})
});

  app.get('/signup', function(req, res){
      app.post('/signup', function(req, res){
    var user = JSON.parse(JSON.stringify(req.body));
    if(user.password === user.confirm_password){
      if(user[user.username] === undefined){
        user[user.username] = user.password;
        res.redirect('/');
      }
    }
    res.render('signup');
});
    });

 app.post('/signup', register.add);


  //products && prod_search!!
  app.post('/products/search', searchAll.Prods_search);
  //app.get('/products/search', searchAll.Prods_search);

  //app.get('/products/search', searchAll.Prods_search);
  //app.get('/products/search/:value', searchAll.Prods_search);
  app.post('/showCat/search', searchCat.Category_search);
  app.post('/sales/search', searchSales.Sales_search);
  app.post('/Supply/search',  supplyers.Supply_search);
 
  app.get('/products',checkUser, sqlfunctions.showProducts);

 // app.get('/productList', sqlfunctions.showProducts);
  app.get('/products/edit/:Id', checkUser, sqlfunctions.get);
  app.post('/products/edit/:Id',  checkUser, sqlfunctions.update);
  app.post('/products/update/:Id',checkUser, sqlfunctions.update);
  app.post('/products/add', checkUser, sqlfunctions.add);
  //this should be a post but this is only an illustration of CRUD - not on good practices
  app.get('/products/delete/:Id',checkUser, sqlfunctions.delete);
  
  //categories
  app.get('/CatList',checkUser, sqlcategory.showCategorys);
  app.get('/showCat',checkUser, sqlcategory.showCategorys);

  //app.get('/category',checkUser, sqlcategory.showCategorys);
  //app.get('/showCat', sqlcategory.showSuppliers);
  app.get('/showCat/edit/:Id', checkUser, sqlcategory.get);
  app.post('/showCat/edit/:Id', checkUser, sqlcategory.update);
  app.post('/showCat/update/:Id',checkUser, sqlcategory.update);
  app.post('/showCat/add', checkUser, sqlcategory.add);
  //this should be a post but this is only an illustration of CRUD - not on good practices
  app.get('/showCat/delete/:Id',checkUser, sqlcategory.delete);



 //suppliers
 app.get('/Supplist',checkUser, sqlsupp.showSuppliers);

 app.get('/Supply',checkUser, sqlsupp.showSuppliers);

 app.get('/Supply/edit/:Id', checkUser, sqlsupp.get);
 app.post('/Supply/edit/:Id', checkUser, sqlsupp.update)
 app.post('/Supply/update/:Id',checkUser, sqlsupp.update);
 app.post('/Supply/add', checkUser, sqlsupp.add);

  //this should be a post but this is only an illustration of CRUD - not on good practices
  app.get('/Supply/delete/:Id',checkUser, sqlsupp.delete);

 app.get('/Sale',checkUser, sqlsales.showSales);

 app.get('/SaleList',checkUser, sqlsales.showSales);
 app.get('/sales',checkUser, sqlsales.showSales);

 app.get('/sales/edit/:Id', checkUser, sqlsales.get);
 app.post('/sales/edit/:Id', checkUser, sqlsales.update);
 app.post('/sales/update/:Id', checkUser, sqlsales.update);
app.post('/sales/add', checkUser, sqlsales.add);
//this should be a post but this is only an illustration of CRUD - not on good practices

app.get('/sales/delete/:Id',checkUser, sqlsales.delete);

app.get('/user', checkUser, usrs.usser);
app.get('/user/add', checkUser, usrs.usser);
app.get('/user/edit/:Id', checkUser, usrs.get);
app.get('/user/edit/:Id',checkUser, usrs.update);
app.post('/user/update/:Id', checkUser, usrs.update);
app.post('/user/add',checkUser, usrs.add);
app.get('/user/delete/:Id',checkUser, usrs.delete);

app.get('/showProdlist',checkUser, ListOfProdz.showProdsgroup);
app.get('/ListOfCateg',checkUser, ListOfCat.showcategList);
app.get('/showMost',checkUser, mostPopul.mostProds);
app.get('/showLeast',checkUser, LeastPopular.LeastProds);
app.get('/showpopCat',checkUser, MostPoPCat.mostCat);
app.get('/showEarnings',checkUser, earningsPerProduct.EarningsPro);
app.get('/CatgEarnings',checkUser, catEarning.EarningsCateg);
app.get('/showProfitables',checkUser, profitables.profitableProdz);
app.get('/showLeastCat',checkUser, LeastPopCat.LeastCat);




app.post('/add_product',checkUser, function(req, res){
 var formData = req.body;
 //console.log(formData.product_name);
 res.render('products', {product_name :  formData.product_name});
});

  //app.use(express.static('public'));
  app.get('/users',checkUser, function(req, res){
    var userData = userService.getUserData();
    res.render('users', userData)
  });

  //these are the logout
  app.get('/logout/',checkUser, function(req, res){

    delete req.session.user;
    res.redirect('/');
    
  });

 app.get('/signup/edit/:id', register.get);
app.post('/signUp/update/:id', register.update);
 app.post('/signup/add', register.add);
// //this should be a post but this is only an illustration of CRUD - not on good practices
 app.get('/signup/delete/:id', register.delete);


  app.get('/showProdlist',checkUser, ListOfProdz.showProdsgroup);  

  app.listen(3000);