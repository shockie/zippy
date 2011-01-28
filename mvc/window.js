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
		this.addHeadView();
		this.addBaseView();
	}
	
	Window.prototype.addHeadView = function(){
		this._head = new context.View('head');
	}
	
	Window.prototype.addBaseView = function(){
		this._base = new context.View($('#zippy-container'), this.options.template || null);
		Zippy.Event.on('view:displayed', this.onDisplayed.bind(this));
		this._base.display();
	}
	
	Window.prototype.onDisplayed = function(data){
		if(data.selector === this._base._context.selector){
			this._body = new context.View(this.options.base);
			this._body.display();
			for(var i=0; i< this.options.views.length; i++){
				this.options.views[i].view.setData(this.options.views[i].data);
				this._views['global'].push(this.options.views[i].view);
			}
			if(this._views['global'].length == 0){
				return;
			}
			for(var i=0; i< this._views['global'].length; i++){
				if($(this._views['global'][i].selector), this._base._context){
					this._views['global'][i].display();
				}else{
					this._view['global'].splice(i,1);
				}
			}
			this.ready = true;
			Zippy.Event.stopObserving('view:displayed', this.onDisplayed.bind(this));
			Zippy.Event.fire('window:ready');
		}
	}
	
	Window.prototype.addView = function(view){
		var element = $(view.selector, this.options.context);
		if(element.length === 0){
			return false;
		}
		this._views.local.push(view);
		return true;
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
		this._body.display(data.data, data.template);
	}
	
	context.Window = Window;
	Class.mixin(context.Window, context.Mixin.Event);
})(Zippy);