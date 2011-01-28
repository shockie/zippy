(function(context){
	function Controller(methods){
		this._views = [];
		methods = methods || {};
		for(var name in methods){
			this[name] = methods[name];
		}
	}
	Controller.prototype.addView = function(view){
		Zippy.Event.on('view:select', function(data){
			if(this.selector === data.selector){
				Zippy.Event.fire('view:found', {
					view:this
				});
			}
		}.bind(view));
		this._views.push(view);
	}
	
	Controller.prototype.getView = function(selector, cb){
		Zippy.Event.on('view:found', function(data){
			cb(data.view);
		});
		
		Zippy.Event.fire('view:select', {
			selector: selector,
			controller: this
		});
	}
	
	Controller.prototype.listen = function(){
		
	}
	
	Controller.prototype.construct = function(){
		
	}
	
	Controller.prototype.destruct = function(){
		
	}
	
	Controller.prototype.onLoad = function(){
		
	}
	
	Controller.prototype.update = function(template, data){
		this._window.update({
			template: template,
			data:data
		});
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
	
	Controller.prototype.prepare = function(windowed,location){s
		this._window = windowed;
		if(location){
			this._location = location;
		}
		this.onLoad();
	}
	
	context.Controller = Controller;
	Class.mixin(context.Controller, context.Mixin.Event);
})(Zippy);