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
	
	App.prototype.listen = function(){
		this.router = new context.Router();
		this.prepare();
	}
	
	App.prototype.redirect = function(location){
		window.location.hash = '#' + location;
	}
	
	App.prototype.prepare = function(){
		this.router.prepare();
	}
	
	context.App = App;
	Class.mixin(context.App, context.Mixin.Event);
})(Zippy);