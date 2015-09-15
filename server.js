var express = require('express');
var exphbs  = require('express-handlebars');
var mysql = require('mysql'),
cookieParser = require('cookie-parser');
bodyParser = require('body-parser'),
myConnection = require('express-myconnection');
session = require('express-session');
var cookieSession =require('cookie-session');
var bcrypt = require('bcrypt');

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
 var register = require('./routes/Signup');
 

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
secret : 'coder123', resave : true, cookie: { maxAge: 60000 }}))



var fs = require('fs');
var user = {};
var checkUser = function(req, res, next){
  if (req.session.username){
    return next();
    res.render("home")
  }
  else{// the user is not logged in redirect him to the login page
    res.redirect('/login');
  }
};
  

 app.get('/', function(req, res){
  res.render('login', {layout: false})
});

  app.post('/home', function (req, res) {
    var formData = JSON.parse(JSON.stringify(req.body))
    if(user[formData.username] !== undefined){
      req.session.user = formData.username;
      return res.redirect('home')
    }
    return res.redirect('login')
   // alert ("Login was successful");
  });



// app.post('/home', function(req, res){
//   var formData = JSON.parse(JSON.stringify(req.body));
//   if(user[formData.username] !== undefined){
//     req.session.user = formData.username;
//     return res.redirect('home')
//   }

// });

app.get('/login', function (req, res) {
  res.render('home');
});
//  app.get('/logout', function(req, res){
//   res.render('login');
// });

  app.get('/signup', function(req, res){
      app.post('/signup', function(req, res){
    var user = JSON.parse(JSON.stringify(req.body));
    if(user.password === user.confirm_password){
      if(user[user.username] === undefined){
        user[user.username] = user.password;
        res.redirect('/signup');
      }
    }
    res.render('signup');
});
    });


 app.post('/signup', register.add);
  /*var formData = JSON.parse(JSON.stringify(req.body));
  if(formData.password == formData.confirm_password){
    if(user[formData.username] === undefined)
    user[formData.username] = formData.password;
    console.log(user)
    return res.redirect('/')
  }
  res.redirect('signup')
});*/
/*app.get('/login', function (req, res) {
    res.render('log',{layout:false});
});
   app.post('/login', function (req, res) {
    var input = JSON.parse(JSON.stringify(req.body))
    if(input.username === 'Admin' && input.password === 'coder123'){
      req.session.user = input.username;
      return res.redirect('home')
    }
    return res.redirect('login');
  });

   app.get('/', function (req, res) {
    if(req.session.user){
      res.render('home')
    }
    else {
      res.render('log');
    }

  });

   app.get('/home', function (req, res, next) {
     // body...
     if(req.session.user){
      return next()
    }
    return res.redirect('/login')
  }, function (req, res) {
    res.render('home')
  });

//app.use('/log', loggin.loggin);
app.use(function(req, res, next){
  console.log('in my middleware!');
  if(req.session.user){
   return  next();

 }
 else{
  res.redirect('/login');
}
});
*/
//app.use('/', loggin.loggin);


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

  app.get('/category', sqlcategory.showCategorys);
  //app.get('/showCat', sqlcategory.showSuppliers);
  app.get('/showCat/edit/:Id', sqlcategory.get);
  app.post('/showCat/edit/:Id', sqlcategory.update);
  app.post('/showCat/update/:Id', sqlcategory.update);
  app.post('/showCat/add', sqlcategory.add);
  //this should be a post but this is only an illustration of CRUD - not on good practices
  app.get('/showCat/delete/:Id', sqlcategory.delete);



 //suppliers
 app.get('/Supplist', sqlsupp.showSuppliers);

 app.get('/Supply', sqlsupp.showSuppliers);

 app.get('/Supply/edit/:Id', sqlsupp.get);
 app.post('/Supply/edit/:Id', sqlsupp.update)
 app.post('/Supply/update/:Id', sqlsupp.update);
 app.post('/Supply/add', sqlsupp.add);

  //this should be a post but this is only an illustration of CRUD - not on good practices
  app.get('/Supply/delete/:Id', sqlsupp.delete);

 //app.get('/sales', sqlsales.showSales);

 app.get('/Sale', sqlsales.showSales);

 app.get('/SaleList', sqlsales.showSales);
 app.get('/sales', sqlsales.showSales);

 app.get('/sales/edit/:Id', sqlsales.get);
 app.post('/sales/edit/:Id', sqlsales.update);
//app.post('/sales/update/:Id', sqlsales.update);
app.post('/sales/add', sqlsales.add);
//this should be a post but this is only an illustration of CRUD - not on good practices

app.get('/sales/delete/:Id', sqlsales.delete);


app.get('/showProdlist', ListOfProdz.showProdsgroup);
app.get('/ListOfCateg', ListOfCat.showcategList);
app.get('/showMost', mostPopul.mostProds);
app.get('/showLeast', LeastPopular.LeastProds);
app.get('/showpopCat', MostPoPCat.mostCat);
app.get('/showEarnings', earningsPerProduct.EarningsPro);
app.get('/CatgEarnings', catEarning.EarningsCateg);
app.get('/showProfitables', profitables.profitableProdz);
app.get('/showLeastCat', LeastPopCat.LeastCat);

/*app.get('/login', function (req, res) {
    res.render('');
  });*/

app.post('/add_product', function(req, res){
 var formData = req.body;
 //console.log(formData.product_name);
 res.render('product', {product_name :  formData.product_name});
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

app.get('/signup/edit/:id', register.get);
//app.post('/signUp/update/:id', register.update);
app.post('/signup/add', register.add);
//this should be a post but this is only an illustration of CRUD - not on good practices
app.get('/signup/delete/:id', register.delete);


  app.get('/showProdlist', ListOfProdz.showProdsgroup);  

  app.listen(3000);
