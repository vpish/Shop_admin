(function() {
	var app = angular.module('ShopAdmin', ['ngRoute']);

	app.config(['$routeProvider','$locationProvider', function ($routeProvider, $locationProvider) {
		$locationProvider.html5Mode({enabled: true, requireBase: false});
		$routeProvider
			.when('/', {templateUrl: '/main.html'})
			.when('/customers', {templateUrl: '/customers.html', controller: 'CustomersController',controllerAs: 'customers'})
			.when('/products', {templateUrl: '/products.html', controller: 'ProductsController',controllerAs: 'products'})
			.when('/shoppingcart', {templateUrl: '/shoppingcart.html', controller: 'ShoppingCartsController',controllerAs: 'shoppingcart'})
			.when('/contacts', {templateUrl: '/contacts.html'});
	}]);

// ------- AppController -----------

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
	
// ------- ShoppingCartsController -----------
		app.controller('ShoppingCartsController',['$location', function($location){
	
		this.newPurchase = {product: 1, category : 5,  price: 2, amount: undefined};
		
		this.clearNewPurchase = function () {
		  this.newPurchase = {product: 1, category : 5,  price: 2, amount: undefined};
		};
		
		this.categoryList =[
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
		
		this.productList= [
			{id:1, name: 'Lime' ,category:5, price: 2, status: 'active'},
			{id:2, name: 'Table' ,category:6, price: 38, status: 'active'},
			{id:3, name: 'Nikon D3200' ,category:4, price: 350, status: 'active'},
			{id:4, name: 'Sony Xperia' ,category:4, price: 280, status: 'active'},
			{id:5, name: 'Photoshop CS9' ,category:7, price: 99, status: 'active'},
		];	
			
		this.purchasesList = [
			{id:1, product: 4 , category : 4,  price: 280, amount: 2 },
			{id:2, product: 3 , category : 4,  price: 350, amount: 1},
			{id:3, product: 1 , category : 5,  price: 2, amount: 30},
		];	
		
		this.nextId = 4;	
		this.currentlyEditable = undefined;	
		this.editableBackup = {};
	
		this.category = function(id){
			for (var i=0; i<this.categoryList.length; i++){
				if (this.categoryList[i].id===id){
					return this.categoryList[i];
				}
			}
		}; 
		
		this.product = function(id){
			for (var i=0; i<this.productList.length; i++){
				if (this.productList[i].id===id){
					return this.productList[i];
				}
			}
		}; 
		
		this.setProduct = function(purchase,product) {
		  purchase.product = product.id;
		  purchase.category = product.category;
		  purchase.price = product.price;
		  
		};
		
		this.add = function  () {
		  this.purchasesList.push({
		  	id: this.nextId,
		  	product: this.newPurchase.product,
		  	category: this.newPurchase.category,
		  	price: this.newPurchase.price,
		  	amount:this.newPurchase.amount,
		  });
		  this.clearNewPurchase();
		  this.nextId++;
		 };
				 
		this.calcAltogether = function  () {
		  this.altogether = 0;
		   for (var i=0; i<this.purchasesList.length; i++){
				this.altogether = this.altogether + (this.purchasesList[i].price * this.purchasesList[i].amount);			
				}
				return this.altogether;
			};
		
		this.save = function  (purchasedItem) {
			purchasedItem.editable = !purchasedItem.editable
		  	this.currentlyEditable = undefined;
		  	
		}
		
		this.edit = function  (purchasedItem) {
			this.cancelEdit(this.currentlyEditable);
			this.currentlyEditable = purchasedItem;
			this.editableBackup = {
				product : purchasedItem.product,
				category:purchasedItem.category,
				price: purchasedItem.price,
				amount : purchasedItem.amount,
				};
			purchasedItem.editable = !purchasedItem.editable;
		};
		
		this.cancelEdit = function  (purchasedItem) {
			if (!purchasedItem) {
				return;
			};
			purchasedItem.product = this.editableBackup.product;
			purchasedItem.category = this.editableBackup.category;
			purchasedItem.price = this.editableBackup.price;
			purchasedItem.amount = this.editableBackup.amount;
			purchasedItem.editable = !purchasedItem.editable;
			this.editableBackup = {};
			this.currentlyEditable = undefined;
		};
		
		this.remove = function (id) {
		  for (var i=0; i<this.purchasesList.length; i++){
				if (this.purchasesList[i].id===id){
					 this.purchasesList.splice(i,1);
					 break;
				}
			}
		};	
		
		
		
		
	}]);
		
// ------- CustomersController -----------

	app.controller('CustomersController',['$location', function($location){
		
		this.newCustomer = {firstName: undefined , secondName: undefined};
		
		this.customersList = [
		{id:1, firstName: 'Volodymyr' , secondName : 'Pish',  numberOfProducts: 8, cheque: 1230, status: 'active'},
		{id:2, firstName: 'Stepan' , secondName : 'Sobaka',  numberOfProducts: 5, cheque: 840, status: 'active'},
		{id:3, firstName: 'Oleg' , secondName : 'Kaban',  numberOfProducts: 0, cheque: 0, status: 'active'},
		{id:4, firstName: 'Roman' , secondName : 'Koza',  numberOfProducts: 2, cheque: 55, status: 'active'},
		{id:5, firstName: 'Danylo' , secondName : 'Tygr',  numberOfProducts: 12, cheque: 3410, status: 'active'},
		{id:6, firstName: 'Ivan' , secondName : 'Slon',  numberOfProducts: 4, cheque: 1980, status: 'active'},
		];	
		
		this.nextId = 7;	
		this.currentlyEditable = undefined;	
		this.editableBackup = {};
		
		this.clearNewCustomer = function () {
		  this.newCustomer = {firstName: undefined , secondName: undefined};
		};
		
		this.add = function  () {
		  this.customersList.push({
		  	id: this.nextId,
		  	firstName: this.newCustomer.firstName,
		  	secondName: this.newCustomer.secondName,
		  	numberOfProducts: 0,
		  	cheque: 0,
		  	status: 'active',
		  });
		  this.clearNewCustomer();
		  this.nextId++;
		};
		
		this.save = function  (customer) {
			customer.editable = !customer.editable
		  	this.currentlyEditable = undefined;
		}
		
		this.edit = function  (customer) {
			this.cancelEdit(this.currentlyEditable);
			this.currentlyEditable = customer;
			this.editableBackup = {
				firstName : customer.firstName,
				secondName : customer.secondName,
				};
			customer.editable = !customer.editable;
		};
		
		this.cancelEdit = function  (customer) {
			if (!customer) {
				return;
			};
			customer.firstName = this.editableBackup.firstName;
			customer.secondName = this.editableBackup.secondName;
			customer.editable = !customer.editable;
			this.editableBackup = {};
			this.currentlyEditable = undefined;
		};
		
		this.remove = function (id) {
		  for (var i=0; i<this.customersList.length; i++){
				if (this.customersList[i].id===id){
					 this.customersList[i].status = 'removed';
					 break;
				}
			}
		};
				
		
	}]);
		
			
// ------- ProductsController -----------
		
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

// ---------------------

})();
