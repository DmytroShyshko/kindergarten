var app = angular.module("app", ["user", "ngRoute", "locale"]);
app.config(function ($routeProvider, $locationProvider) {
	$locationProvider.html5Mode(true);
	$routeProvider.when("/all", {
		templateUrl: "/view/all.html"
	});
	$routeProvider.when("/generate", {
		templateUrl: "/view/generate.html"
	});
	$routeProvider.when("/build", {
		templateUrl: "/view/build.html"
	});
	$routeProvider.otherwise({
		templateUrl: "/view/all.html"
	});
});
app.value("dataModel", makeDataModel());
app.run(function($http, user, dataModel) {
	dataModel.addProp("menuList", {
			method  : 'POST',
			url     : createURL("menu", "list"),
			headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
		}, 
		angular.isArray);
	dataModel.getProp("menuList").setActive = function(oldActive) {
		var arr = this.data;
		if(arr.length > 0) {
			if(oldActive) {
				var i = arr.indexOf(oldActive);
				if(i > 0) this.active = arr[i-1];
				if(i === 0)this.active = arr[0];
			} else {
				this.active = arr[0];
			}
		}
	}
	dataModel.getProp("menuList").postLoad = function() {
		this.setActive();
	}
	dataModel.getProp("menuList").postClean = function() {
		this.active = null;
	}
	$http.post(createURL("user", "login")).success(function (data) {
		user.login(data);
		dataModel.loadProp("menuList", $http);
	});
});
app.controller("NavCtrl", function($scope, $location){
	var path = $location.path().substring(1);
	var currentView;
	switch (path) {
		case "all":
			currentView = "all";
			break;
		case "generate":
			currentView = "generate";
			break;
		case "build":
			currentView = "build";
			break;
		default: 
			currentView = "all";
	}
	$scope.isActive = function(item){
		return item == currentView;
	};
	$scope.setView = function(view){
		currentView = view;
		$location.path("/" + view);
	};
});
app.controller("allCtrl", function($scope, user, dataModel, $http, $httpParamSerializerJQLike){
	$scope.list = dataModel.getProp("menuList");
	$scope.viewFile = function() {
		//$scope.list = dataModel.getProp("menuList");
		if(!$scope.list.data) return "view/log_notification.html";
		else {
			if($scope.list.data.length === 0) return "view/list_empty.html";
			return "view/list_main.html";
		}
	}
	$scope.showMenu = function(menu) {
		$scope.list.active = menu;
		if(!menu.items)
		$http({
				method  : 'POST',
				url     : createURL("menu", "items"),
				data    : $httpParamSerializerJQLike({id: menu.id}),
				headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
			}).success(function (data) {
				menu.items = data;
			});
	}
});


function createURL(controller, action) {
	return "api/web/index.php?r=" + controller + "/" + action;
};

function makeDataModel() {
	var dataModel = {};
	dataModel.prop = [];
	dataModel.loadRule = [];
	dataModel.propCheck = [];
	dataModel.addProp = function(propName, loadRule, propCheck) {
		this.prop[propName] = {data: null};
		this.loadRule[propName] = loadRule;
		this.propCheck[propName] = propCheck;
	}
	dataModel.getProp = function(propName) {
		return this.prop[propName];
	}
	dataModel.getModels = function() {
		return this.prop;
	}
	dataModel.loadProp = function(propName, $http) {
		$http(this.loadRule[propName]).success(function (data) {
			if(dataModel.propCheck[propName](data)) {
				dataModel.prop[propName].data = data;
				if(dataModel.prop[propName].postLoad) dataModel.prop[propName].postLoad();
			}
		});
	}
	dataModel.cleanAllProp = function() {
		for(var prop in this.prop) {
			this.prop[prop].data = null;
			if(dataModel.prop[propName].postClean) dataModel.prop[propName].postClean();
		}
	}
	dataModel.loadAllProp = function($http) {
		for(var prop in this.prop) {
			this.loadProp(prop, $http);
		}
	}
	return dataModel;
}