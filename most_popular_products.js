var fs = require('fs');

module.exports =function(){

	this.productNames = function(filePath){	

		//console.log("...");

		var linesInfile = fs.readFileSync(filePath, 'utf8');
		//console.log("file details : " + linesInfile);

		var rows = linesInfile.split('\n');
		//console.log(rows.length);

		var listOfProduct = [];

		var lineNumber = 0;

		rows.forEach(function(row) {
			if(lineNumber != 0){

				var columns = row.split(';');
				var currentItem = columns[2];
				var numberSold = Number(columns[3]);

				var salesObj = {
					itemName: currentItem,
					soldItem: numberSold
				};

				listOfProduct.push(salesObj);
			}
			lineNumber = lineNumber +1;
		});

		return listOfProduct;
	}


	this.groupItems = function(listOfProduct){
		var itemMap = {};

		listOfProduct.forEach(function(product){

			var currentItem = product.itemName;
			var numberSold = product.soldItem;

			if(itemMap[currentItem]=== undefined){
				itemMap[currentItem]=0;
			}

			itemMap[currentItem]=itemMap[currentItem]+ Number(numberSold);

		});
		return itemMap;
		//console.log("this is itemmap" +itemMap);
	}; 

	this.mostpopularproducts= function(itemMap){
		var mostPopularProdct = {};
		var max = 0;
		for(var prop in itemMap){
			var value = itemMap[prop];
			if(itemMap[prop] > max){
				max = itemMap[prop];
				mostPopularProdct = {
					name: prop,
					amt: max

				}
			};
		}
		return mostPopularProdct;
	};

	this.leastpopularproducts= function(itemMap){
		var leastPopularProdct = {};
		var min = 172;
		for(var prop in itemMap){
			var value = itemMap[prop];
			if(itemMap[prop] < min){
				min = itemMap[prop];
				leastPopularProdct = {
					name: prop,
					amt: min
				}
			};
		}
		return leastPopularProdct;
	}

	this.groupCateg = function(products) {
		var CatMap = {};
		//console.log(JSON.stringify(products)+"\n")
		products.forEach(function(product) {
			var CatItem = products.CatName;
			//console.log('catitem: '+CatItem);
			var numberSold = products.soldItems;
			//console.log('numberSold');

			if(CatMap[CatItem] === undefined){
				CatMap[CatItem] = 0;
			}
			
			CatMap[CatItem] = CatMap[CatItem] + Number(numberSold);

		});
		return CatMap;

	};

	this.mostPopularCtg = function(CatMap){
		var mostPopularCategory = {};
			var max = 0;
			for(var Cat in CatMap) { console.log("*" + Cat);
				var value = CatMap[Cat];
				if(value > max) {
					max = value.soldItems;
					mostPopularCategory = {
						name : value.CatName,
						amt  : value.soldItems
					}
			
				};
			 
			};
			//console.log(mostPopularCategory);
			return mostPopularCategory;

		};
         
         

         this.leastPopularCtg = function(CatMap){
         	var leastPopularCategory = {};
         	var min = 0;
         	for(var Cat in CatMap) {
         		var value = CatMap[Cat];
         		if(CatMap[Cat] + min) {
         			min = CatMap[Cat];
         			leastPopularCategory = {
         				name : Cat,
         				amt  : min
         			}
         		};
         	};
         	return leastPopularCategory;
         };
     };

/*
var Products = require('./most_popular_products');
  var products = new Products();
  var productList = products.productNames('./Nelisa Sales History.csv');

  var groupedProducts = products.groupItems(productList);
  var mostPopular = products.mostpopularproducts(groupedProducts);
  var leastPopular = products.leastpopularproducts(groupedProducts);

 var groupCategory = products.groupCateg(productList);
 console.log("**" + JSON.stringify(groupCategory));
 var mostPopularCateg = products.mostPopularCtg(groupCategory);
 var leastpopularCategory = products.leastPopularCtg(groupCategory);

console.log("most popular... : " + mostPopular.name);
console.log("least popular... : " + leastPopular.name);

console.log("most popular Categ... :1" + JSON.stringify(mostPopularCateg));
console.log("least popular Category... :" + leastpopularCategory.name);
*/