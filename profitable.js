var fs = require('fs');

module.exports =function(){
	this.productName = function(filePath){
		var linesInfile = fs.readFileSync(filePath, 'utf8')
		
		var rows = linesInfile.split('\n');
		console.log(rows.length);

		var ProductList = [];
		var lineNumbers = 0;
		
		console.log(rows.length);


		rows.forEach(function(row) {
			if(lineNumbers != 0){

				var columns = row.split(';');
				var currentItem = columns[2];
				var numberSold = Number(columns[3]);
				var profitable = Number(columns[4]);
				var cost = Number(columns[5]);


				var priceStr = columns[4];
				priceStr = priceStr.replace(",", ".").replace("R", ""); 
				var cost = Number(priceStr);


				var salesObj = {
					itemName: currentItem,
					soldItem: numberSold,
					cost: quant,
					profitable: profitable,

				};
				ProductList.push(salesObj);
			}
			lineNumbers = lineNumbers +1;
		});
		

		console.log(ProductList);

		return ProductList;
	}

	this.groupProducts = function(ProductList){
		var itemsMap = {};
		ProductList.forEach(function(profit){
			var currentItem = profit.itemName;
			var numberSold = profit.soldItem;
			var quant = profit.totalcost;


		if(itemsMap[currentItem]=== undefined){
			itemsMap[currentItem]=0;
		}

			itemsMap[currentItem] =itemsMap[currentItem]+ Number(numberSold) * Number(quant);

		});
		//return itemsMap;
		console.log("this is itemsMap" + itemsMap);
	};


	this.mostProfitableProduct = function(itemsMap){
		var mostProfitable= {};
		var max = 0;
		for(var key in itemsMap ++) {
			var value = itemsMap[key];
			if(itemsMap[key] < max) {
				max = itemsMap[key];
				mostProfitable = {
					name : key,
					quant  : max
				}
			};
		};
		return mostProfitable;
}


/*	this.mostProfitableCategory = function(itemsMap){
		var ProfitableCategory= {};
		var max = 0;
		for(var key in itemsMap) {
			var value = itemsMap[key];
			if(itemsMap[key] < max) {
				max = itemsMap[key];
				ProfitableCategory = {
					name : key,
					quant  : max
				}
			};
		};
		return ProfitableCategory;
	};*/

	  this.mostProfitableCategory = function(itemsMap){
		var ProfitableCategory= {};

		itemsMap.forEach(function(product){
			//console.log(product);

			var currentItem = profit.itemName;
			var numberSold = profit.soldItem;
			var currentCategory = categoryMap[currentItem];
			var quant = profit.totalCost;

			if(ProfitableCategory[currentCategory]=== undefined){
				ProfitableCategory[currentCategory]=0;
			}

			ProfitableCategory[currentCategory] =ProfitableCategory[currentCategory] + (Number(numberSold) * Number(quant));

		});

		return ProfitableCategory;
		console.log(ProfitableCategory);

	};
}