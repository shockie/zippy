(function(){
	function Controller(methods){
		methods = methods || {};
		this.prototype = this.prototype || {};
		for(var name in methods){
			this[name] = methods[name];
		}
	};
	
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
		this._location = location;
		this._app._router.on('router:change',this.check.bind(this));
	};
	
	Controller.prototype.render = function(){
		var body = this._app._view.render(template,params);
		this._app._context.innerHTML = body;
	};
	this.Controller = Controller;
	Class.mixin(this.Controller, this.Event);
}).call(Zippy);
// var Controller = Class.create({
// 	properties: {},
// 	methods: {
// 		respond: function(data){
// 			
// 		},
// 		destruct: function(){
// 			
// 		},
// 		check: function(data){
// 			if(data.location === this._location){
// 				this._active = true;
// 				this.respond(data.params||{});
// 			}else{
// 				if(this._active === true){
// 					this._active = false;
// 					this.destruct();
// 				}
// 			}
// 		},
// 		initialize: function(app, location){
// 			this._app = app;
// 			this._location = location;
// 			this._view = this._app._view;
// 			this._app.router.subscribe('router:change', this.check.bind(this));
// 			this.prepare();
// 		},
// 		prepare: function(){
// 			
// 		},
// 		render: function(template,params){
// 			var body = this._view.render(template,params);
// 			this._app._context.innerHTML = body;
// 		}
// 	}
// });