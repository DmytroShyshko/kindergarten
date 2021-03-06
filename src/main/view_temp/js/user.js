//var user = new User();

var userModule = angular.module("user", ["local"]);
userModule.value("user", new User());
//userModule.value("test", 123);
userModule.run(function($http, user) {
	$http.post(createURL("user", "login")).success(function (data) {
		//user = new User(data);
		user.login(data);
		//$scope.user.login(data);
	});
});
userModule.controller("UserCtrl", function ($scope, $http, $httpParamSerializerJQLike, user, local) {
	$scope.user = user;
	$scope.local = local;
	//$scope.test = test;
	$scope.form = {rememberMe: false};
	$scope.login = function() {
		if(validateForm("login")) {
			$scope.form.rememberMe = $scope.form.rememberMe ? 1 : 0;
			$http({
				method  : 'POST',
				url     : createURL("user", "login"),
				data    : $httpParamSerializerJQLike($scope.form),
				headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
			}).success(function (data) {
				if(postValidate("login", data)) {
					user.login(data);
					$('#login_modal').modal('hide');
				}
			});
		}
	};
	$scope.register = function() {
		if(validateForm("register")) {
			$scope.form.rememberMe = $scope.form.rememberMe ? 1 : 0;
			$http({
				method  : 'POST',
				url     : createURL("user", "register"),
				data    : $httpParamSerializerJQLike($scope.form),
				headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
			}).success(function (data) {
				if(postValidate("register", data)) {
					user.login(data);
					$('#register_modal').modal('hide');
				}
			});
		}
	};
	$scope.logout = function() {
		$http.post(createURL("user", "logout")).success(function (data) {
			user.logout();
		});
	};
});

function User(data) {
	this.isLogin = false;
	this.data = null;
	this.login = function(data) {
		if(data && "login" in data) {
			this.data = data;
			this.isLogin = true;
		}
	}
	this.logout = function() {
		this.data = null;
		this.isLogin = false;
	}
	this.login(data);
}

function validateForm(modal_id) {
	var formValid = true;
	var id = modal_id;
	$('#' + id + '_modal input').each(function() {
		var formGroup = $(this).parents('.form-group');
		if (this.checkValidity()) {
			formGroup.addClass('has-success').removeClass('has-error');
		} else {
			formGroup.addClass('has-error').removeClass('has-success');
			formValid = false;  
		}
	});
	return formValid;
}

function postValidate(modal_id, data) {
	var formValid = true;
	if("error_email" in data) {
		$("#" + modal_id + "Email").parent().addClass('has-error').removeClass('has-success');
		formValid = false;
	}
	if("error_password" in data) {
		$("#" + modal_id + "Password").parent().addClass('has-error').removeClass('has-success');
		formValid = false;
	}
	if("error_login" in data) {
		$("#" + modal_id + "Login").parent().addClass('has-error').removeClass('has-success');
		formValid = false;
	}
	return formValid;
}



















