(function(){
	function Controller(methods){
		this._views = [];
		methods = methods || {};
		for(var name in methods){
			this[name] = methods[name];
		}
		
	};
	Class.mixin(Controller, this.Event);
	Controller.prototype.addView = function(view){
		this.on('view:select', function(data){
			if(this.selector === data.selector){
				data.controller.fire('view:found', {
					view:this
				});
			}
		}.bind(view));
		this._views.push(view);
	}
	
	Controller.prototype.getView = function(selector, cb){
		this.on('view:found', function(data){
			cb(data.view);
		});
		
		this.fire('view:select', {
			selector: selector,
			controller: this
		});
	}
	
	Controller.prototype.listen = function(){
		
	}
	
	Controller.prototype.respond = function(){
		
	};
	
	Controller.prototype.destruct = function(){
		
	};
	
	Controller.prototype.onLoad = function(){
		
	};
	
	Controller.prototype.update = function(template, data){
		this.fire('view:update', {
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
			this.respond(regex.exec(data.location)||{});
		}
	}
	
	Controller.prototype.prepare = function(app,location){
		this._app = app;
		this._app.on('controller:destruct', this.onDestruct.bind(this));
		this._app.on('controller:construct', this.onConstruct.bind(this));
		if(location){
			this._location = location;
		}
	};
	
	Controller.prototype.render = function(){
		var body = this._app._view.render(template,params);
		this._app._context.innerHTML = body;
	};
	this.Controller = Controller;
}).call(Zippy);