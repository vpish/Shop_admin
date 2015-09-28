(function() {
	var app = angular.module('ShopAdmin', ['ngRoute']);

	app.config(['$routeProvider','$locationProvider', function ($routeProvider, $locationProvider) {
		$locationProvider.html5Mode({enabled: true, requireBase: false});
		$routeProvider
			.when('/', {templateUrl: '/main.html'})
			.when('/customers', {templateUrl: '/customers.html'})
			.when('/products', {templateUrl: '/products.html'})
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



	
	
})();
