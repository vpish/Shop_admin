(function() {
	var app = angular.module('ShopAdmin', ['ngRoute']);

	app.controller('AppController', function() {

	});

	app.directive('customersPage', function() {
		return {
			restrict : 'E',
			templateUrl : 'customers.html'
		};
	});

	app.directive('productsPage', function() {
		return {
			restrict : 'E',
			templateUrl : 'products.html'
		};
	});

	app.directive('shoppingcartPage', function() {
		return {
			restrict : 'E',
			templateUrl : 'shoppingcart.html'
		};
	});

	app.directive('contactsPage', function() {
		return {
			restrict : 'E',
			templateUrl : 'contacts.html'
		};
	});
	
	
})();
