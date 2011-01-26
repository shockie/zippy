(function(){
	function Router(routing){
		this._routing = routing || {};
	}
	
	Router.prototype.dispatch = function(loc){
		var location = this.parse(loc.hash || '');
		if(!this._location){
			this._location = location;
		}else if(this._location === location){
			return;
		}
		var old = this._location;
		this._location = location;
		this.fire('router:change', {
			url:this._location,
			old:old
		});
	}
	
	Router.prototype.prepare = function(){
		this._interval = setInterval(function(){
			this.dispatch(window.location);
		}.bind(this), 100);
		this.fire('router:prepare');
	}
	
	Router.prototype.stop = function(){
		clearInterval(this._interval);
		delete this._interval;
	}
	
	Router.prototype.parse = function(location){
		if(location.indexOf('#') === 0){
			location = location.substr(1);
		}
		return location;
	}
	this.Router = Router;
	Class.mixin(this.Router,this.Event);
}).call(Zippy);