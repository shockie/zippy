var Zippy = {};
Zippy.Mixin = {};
Zippy.Event = (function(){
	var _listeners = {};
	var _instance = null;
	return new function(){
		
		if(_instance !== null){
			return _instance;
		}
		
		_instance = this;
		
		this.on = function(event, handler){
			if(!_listeners[event]){
				_listeners[event] = [];
			}
			_listeners[event].push(handler);
		}
		
		this.fire = function(event, data){
			if(!event){
				return;
			}
			if(!_listeners[event]){
				return;
			}

			for(var i=0; i < _listeners[event].length; i++){
				_listeners[event][i](data);
			}
		}
		
		this.stopListening = function(event, cb){
			if(!cb || !event || !_listeners[event]){
				return;
			}

			var stringified = cb.toString();
			for(var i=0; i<_listeners[event].length; i++){
				if(_listeners[event][i].toString() === stringified){
					_listeners[event].splice(i,1);
				}
			}
		}
	}
})();

Zippy.Ajax = {
	get: function(url,cb){
		$.get(url,cb);
	}
};

Zippy.Template = {
	render: function(template, data){
		return Mustache.to_html(template, data);
	}
};