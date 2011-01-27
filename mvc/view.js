(function(){
	var _ajax = this.Ajax;
	var _template = this.Template;
	
	function View(context, template){
		this.selector = context;
		this._context = $(context);
		this._data = {};
		if(template){
			this._templateFile = template;
			this.fetchTemplate(this._templateFile);
		}
		Zippy.Event.fire('view:new', {view: this});
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
	
	View.prototype.update = function(selector, content){
		$(selector,this._context).html(content);
	}
	
	View.prototype.select = function(){
		this._context = $(this._context.selector);
	}
	
	View.prototype.display = function(data, template){
		if(this._context.length === 0){
			this.select();
		}
		this.listen();
		if(this._templateFile && !this._template && !template){
			this.on('template:loaded', this.display.bind(this));
			this.fetchTemplate(this._templateFile);
			return;
		}else{
			this.stopListening('template:loaded', this.display.bind(this));
		}
		
		if(this._template||template){
			this.render(template||this._template,data||this._data);
		}
		//this.fire('view:displayed');
		Zippy.Event.fire('view:displayed', {selector: this._context.selector});
	}
	
	View.prototype.render = function(template,data){
		this._context.html(_template.render(template, data));
	}
	this.View = View;
	Class.mixin(this.View, this.Mixin.Event);
}).call(Zippy);