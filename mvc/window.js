(function(context){
	function Window(options){
		options = options || {
			context: document,
			views: []
		};
		this._views = {
			global: [],
			local: []
		}
		this.options = options;
		this._body = null;
		this.initiate();
	}
	
	Window.prototype.initiate = function(){
		$(this.options.context.body).html('<div id="zippy-container"></div>');
		this.ready = true;
		Zippy.Event.fire('window:ready');
	}
		
	Window.prototype.onReady = function(data){
		if(data.selector === this._base._context.selector){
			this.addBodyView();
			this.addDefaultViews();
			this.ready = true;
			Zippy.Event.stopListening('view:displayed', this.onReady.bind(this));
			Zippy.Event.fire('window:ready');
		}
	}
	
	Window.prototype.setTitle = function(title){
		this.options.context.title = title;
	}
	
	Window.prototype.getBodyView = function(){
		return this._body;
	}
	
	Window.prototype.getView = function(selector, cb){
		var view = null;
		for(var name in this._views.local){
			if(this._views.local[name].selector === selector){
				view = this._views.local[name];
				break;
			}
		}
		//if a local view responds, don't go to the globals
		if(view){
			cb(view);
			return;
		}

		for(var name in this._views['global']){
			if(this._views['global'][name].selector === selector){
				cb(this._views['global'][name]);
				break;
			}
		}
	}
	
	Window.prototype.update = function(data){
		this._body.display(data.template, data.data);
	}
	
	context.Window = Window;
	Class.mixin(context.Window, context.Mixin.Event);
})(Zippy);