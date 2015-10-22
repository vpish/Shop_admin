(function() {
	var app = angular.module('ShopAdmin');
	
	app.factory('$products', ['$categories', function ($categories) {
		function Products (){
			this.all =[
				{id:1, name: 'Lime' ,category:5, price: 2, status: 'active'},
				{id:2, name: 'Table' ,category:6, price: 38, status: 'active'},
				{id:3, name: 'Nikon D3200' ,category:4, price: 350, status: 'active'},
				{id:4, name: 'Sony Xperia' ,category:4, price: 280, status: 'active'},
				{id:5, name: 'Photoshop CS9' ,category:7, price: 99, status: 'active'}
			]; 
			this.nextId = 6;
		}
		
		var def = Products.prototype;
		
		def.byId = function(id){
			for (var i=0; i<this.all.length; i++){
				if (this.all[i].id==id){
					return this.all[i];
				}
			}
		}; 
		
		def.add = function  (product) {
		  this.all.push({
		  	id: this.nextId,
		  	name: product.name,
		  	category: product.category,
		  	price: product.price,
		  	status: 'active',
		  });
		  this.nextId++;
		};
		
		def.remove = function (product) {
		  for (var i=0; i<this.all.length; i++){
				if (this.all[i].id===product.id){
					 this.all[i].status = 'removed';
					 break;
				}
			}
		};
		
		def.categoryOf = function (productId) {
		  return $categories.byId(this.byId(productId).category);
		};
		
		return new Products ();
	}]);

})();
