(function() {
	var app = angular.module('ShopAdmin');

	app.controller('CustomersController',['$customers', function($customers){
				
		this.customersList = $customers.all;
					
		this.add = function  () {
		  $customers.add(this.newCustomer);
		  this.clearNewCustomer();
		};
		
		this.remove = function (customer) {
		  $customers.remove(customer);
		};
		
		this.newCustomer = {firstName: undefined , secondName: undefined};
		this.currentlyEditable = undefined;	
		this.editableBackup = {};
		
		this.clearNewCustomer = function () {
		  this.newCustomer = {firstName: undefined , secondName: undefined};
		};
		
		this.save = function  (customer) {
			customer.editable = !customer.editable
		  	this.currentlyEditable = undefined;
		  	this.editableBackup = {};
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
		
		this.cheque = function  (customer) {
		  	return $customers.customerCheque(customer);
		};		
		
	}]);
		
})();
