(function(){
	var self = this;
	function App(ctx, config){
		this._context = ctx || document.body;
		this._controllers = [];
		this._properties = {};
		config = config || {};
		for(var name in config){
			this._properties[name] = config[name];
		}
		this.addWindow();
	};
	
	App.prototype.addWindow = function(){
		this._window = new self.Window({
			context: this._context,
			views: this._properties.layout.views['global'],
			template: this._properties.layout.template,
			base: this._properties.layout.context
		});
		this._window.display();
	}
	
	App.prototype.stop = function(){
		this.router.stop();
	};
	
	App.prototype.onPrepare = function(data){
		for(var name in this._routing){
			this._routing[name].prepare(this, name);
			this._routing[name].on('view:update', this._window.update.bind(this._window));
		}
	};
	
	App.prototype.onChangeLocation = function(data){
		this.fire('controller:destruct', {
			location: data.old
		});
		this.fire('controller:construct', {
			location: data.url
		});
	};
	
	App.prototype.listen = function(routing){
		this._routing = routing;
		this.router = new self.Router();
		this.router.on('router:prepare', this.onPrepare.bind(this));
		this.router.on('router:change', this.onChangeLocation.bind(this));
		this.router.prepare();
	};
	
	App.prototype.redirect = function(location){
		window.location = window.location.protocol + '//' + window.location.host + window.location.pathname + '#' + location;
	};
	
	App.prototype.setViewAdapter = function(adapter){
		this._view = adapter;
	};
	this.App = App;
	Class.mixin(this.App, this.Event);
}).call(Zippy);