(function(){
	function Model(properties){
		this._p = properties || {};
	}
	
	Model.prototype.get = function(name){
		return this._p[name];
	};
	
	Model.prototype.set = function(name, value){
		this._p[name] = value;
	};
	
	this.Model = Model;
}).call(Zippy);
// 
// var Model = function(properties){
// 	return Class.create({
// 		properties: properties
// 	});
// }