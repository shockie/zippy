(function(context){
	function Controller(routing, methods){
		this._routing = routing || {};
		methods = methods || {};
		for(var name in methods){
			this[name] = methods[name];
		}
		Zippy.Event.on('router:change', this.respond.bind(this));
		Zippy.Event.on('router:ready', this.initialize.bind(this));
	}
		
	Controller.prototype.initialize = function(){
		
	}
	
	Controller.prototype.listen = function(){
		
	}
	
	Controller.prototype.construct = function(){
		
	}
	
	Controller.prototype.destruct = function(){
		
	}
	
	Controller.prototype.onLoad = function(){
		
	}
	
	Controller.prototype.respond = function(data){
		if(this._routing && this._routing[data.url] && this[this._routing[data.url]]){
			this[this._routing[data.url]]();
		}
	}
		
	Controller.prototype.onDestruct = function(data){
		if(data.location === this._location && this._active){
			this._active = false;
			this.destruct();
		}
	}
	
	Controller.prototype.onConstruct = function(data){
		if(data.location === this._location){
			var regex = new RegExp(this._location);
			this._active = true;
			this.construct(regex.exec(data.location)||{});
		}
	}
	
	Controller.prototype.prepare = function(windowed,location){
		this._window = windowed;
		if(location){
			this._location = location;
		}
		this.onLoad();
	}
	
	context.Controller = Controller;
	Class.mixin(context.Controller, context.Mixin.Event);
})(Zippy);