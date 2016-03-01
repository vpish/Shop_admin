(function() {
	var app = angular.module('ShopAdmin');

	app.controller('AppController',['$location', function($location){
		this.currentMenu='main';
		this.getDate = new Date();
		this.changePath = function(path,id){
			$location.path(path);
			if (path === '/') {this.currentMenu='main';}
			else if (path === '/customers') {this.currentMenu='customers';}
			else if (path === '/products') {this.currentMenu='products';}
			else if (path === '/contacts') {this.currentMenu='contacts';}
			else if (path === '/shoppingcart/'+id) {this.currentMenu='shoppingcart';}	
		}; 
	}]);

})();
