// use the module you created
var Products = require("./most_popular_products");
//var products = products.productNames('Nelisa Sales History.csv', 'utf-8');
    var products = new Products();
//print out to the console the most popular product
     //var list = {};
	  var list = products.productNames('./Nelisa Sales History.csv');
      console.log(list);
//print out to the console the least popular product


      
//print out to the console the most popular category