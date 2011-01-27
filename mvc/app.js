(function(){
	var self = this;
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
		this._window = new self.Window({
			context: this._context,
			views: this._properties.layout.views,
			template: this._properties.layout.template,
			base: this._properties.layout.context
		});
	}
	
	App.prototype.stop = function(){
		this.router.stop();
	}
	
	App.prototype.onChangeLocation = function(data){
		Zippy.Event.fire('controller:destruct', {
			location: data.old
		});
		Zippy.Event.fire('controller:construct', {
			location: data.url
		});
	}
	
	App.prototype.listen = function(routing){
		if(routing){
			for(var location in routing){
				this.addController(location, routing[location]);
			}
		}
		if(this._window.ready){
			Zippy.Event.stopListening('window:ready', this.listen.bind(this));
			this.router = new self.Router();
			Zippy.Event.on('router:change', this.onChangeLocation.bind(this));
			this.prepare();
			this.router.prepare();
		}else{
			Zippy.Event.on('window:ready', this.listen.bind(this));
		}
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
	this.App = App;
	Class.mixin(this.App, this.Mixin.Event);
}).call(Zippy);