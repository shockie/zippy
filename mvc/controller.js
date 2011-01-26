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
	
	Controller.prototype.check = function(data){
		if(data.location === this._location){
			this._active = true;
			this.respond(data.params||{});
		}else{
			if(this._active === true){
				this._active = false;
				this.destruct();
			}
		}
		
	};
	
	Controller.prototype.prepare = function(app,location){
		this._app = app;
		if(location){
			this._location = location;
			this._app.router.on('router:change',this.check.bind(this));
		}
	};
	
	Controller.prototype.render = function(){
		var body = this._app._view.render(template,params);
		this._app._context.innerHTML = body;
	};
	this.Controller = Controller;
}).call(Zippy);