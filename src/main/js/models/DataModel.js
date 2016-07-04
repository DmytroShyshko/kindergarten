/*
	conf has data:
	name - must have
	validate - function for validate data
	load - function for set data - must have
	$http_conf - config object - must have
	
*/
function DataModel(conf) {
	this.data = {};
	this.conf = conf;
	this.status = DataModel.NOT_LOADED;
}
//const for model statys
DataModel.prototype.NOT_LOADED = 0; 
DataModel.prototype.LOADED = 1;
DataModel.prototype.IS_LOADING = 2;

DataModel.prototype.clean = function() {
	this.status = DataModel.NOT_LOADED;
	for(var prop in this.data) delete this.data[prop];
}

DataModel.prototype.load = function(data) {
	this.clean();
	var error = false;
	var self = this;
	if(data) {
		if(this.conf.validate) error = this.conf.validate(data);
		if(!error) {
			this.conf.load.call(this.data, data);
			this.status = DataModel.LOADED;
		} else this.status = DataModel.NOT_LOADED;
	} else {
		this.status = DataModel.NOT_LOADED;
	}
}

