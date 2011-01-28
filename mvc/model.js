(function(context){
	function Model(properties){
		this._p = properties || {};
	}
	
	Model.prototype.get = function(name){
		return this._p[name];
	}
	
	Model.prototype.set = function(name, value){
		this._p[name] = value;
	}
	
	context.Model = Model;
	Class.mixin(context.Model,context.Mixin.Event);
})(Zippy);