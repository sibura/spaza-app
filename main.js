 var fs = require('fs');

var products = require('./most_popular_products')
//var products = require('./least_popular_products')


var products = new products();

var sortedList = products.productNames('Nelisa Sales History.csv');
var sortedearnings = products.productNames('NelisaPurchases.csv');

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