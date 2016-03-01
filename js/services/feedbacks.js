(function() {
	var app = angular.module('ShopAdmin');
	
	app.factory('$feedbacks', [function () {
		function Feedbacks (){
			this.all =[
				{text: 'First feedback.'},
				{text: 'bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla '},
				]; 
		}
		
		var def = Feedbacks.prototype;
		
		def.add = function  (feedback) {
		  this.all.push({
		  	text: feedback.text,
		   });
		};
		
		return new Feedbacks ();
	}]);

})();
