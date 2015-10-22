(function() {
	var app = angular.module('ShopAdmin', ['ngRoute']);

	app.config(['$routeProvider','$locationProvider', function ($routeProvider, $locationProvider) {
		$locationProvider.html5Mode({enabled: true, requireBase: false});
		$routeProvider
			.when('/', {templateUrl: '/main.html'})
			.when('/customers', {templateUrl: '/customers.html', controller: 'CustomersController',controllerAs: 'customers'})
			.when('/products', {templateUrl: '/products.html', controller: 'ProductsController',controllerAs: 'products'})
			.when('/shoppingcart/:customer_id', {templateUrl: '/shoppingcart.html', controller: 'ShoppingCartsController',controllerAs: 'shoppingcart'})
			.when('/contacts', {templateUrl: '/contacts.html'});
	}]);

})();
