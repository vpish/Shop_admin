(function() {
	var app = angular.module('ShopAdmin', ['ngRoute']);

	app.config(['$routeProvider','$locationProvider', function ($routeProvider, $locationProvider) {
		$locationProvider.html5Mode({enabled: true, requireBase: false});
		$routeProvider
			.when('/', {templateUrl: '/main.html'})
			.when('/customers', {templateUrl: '/customers.html'})
			.when('/products', {templateUrl: '/products.html', controller: 'ProductsController',controllerAs: 'products'})
			.when('/shoppingcart', {templateUrl: '/shoppingcart.html'})
			.when('/contacts', {templateUrl: '/contacts.html'});
	}]);

	app.controller('AppController',['$location', function($location){
		this.currentMenu='main';
		this.changePath = function(path){
			$location.path(path);
			if (path === '/') {this.currentMenu='main';}
			else if (path === '/customers') {this.currentMenu='customers';}
			else if (path === '/products') {this.currentMenu='products';}
			else if (path === '/contacts') {this.currentMenu='contacts';}
			else if (path === '/shoppingcart') {this.currentMenu='shoppingcart';}	
	}; 
	}]);
		
	app.controller('ProductsController',['$location', function($location){
		this.categories =[
			{id:1, name: 'Arts', icon: 'picture'},
			{id:2, name: 'Books', icon: 'book'},
			{id:3, name: 'Clothes', icon: 'tags'},
			{id:4, name: 'Electronics', icon: 'phone'},
			{id:5, name: 'Food', icon: 'apple'},
			{id:6, name: 'Home', icon: 'home'},
			{id:7, name: 'Software', icon: 'cd'},
			{id:8, name: 'Tools', icon: 'wrench'},
			{id:9, name: 'Toys', icon: 'knight'},
			]; 
			
		this.newProduct = {name: undefined ,category:6, price: undefined, status: undefined};
		
		this.added= [
		{id:1, name: 'Lime' ,category:5, price: 2, status: 'active'},
		{id:2, name: 'Table' ,category:6, price: 38, status: 'active'},
		{id:3, name: 'Nikon D3200' ,category:4, price: 350, status: 'active'},
		{id:4, name: 'Sony Xperia' ,category:4, price: 280, status: 'active'},
		{id:5, name: 'Photoshop CS9' ,category:7, price: 99, status: 'active'},
		];	
		
		this.nextId = 6;	
		this.currentlyEditable = undefined;	
		this.editableBackup = {};
		
		this.category = function(id){
			for (var i=0; i<this.categories.length; i++){
				if (this.categories[i].id===id){
					return this.categories[i];
				}
			}
		}; 
		
		this.setCategory = function(product,category) {
		  product.category = category.id;
		};
		
		this.add = function  () {
		  this.added.push({
		  	id: this.nextId,
		  	name: this.newProduct.name,
		  	category: this.newProduct.category,
		  	price: this.newProduct.price,
		  	status: 'active',
		  });
		  this.clearNewProduct();
		  this.nextId++;
		};
		
		this.clearNewProduct = function () {
		  this.newProduct = {name: undefined ,category:6, price: undefined, status: undefined};
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
		
		this.remove = function (id) {
		  for (var i=0; i<this.added.length; i++){
				if (this.added[i].id===id){
					 this.added[i].status = 'removed';
					 break;
				}
			}
		};
		
		
		
		
		
	}]);


})();
