(function() {
	var app = angular.module('ShopAdmin');
	
	app.controller('ProductsController',['$categories','$products', function($categories,$products){
		
		this.categories = $categories;
		//this.products = $products;
		this.productsList= $products.all;
			
		this.add = function  () {
		  $products.add(this.newProduct);
		  this.clearNewProduct();
		 };		
		 
		this.remove = function (product) {
		  $products.remove(product);
		};		 

		this.newProduct = {name: undefined ,category:6, price: undefined};
		this.currentlyEditable = undefined;	
		this.editableBackup = {};
		 
	 	this.clearNewProduct = function () {
		  this.newProduct = {name: undefined ,category:6, price: undefined};
		};
		 
		this.setCategory = function(product,category) {
		  product.category = category.id;
		};
		
		this.save = function  (product) {
			product.editable = !product.editable
		  	this.currentlyEditable = undefined;
		}
		
		this.edit = function  (product) {
			this.cancelEdit(this.currentlyEditable);
			this.currentlyEditable = product;
			this.editableBackup = {
				name : product.name,
				category : product.category,
				price : product.price,
			};
			product.editable = !product.editable;
		};
		
		this.cancelEdit = function  (product) {
			if (!product) {
				return;
			};
			product.name = this.editableBackup.name;
			product.category = this.editableBackup.category;
			product.price = this.editableBackup.price;
			product.editable = !product.editable;
			this.editableBackup = {};
			this.currentlyEditable = undefined;
		};
					
	}]);

})();
