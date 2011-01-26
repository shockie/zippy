(function(){
	var _ajax = this.Ajax;
	var _template = this.Template;
	var _view = this.View;
	function Window(options){
		options = options || {
			context: document.body,
			views: [],
		};
		this._context = $(options.context);
		this._base = new _view(options.base||document.body);
		
		this._views = [];
		for(var i=0; i< options.views.length; i++){
			options.views[i].view.setData(options.views[i].data);
			this._views.push(options.views[i].view);
		}
		
		if(options.template){
			this._file = options.template;
			this.fetch(this._file);
		}
		this.on('window:displayed', this.onDisplayed.bind(this));
	}
	
	Window.prototype.onDisplayed = function(){
		this._base.display();
		
		if(this._views.length == 0){
			return;
		}
		for(var i=0; i< this._views.length; i++){
			this._views[i].display();
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