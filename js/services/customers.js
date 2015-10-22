(function() {
	var app = angular.module('ShopAdmin');
	
	app.factory('$customers', ['$products', function ($products) {
		function Customers (){
			this.all =[
				{id:1, firstName: 'Volodymyr' , secondName : 'Pish', cart:[		
					{product: 4 , amount: 2 },
					{product: 3 , amount: 1},
					{product: 1 , amount: 30},
				], status: 'active'},
				{id:2, firstName: 'Stepan' , secondName : 'Sobaka', cart:[], status: 'active'},
				{id:3, firstName: 'Oleg' , secondName : 'Kaban', cart:[
					{product: 1 , amount: 8 },
					{product: 2 , amount: 1},
					{product: 3 , amount: 6},
					{product: 4 , amount: 2 },
					{product: 5 , amount: 3},
					{product: 3 , amount: 5},									
				], status: 'active'},
				{id:4, firstName: 'Roman' , secondName : 'Koza', cart:[
					{product: 4 , amount: 10 },				
				], status: 'active'},
				{id:5, firstName: 'Danylo' , secondName : 'Tygr', cart:[], status: 'active'},
				{id:6, firstName: 'Ivan' , secondName : 'Slon', cart:[], status: 'active'}
			]; 
			this.nextId = 7;
		}
		
		var def = Customers.prototype;
		
		def.byId = function(id){
			for (var i=0; i<this.all.length; i++){
				if (this.all[i].id==id){
					return this.all[i];
				}
			}
		}; 
		
		def.add = function  (customer) {
		  this.all.push({
		  	id: this.nextId,
		  	firstName: customer.firstName,
		  	secondName: customer.secondName,
		  	cart:[],
		  	status: 'active',
		  });
		  this.nextId++;
		};
		
		def.remove = function (customer) {
		  for (var i=0; i<this.all.length; i++){
				if (this.all[i].id===customer.id){
					 this.all[i].status = 'removed';
					 break;
				}
			}
		};
		
		def.customerCheque = function (customer) {
		  var sum = 0;
		   for (var i=0; i<customer.cart.length; i++){
				sum = sum + ($products.byId(customer.cart[i].product).price * customer.cart[i].amount);			
				}
			return sum;
		};	
			
		return new Customers ();
	}]);

})();
