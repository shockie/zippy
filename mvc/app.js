(function(){
	var self = this;
	function App(ctx, config){
		if(!config){
			$(document.body).html('<div id="zippy-container"></div>');
			this._context = $(document.body).find('#zippy-container');
			config = ctx;
		}else{
			this._context = ctx;
		}
		this._routing = {};
		this._properties = {};
		config = config || {};
		for(var name in config){
			this._properties[name] = config[name];
		}
		this.addWindow();
	}
	
	App.prototype.addWindow = function(){
		this._window = new self.Window({
			context: this._context,
			views: this._properties.layout.views,
			template: this._properties.layout.template,
			base: this._properties.layout.context
		});
		this._window.display();
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
		for(var location in routing){
			this.addController(location, routing[location]);
		}
		this.router = new self.Router();
		Zippy.Event.on('router:change', this.onChangeLocation.bind(this));
		this.router.prepare();
	}
	
	App.prototype.redirect = function(location){
		window.location = window.location.protocol + '//' + window.location.host + window.location.pathname + '#' + location;
	};
	
	App.prototype.addController = function(location, controller){
		if(!this._routing[location]){
			this._routing[location] = controller;
			this._routing[location].prepare(this._window, location);
			Zippy.Event.on('view:update', this._window.update.bind(this._window));
		}
	}
	this.App = App;
	Class.mixin(this.App, this.Mixin.Event);
}).call(Zippy);