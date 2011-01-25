(function(){
	var _ajax = this.Ajax;
	var _template = this.Template;
	function View(context, template){
		this._context = $(context);
		this._data = {};
		if(template){
			this._templateFile = template;
			this.fetchTemplate(this._templateFile);
		}
		this.fire('view:new', {view: this});
	}
	
	View.prototype.setData = function(data){
		this._data = data;
	}
	
	View.prototype.setTemplate = function(template){
		this._templateFile = template;
	}
	
	View.prototype.onTemplateFetched = function(template){
		this._fetching = false;
		this._template = template;
		this.fire('template:loaded');
	}
	
	View.prototype.fetchTemplate = function(url){
		if(!this._fetching){
			this.setTemplate(url);
			this._fetching = true;
			_ajax.get(url,this.onTemplateFetched.bind(this));
		}
	}
	
	View.prototype.listen = function(){
		
	}
	
	View.prototype.display = function(data){
		//TODO: add template checking
		if(this._context.length == 0){
			this._context = $(this._context.selector);
		}
		
		this.listen();
		
		if(!this._template){
			this.on('template:loaded', this.display.bind(this));
			this.fetchTemplate(this._templateFile);
			return;
		}else{
			this.stopListening('template:loaded', this.display.bind(this));
		}
		this.render(data||this._data);
		this.fire('view:displayed');
	}
	
	View.prototype.render = function(data){
		this._context.html(_template.render(this._template, data));
	}
	this.View = View;
	Class.mixin(this.View,this.Event);
}).call(Zippy);