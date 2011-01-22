var App = Class.create({
	properties: {
		layout: 'static/templates/base.mustache'
	},
	methods: {
		initialize: function(context, config){
			this._context = document.getElementById(context) || document.body;
			this._views = {};
			config = config || {};
			for(var name in config){
				this.set(name, config[name],{ silent: true});
			}		
			this.addView('base',new View(this._context, this.get('layout')));
			this.getView('base').subscribe('view:displayed', this.addDefaultViews.bind(this));
			this.getView('base').display();
		},
		addDefaultViews: function(){
			this.addView('header', new View(document.getElementsByTagName('header')[0]));
			this.addView('main', new View(document.getElementById('main')));
			this.addView('footer', new View(document.getElementsByTagName('footer')[0]));
		},
		addView: function(name, view){
			this._views[name] = view;
		},
		getView: function(name){
			return this._views[name];
		},
		removeView: function(name){
			delete this._view[name];
		},
		start: function(){
			this._interval = setInterval(function(){
				this.router.dispatch(window.location);
			}.bind(this), 100);
		},
		stop: function(){
			stopInterval(this._interval);
		},
		listen: function(routers){
			this.router = new Router();
			for(var name in routers){
				routers[name] = new routers[name](this, name);
			}
			this.router.setTable(routers);
			this.start();
		},
		redirect: function(location){
			window.location = window.location.protocol + '//' + window.location.host + window.location.pathname + '#' + location;
		},
		setViewAdapter: function(adapter){
			this._view = adapter;
		}
	}
});