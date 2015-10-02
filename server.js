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
 var SearchIt = require('./routes/search');
 //var apiRoutes = express.Router();


 var dbOptions = {
   host: 'localhost',
   user: 'root',
   password: 'nwabisamilisantmasiko',
   port: 3306,
   database: 'SpazaApp'
 };

 //dbOptions.connect();

   // create a route
var app = express();
app.use(express.static('public'));
app.use(myConnection(mysql, dbOptions, 'single'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({ 
secret : 'coder123', resave : true,saveUninitialized: true, cookie: { maxAge: 60000 }}));



var fs = require('fs');

app.use(function(req, res, next){
  console.log('in my middleware!');
  //proceed to the next middleware component
  next();
});

request("http://localhost:3000/user", function(error, response, body){
  console.log(error);
});

var checkUser = function(req, res, next){
  if (req.session.user){
    return next();
  }
  // the user is not losgged in redirect them to the login page
  res.redirect('/');
};

var check = function(req, res, next){
  if(req.session.role === "Admin"){
    next();
  }
  else{
    res.redirect('/login');
  }
}

app.get('/users', function(req, res){
  var userData = userService.getUserData();
  res.render('users', userData)
});
  

 app.get('/', function(req, res){
  res.render('login', {layout: false})
});


app.post('/home', loggin.login);

app.get('/home', checkUser, function (req, res) {
  res.render('login')
});

app.get('/login', function (req, res) {
  res.render('home');
});
app.get('/search', function(req, res){
  res.render('search', {layout: false})
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


  //products
  app.get('/products',check, sqlfunctions.showProducts);
  app.get('/productList',check, sqlfunctions.showProducts);

  app.get('/products',checkUser, sqlfunctions.showProducts);

 // app.get('/productList', sqlfunctions.showProducts);
  app.get('/products/edit/:Id',check, sqlfunctions.get);
  app.post('/products/edit/:Id',check, sqlfunctions.update);
  app.post('/products/update/:Id',check, sqlfunctions.update);
  app.post('/products/add',check, sqlfunctions.add);
  //this should be a post but this is only an illustration of CRUD - not on good practices
  app.get('/products/delete/:Id',check, sqlfunctions.delete);
  
  //categories
  app.get('/CatList',checkUser, sqlcategory.showCategorys);
  app.get('/showCat',checkUser, sqlcategory.showCategorys);

  //app.get('/category',checkUser, sqlcategory.showCategorys);
  //app.get('/showCat', sqlcategory.showSuppliers);
  app.get('/showCat/edit/:Id', sqlcategory.get);
  app.post('/showCat/edit/:Id', sqlcategory.update);
  app.post('/showCat/update/:Id', sqlcategory.update);
  app.post('/showCat/add', sqlcategory.add);
  //this should be a post but this is only an illustration of CRUD - not on good practices
  app.get('/showCat/delete/:Id', sqlcategory.delete);



 //suppliers
 app.get('/Supplist',checkUser, sqlsupp.showSuppliers);

 app.get('/Supply',checkUser, sqlsupp.showSuppliers);

 app.get('/Supply/edit/:Id', sqlsupp.get);
 app.post('/Supply/edit/:Id', sqlsupp.update)
 app.post('/Supply/update/:Id', sqlsupp.update);
 app.post('/Supply/add', sqlsupp.add);

  //this should be a post but this is only an illustration of CRUD - not on good practices
  app.get('/Supply/delete/:Id', sqlsupp.delete);

 app.get('/Sale',checkUser, sqlsales.showSales);

 app.get('/SaleList',checkUser, sqlsales.showSales);
 app.get('/sales',checkUser, sqlsales.showSales);

 app.get('/sales/edit/:Id', sqlsales.get);
 app.post('/sales/edit/:Id', sqlsales.update);
//app.post('/sales/update/:Id', sqlsales.update);
app.post('/sales/add', sqlsales.add);
//this should be a post but this is only an illustration of CRUD - not on good practices

app.get('/sales/delete/:Id', sqlsales.delete);

app.get('/user', checkUser, usrs.usser);
app.get('/user/add', usrs.usser);
app.get('/user/edit/:Id', usrs.get);
app.get('/user/edit/:Id', usrs.update);
app.post('/user/update/:Id', usrs.update);
app.post('/user/add', usrs.add);
app.get('/user/delete/:Id', usrs.delete);

app.get('/showProdlist',checkUser, ListOfProdz.showProdsgroup);
app.get('/ListOfCateg',checkUser, ListOfCat.showcategList);
app.get('/showMost',checkUser, mostPopul.mostProds);
app.get('/showLeast',checkUser, LeastPopular.LeastProds);
app.get('/showpopCat',checkUser, MostPoPCat.mostCat);
app.get('/showEarnings',checkUser, earningsPerProduct.EarningsPro);
app.get('/CatgEarnings',checkUser, catEarning.EarningsCateg);
app.get('/showProfitables',checkUser, profitables.profitableProdz);
app.get('/showLeastCat',checkUser, LeastPopCat.LeastCat);

/*app.get('/login', function (req, res) {
    res.render('');
  });*/

app.post('/add_product', function(req, res){
 var formData = req.body;
 //console.log(formData.product_name);
 res.render('products', {product_name :  formData.product_name});
});

  //app.use(express.static('public'));
  app.get('/users', function(req, res){
    var userData = userService.getUserData();
    res.render('users', userData)
  });

  //these are the logout
  app.get('/logout', function(req, res){
    delete req.session.user;
    res.redirect('/');
    
  });

app.get('/search', function(req, res){
     res.render('productList')
});

 app.get('/signup/edit/:id', register.get);
app.post('/signUp/update/:id', register.update);
 app.post('/signup/add', register.add);
// //this should be a post but this is only an illustration of CRUD - not on good practices
 app.get('/signup/delete/:id', register.delete);


  app.get('/showProdlist',checkUser, ListOfProdz.showProdsgroup);  

  app.listen(3000);
