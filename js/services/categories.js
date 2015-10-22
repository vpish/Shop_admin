(function() {
	var app = angular.module('ShopAdmin');
	
	app.factory('$categories', [function () {
		function Categories (){
			this.all =[
				{id:1, name: 'Arts', icon: 'picture'},
				{id:2, name: 'Books', icon: 'book'},
				{id:3, name: 'Clothes', icon: 'tags'},
				{id:4, name: 'Electronics', icon: 'phone'},
				{id:5, name: 'Food', icon: 'apple'},
				{id:6, name: 'Home', icon: 'home'},
				{id:7, name: 'Software', icon: 'cd'},
				{id:8, name: 'Tools', icon: 'wrench'},
				{id:9, name: 'Toys', icon: 'knight'}
			]; 
		}
		
		Categories.prototype.byId = function(id){
			for (var i=0; i<this.all.length; i++){
				if (this.all[i].id===id){
					return this.all[i];
				}
			}
		}; 
		
		return new Categories ();
	}]);

})();
