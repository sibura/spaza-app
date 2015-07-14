var assert = require("assert");

var Products = require("../most_popular_products");




describe("Find most popular products - ", function(){

	it('should return a list of products objects', function(){

		var products = new Products();
		var shop = products.productNames('./Nelisa Sales History.csv');

		//console.log(shop);
		assert.equal(448, shop.length);
		assert.equal("Imasi", shop[1].itemName);
	});

	it('should return product qty map', function(){

		var products = new Products();
		var shop = products.productNames('./Nelisa Sales History.csv');

		var expectedMap = {'Milk':142, 'Imasi':125, 'Bread':130, 'Chakalaka Can':94, 'Gold Dish Vegetable Curry Can':86, 'Fanta 500ml':94, 'Coke 500ml':159, 'Cream Soda 500ml':75, 'Iwisa Pap 5kg':47, 'Top Class Soy Mince':98, 'Shampoo 1 litre':26, 'Soap Bar':50, 'Bananas - loose': 114, 'Apples - loose':114, 'Mixed Sweets 5s':172, 'Heart Chocolates':20, 'Rose (plastic)': 14, 'Valentine Cards':14};
		var groups = products.groupItems(shop);
		//var productMap = products.groupItems(groups);
		
		//console.log(expectedMap);
		assert.deepEqual();
	});

	it('should return the most popular products', function(){

		var products = new Products();
		var shop = products.productNames('./Nelisa Sales History.csv');
		
		var result = {name:'Mixed Sweets 5s', amt:172};
	//console.log(productsResults.length);
	var groups = products.groupItems(shop);
	var productsResults = products.mostpopularproducts(groups);
	//console.log(result)
	assert.deepEqual();
	
});

	it('should return the least popular products', function(){

		var products = new Products();
		var shop = products.productNames('./Nelisa Sales History.csv');


		var result = {name:"Rose (plastic)", amt: 14};
		var groups = products.groupItems(shop);
		var productsResults = products.leastpopularproducts(groups);
	 // console.log(result);
	   assert.deepEqual(result, productsResults);

	});


it('should return CatMap',function(){
	var products = new Products();
	var shop = products.productNames('./Nelisa Sales History.csv');

	var expectedMap = {"Dairy Product":267,"Bakery Product":130,"Can Food":180,"cold Beverages":328,"Bulk":47,"Soup":98,"cosmetics":76,"fruits":228,"Confectionarie":172,"Valentine Goodies":48}; 
	var catMap = products.groupCateg(shop);
	//console.log(expectedMap);
	assert.deepEqual(expectedMap, catMap);
});

it('should return the most popular category', function(){
	var products = new Products();
	var shop = products.productNames('./Nelisa Sales History.csv');
	
	var result = {name:'cold Beverages', amt:328};
	var groups = products.groupCateg(shop);
	var categoryResults = products.mostPopularCtg(groups);
	  //console.log(groups);
	  assert.deepEqual(result, categoryResults);

	});

it('should return the least popular category', function(){
	var products = new Products();
	var shop = products.productNames('./Nelisa Sales History.csv');

	var result = {name:'Valentine Goodies',  amt: 48};
	var groups = products.groupCateg(shop);
	var categoryResults = products.leastPopularCtg(groups);
	 //console.log(result);
	 assert.deepEqual(result, categoryResults);

	});


it('should return the earnings per product', function(){
	var products = new Products();
	var shop = products.productNames('./Nelisa Sales History.csv');
	
	var earningsPerProductResults = products.earningsPerProduct(shop);
	//console.log(earningsPerProductResults);

	//console.log('linkie' + result);
    assert.equal(earningsPerProductResults ["Milk 1l"], 1420);
    assert.equal(earningsPerProductResults ["Imasi"], 3125);
    assert.equal(earningsPerProductResults ["Bread"], 1560);

});
 
 it('should return the earnings per category', function(){
 	var products = new Products();
 	var shop = products.productNames('./Nelisa Sales History.csv');
  //console.log("***")
 	var earningCategoryResuts = products.earningsCategory(shop);
 	//console.log(earningCategoryResuts
 	assert.equal(earningCategoryResuts ['Dairy Product'], 4545);
 });

  it('should return the most profitable product', function(){
 	 var products = new Products();
 	var shop = products.productNames('./Nelisa Sales History.csv');
 	var r1 = products.earningsPerProduct(shop);

 	var mostProfitableproductResults = products.mostProfitableproduct(r1);
 	var result = {name:'Imasi', quant:3125};
 	console.log(mostProfitableproductResults);
 	assert.deepEqual(mostProfitableproductResults, result);
 });

    it('should return the most profitable category', function(){
var products = new Products();
var shop = products.productNames('./NelisaPurchases.csv');
//console.log("***")
var result = {name:'Dairy Product', amt:4545};
var ProfitableCategory = products.mostProfitableCategory(shop);
  console.log(ProfitableCategory);
assert.deepEqual(ProfitableCategory, result);
});
});
