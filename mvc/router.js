var Router = Class.create({
	properties: {
		
	},
	methods: {
		initialize: function(){
		},
		setTable: function(routers){
			this._routing = routers;
		},
		dispatch: function(loc){
			var location = this.parse(loc.hash || '');
			if(!this._location){
				this._location = location;
			}else if(this._location === location){
				return;
			}
			this._location = location;
			//this.trigger('url:change', {url:this._location});
			var match;
			for(var name in this._routing){
				//found a match!
				var regex = XRegExp(name);
				if(regex.test(this._location)){
					match = regex.exec(this._location);
					break;
				}
			}
			
			if(match){
				this.trigger('router:change', {
					location: this._location,
					params: match
				});
			}
		},
		parse: function(location){
			if(location.indexOf('#') === 0){
				location = location.substr(1);
			}
			return location;
		}
	}
});