function AppModel() {
	this.models = [];
	this.addModel = function(name, model) {
		this.models[name] = model;
	}
	this.getModel = function(name) {
		return this.models[name];
	}
	this.clean = function() {
		this.models.forEach(function(model) {
			model.clean();
		});
	}
	this.load = function() {
		this.clean();
		
	}
}