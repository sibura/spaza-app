var fs = require('fs');

module.exports =function(){

	var categoryMap = {
			'Milk':'Dairy Product',
			'Imasi':'Dairy Product', 
			'Bread':'Bakery Product',
			'Chakalaka Can': 'Can Food', 
			'Gold Dish Vegetable Curry Can': 'Can Food',
			'Fanta 500ml':'cold Beverages', 
			'Coke 500ml':'cold Beverages', 
			'Cream Soda 500ml':'cold Beverages', 
			'Iwisa Pap 5kg':'Bulk', 
			'Top Class Soy Mince': 'Soup', 
			'Shampoo 1 litre':'cosmetics', 
			'Soap Bar':'cosmetics', 
			'Bananas - loose': 'fruits',
			'Apples - loose':'fruits', 
			'Mixed Sweets 5s':'Confectionarie', 
			'Heart Chocolates':'Valentine Goodies', 
			'Rose (plastic)': 'Valentine Goodies',
			'Valentine Cards':'Valentine Goodies'
		};

	this.productNames = function(filePath){	

		var linesInfile = fs.readFileSync(filePath, 'utf8');
		
		var rows = linesInfile.split('\n');
		console.log(rows.length);

		var listOfProduct = [];
		var lineNumber = 0;
		
		console.log("===========================");
		console.log(rows.length);
		console.log("===========================");

		rows.forEach(function(row) {
			if(lineNumber != 0){

				var columns = row.split(';');
				var currentItem = columns[2];
				var numberSold = Number(columns[3]);


				var priceStr = columns[4];
				priceStr = priceStr.replace(",", ".").replace("R", ""); 
				var totalCost = Number(priceStr);

				var salesObj = {
					itemName: currentItem,
					soldItem: numberSold,
				    totalCost: totalCost,
				    //totalCateg: totalCateg
				};

				listOfProduct.push(salesObj);
			}
			lineNumber = lineNumber +1;
		});
		

		console.log("===========================");
		console.log(listOfProduct.length);

		return listOfProduct;
	}

	this.groupItems = function(listOfProduct){
		var itemMap = {};
		listOfProduct.forEach(function(product){
		var currentItem = product.itemName;
		var numberSold = product.soldItem;
		//var earnings = product.SalesPrice;
          

		if(itemMap[currentItem]=== undefined){
			itemMap[currentItem]=0;
		}

			itemMap[currentItem] =itemMap[currentItem]+ Number(numberSold); //+ Number(earnings);

		});
		return itemMap;
		//console.log("this is itemmap" + itemMap);
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

	this.groupCateg = function(listOfProduct) {

		var categoryProductMapping = {};

		listOfProduct.forEach(function(product){
			var currentItem = product.itemName;
			var numberSold = product.soldItem;
			var currentCategory = categoryMap[currentItem]

			if(categoryProductMapping[currentCategory]=== undefined){
				categoryProductMapping[currentCategory]=0;
			}

			categoryProductMapping[currentCategory]=categoryProductMapping[currentCategory] + Number(numberSold);

		});

		return categoryProductMapping;

	};

	this.mostPopularCtg = function(CatMap){
		var mostPopularCategory = {};
		var max = 0;
		for(var Cat in CatMap) { 			
			var value = CatMap[Cat];
			if(value > max) {
				max = CatMap[Cat];
				mostPopularCategory = {
					name : Cat,
					amt  : max
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

		this.earningsPerProduct = function(listOfProduct){
			var costPrice = {};

			//console.log(listOfProduct.forEach);

			listOfProduct.forEach(function(product){

				var currentItem = product.itemName;
				var numberSold = product.soldItem;
				var quantity = product.totalCost;
				//console.log(quantity);

				if(costPrice[currentItem]=== undefined){
					costPrice[currentItem]=0;
				}

				costPrice[currentItem] = costPrice[currentItem]+ Number(numberSold) * Number(quantity) //+ Number(earnings);

			});
			return costPrice;
			//console.log("this is CostPrice" + CostPrice);
		};

     this.earningsCategory = function(listOfProduct) {
		var categCost = {};

		listOfProduct.forEach(function(product){
			//console.log(product);

			var currentItem = product.itemName;
			var numberSold = product.soldItem;
			var currentCategory = categoryMap[currentItem];
			var quant = product.totalCost;

			if(categCost[currentCategory]=== undefined){
				categCost[currentCategory]=0;
			}

			categCost[currentCategory]=categCost[currentCategory] + Number(numberSold) * Number(quant);

		});

		return categCost;
		//console.log(categCost);

	};
	};

	

