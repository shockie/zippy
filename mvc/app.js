(function(context){
	function App(config){
		this._context = document;
		this._routing = {};
		this._properties = {};
		config = config || {};
		for(var name in config){
			this._properties[name] = config[name];
		}
		this.initiate();
	}
	
	App.prototype.initiate = function(){
		var options = {
			context: this._context,
			views:[]
		};
		
		if(this._properties.views){
			options.views = this._properties.views;
		}
		
		if(this._properties.template){
			options.template = this._properties.template;
		}
		
		if(this._properties.context){
			options.base = this._properties.context;
		}
		
		this._window = new context.Window(options);
	}
	
	App.prototype.stop = function(){
		this.router.stop();
	}
	
	App.prototype.onChangeLocation = function(data){
		if(this._routing[data.old]){
			this._routing[data.old].destruct();
		}
		
		if(this._routing[data.url]){
			this._routing[data.url].construct();
		}
	}
	
	App.prototype.setControllers = function(routing){
		if(routing){
			for(var location in routing){
				this._routing[location] = routing[location];
//				this.addController(location, routing[location]);
			}
		}
	}
	
	App.prototype.listen = function(){
		Zippy.Event.on('router:change', this.onChangeLocation.bind(this));
		this.router = new context.Router();
		this.router.prepare();
		// if(this._window && this._window.ready){
		// 	Zippy.Event.stopListening('window:ready', this.listen.bind(this));
		// 	this.router = new self.Router();
		// 	Zippy.Event.on('router:change', this.onChangeLocation.bind(this));
		// 	this.prepare();
		// 	this.router.prepare();
		// }else{
		// 	Zippy.Event.on('window:ready', this.listen.bind(this));
		// }
	}
	
	App.prototype.redirect = function(location){
		window.location = window.location.protocol + '//' + window.location.host + window.location.pathname + '#' + location;
	}
	
	App.prototype.prepare = function(){
		for(var location in this._routing){
			this._routing[location].prepare(this._window, location);
			//Zippy.Event.on('view:update', this._window.update.bind(this._window));
		}
	}
	
	App.prototype.addController = function(location, controller){
		if(!this._routing[location]){
			this._routing[location] = controller;
		}
	}
	context.App = App;
	Class.mixin(context.App, context.Mixin.Event);
})(Zippy);