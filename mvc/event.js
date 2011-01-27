(function(){
	function Event(){
		this._listeners = {};
	}
	
	Event.prototype.on = function(event, handler){
		if(!this._listeners){
			this._listeners = {};
		}
		if(!this._listeners[event]){
			this._listeners[event] = [];
		}
		this._listeners[event].push(handler);
	}
	
	Event.prototype.fire = function(event, data){
		if(!this._listeners){
			this._listeners = {};
			return;
		}
		if(!event){
			return;
		}
		
		if(!this._listeners[event]){
			return;
		}
		
		for(var i=0; i < this._listeners[event].length; i++){
			this._listeners[event][i](data);
		}
	}
	
	Event.prototype.stopListening = function(event, cb){
		if(!this._listeners){
			this._listeners = {};
			return;
		}
		
		if(!cb || !event || !this._listeners[event]){
			return;
		}
		
		var stringified = cb.toString();
		for(var i=0; i<this._listeners[event].length; i++){
			if(this._listeners[event][i].toString() === stringified){
				this._listeners[event].splice(i,1);
			}
		}
	}
	this.Mixin.Event = Event;
}).call(Zippy);