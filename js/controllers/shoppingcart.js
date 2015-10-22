(function() {
	var app = angular.module('ShopAdmin');

	app.controller('ShoppingCartsController',['$routeParams','$categories','$customers','$products', function($routeParams,$categories,$customers,$products){
		
		this.id=$routeParams.customer_id;
		this.customer = $customers.byId($routeParams.customer_id);
		this.categories =$categories;
		this.productList= $products.all;	
		this.products=$products;
		this.product = function(id) {
		  return $products.byId(id);		  
		};		 	
		this.purchasesList = this.customer.cart;	

		this.setProduct = function(purchase,product) {
		  purchase.product = product.id;		  
		};		
		
		this.newPurchase = {product: this.productList[0].id, amount: undefined};
		this.currentlyEditable = undefined;	
		this.editableBackup = {};	
		
		this.clearNewPurchase = function () {
		  this.newPurchase = {product: this.productList[0].id, amount: undefined};
		};
				
		this.add = function  () {
		  this.purchasesList.push({
		  	product: this.newPurchase.product,
		  	amount:this.newPurchase.amount,
		  });
		  this.clearNewPurchase();
		 };
		
		this.remove = function (id) {
		  for (var i=0; i<this.purchasesList.length; i++){
				if (this.purchasesList[i].id===id){
					 this.purchasesList.splice(i,1);
					 break;
				}
			}
		};		

		this.save = function  (purchasedItem) {
			purchasedItem.editable = !purchasedItem.editable
		  	this.currentlyEditable = undefined;
		}
		
		this.edit = function  (purchasedItem) {
			this.cancelEdit(this.currentlyEditable);
			this.currentlyEditable = purchasedItem;
			this.editableBackup = {
				product : purchasedItem.product,
				amount : purchasedItem.amount,
				};
			purchasedItem.editable = !purchasedItem.editable;
		};
		
		this.cancelEdit = function  (purchasedItem) {
			if (!purchasedItem) {
				return;
			};
			purchasedItem.product = this.editableBackup.product;
			purchasedItem.amount = this.editableBackup.amount;
			purchasedItem.editable = !purchasedItem.editable;
			this.editableBackup = {};
			this.currentlyEditable = undefined;
		};
			
		this.calcAltogether = function  (customer) {
		  	return $customers.customerCheque(customer);
		};
			
			
	}]);
		

})();
