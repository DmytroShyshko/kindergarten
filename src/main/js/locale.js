var locale = angular.module("locale", []);
locale.factory("local", function($http, $location) {
	var lang = "ua";
	var service = {};
	service.load = function(data) {
		for(var prop in data) {
			this[prop] = data[prop];
		}
	};
	service.getLang = function() {
		return lang;
	}
	service.setLang = function(language) {	
		$http.get("resources/locale/" + language + "/main.json").success(function (data) {
			service.load(data);
		});
		lang = language;
		$location.search("lang", lang);
	}
	return service;
});
locale.run(function(local, $location) {
	var lang = $location.search().lang;
	if(lang) {
		if(lang != "ua" && lang != "ru") lang = "ua";
	} else lang = "ua";
	local.setLang(lang);
});
locale.controller("LocalCtrl", function($scope, local){
	$scope.local = local;
});
