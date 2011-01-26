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
		this.addMainController();
	};
	
	App.prototype.addMainController = function(){
		var that= this;
		this._window = new self.Window({
			context: this._context,
			views: this._properties.layout.views['global'],
			template: this._properties.layout.template
		}.bind(this));
		
		
		// 
		// this._main = new self.Controller({
		// 	respond: function(){
		// 		//add document.body view;
		// 		var base = new self.View(that._context, that._properties['layout']['template']);
		// 		this.addView(base);
		// 		
		// 		//add other global views when base view is displayed;
		// 		base.on('view:displayed', function(data){
		// 			for(var i=0; i< this._app._properties.layout.views['global'].length;i++){
		// 				this._app._properties.layout.views['global'][i]['view'].setData(this._app._properties.layout.views['global'][i]['data']);
		// 				this.addView(this._app._properties.layout.views['global'][i]['view']);
		// 				this.getView(this._app._properties.layout.views['global'][i]['view'].selector, function(view){
		// 					view.display();
		// 				});
		// 			}
		// 			//add #main view for controllers update;
		// 			var context = new self.View(this._app._properties.layout.context);
		// 			this.addView(context);
		// 			this.getView(this._app._properties.layout.context, function(view){
		// 				view.display();
		// 			});
		// 		}.bind(this));
		// 		
		// 		this.getView(base.selector, function(view){
		// 			view.display();
		// 		});
		// 	},
		// 	destruct: function(){
		// 		
		// 	}
		// });
		// this._main.prepare(this);
		// this._main.respond();
	}
	
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