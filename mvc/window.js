(function(){
	var _ajax = this.Ajax;
	var _template = this.Template;
	function Window(options){
		options = options || {
			context: document.body,
			views: [],
		};
		this._context = $(options.context);
		this._views = options.views;
		if(options.template){
			this._file = options.template;
			this.fetch(this._file);
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
	
	Window.prototype.display = function(data){
		if(!this._content && this._file){
			this.on('window:ready', this.display.bind(this));
			this.fetch(this._file);
			return;
		}
		
		if(this._file){
			this.render(this._file, data);
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