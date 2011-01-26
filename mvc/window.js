(function(){
	var _ajax = this.Ajax;
	var _template = this.Template;
	var _view = this.View;
	function Window(options){
		options = options || {
			context: document.body,
			views: []
		};
		this._views = {
			global: [],
			local: []
		}
		this._context = $(options.context);
		this._base = new _view(options.base||document.body);
		
		
		for(var i=0; i< options.views.length; i++){
			options.views[i].view.setData(options.views[i].data);
			this._views['global'].push(options.views[i].view);
		}
		
		if(options.template){
			this._file = options.template;
			this.fetch(this._file);
		}
		this.on('window:displayed', this.onDisplayed.bind(this));
	}
	
	Window.prototype.onDisplayed = function(){
		this._base.display();
		
		if(this._views['global'].length == 0){
			return;
		}
		for(var i=0; i< this._views['global'].length; i++){
			this._views['global'][i].display();
		}
	}
	
	Window.prototype.fetch = function(url){
		if(!this._fetching){
			this._fetching = true;
			_ajax.get(url, this.onFetch.bind(this));
		}
	}
	
	Window.prototype.onFetch = function(content){
		this._fetching = false;
		this._content = content;
		this.fire('window:ready');
	}
	
	Window.prototype.addView = function(view){
		var element = $(view.selector, this._context);
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
		this._base.display(data.data, data.template);
	}
	
	Window.prototype.display = function(data){
		if(!this._content && this._file){
			this.on('window:ready', this.display.bind(this));
			this.fetch(this._file);
			return;
		}
		
		if(this._file){
			this.render(this._content, data);
		}else{
			this.render('{{body}}', data);
		}
		this.fire('window:displayed');
	}
	
	Window.prototype.render = function(template, data){
		this._context.html(_template.render(template,data));
	}
	
	Class.mixin(Window,this.Event);
	this.Window = Window;
}).call(Zippy);