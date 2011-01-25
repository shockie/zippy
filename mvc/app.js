(function(){
	var self = this;
	function App(ctx, config){
		this._context = ctx || document.body;
		this._controller = [];
		this._views = {};
		this._properties = {};
		config = config || {};
		for(var name in config){
			this._properties[name] = config[name];
		}
		
		this._main = new self.Controller({
			respond: function(){
				
			},
			destruct: function(){
				
			}
		});
		this._main.prepare(this._context, this._properties['layout']['template']);

		this.addView('base',new self.View(this._context, this._properties['layout']));
		this.getView('base').on('view:displayed', this.addDefaultViews.bind(this));
		this.getView('base').display();
	};

	App.prototype.addDefaultViews = function(){
		for(var name in this._properties['defaultViews']){
			this._properties['defaultViews'][name]['view'].setData(this._properties['defaultViews'][name]['data']);
			this.addView(name, this._properties['defaultViews'][name]['view']);
			this.getView(name).display();
		}
		// this.addView('header', new self.View('header'));
		// this.addView('main', new self.View('#main'));
		// this.addView('footer', new self.View('footer'));
	};
	
	App.prototype.addView = function(name, view){
		this._views[name] = view;
	};
	
	App.prototype.getView = function(name){
		return this._views[name];
	};
	
	App.prototype.removeView = function(name){
		delete this._view[name];
	};
	
	App.prototype.start = function(){
		this._interval = setInterval(function(){
			this.router.dispatch(window.location);
		}.bind(this), 100);
	};
	
	App.prototype.stop = function(){
		stopInterval(this._interval);
	};
	
	App.prototype.listen = function(router){
		this.router = router;
		this.router.prepare(this);
		this.start();
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