var locale = angular.module("local", []);
locale.factory("local", function($http) {
	var lang = "ua";
	var service = {};
	service.load = function(data) {
		for(prop in data) {
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
	}
	return service;
});
locale.run(function(local) {
	local.setLang("ua");
});
