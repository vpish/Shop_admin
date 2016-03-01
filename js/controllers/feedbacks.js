(function() {
	var app = angular.module('ShopAdmin');
	
	app.controller('FeedbacksController',['$feedbacks', function($feedbacks){
		
		this.feedbacksList= $feedbacks.all;
		this.newFeedback = {text: undefined};	
		
		this.add = function  () {
		  $feedbacks.add(this.newFeedback);
		  this.clearNewFeedback();
		 };		
		 
		this.clearNewFeedback = function () {
		  this.newFeedback = {text: undefined};
		}; 
			
	}]);

})();
