(function(context){
	function View(context, template){
		this.selector = context;
		this._delegate = null;
		this._context = $(context);
		this._template = '';
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
	
	View.prototype.getContext = function(){
		return this._context;
	}
	
	View.prototype.setDelegate = function(delegate){
		this._delegate = delegate;
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
			context.Ajax.get(url,this.onTemplateFetched.bind(this));
		}
	}
	
	View.prototype.listen = function(){
		if(this._delegate && this._delegate.listen){
			this._delegate.listen(this._context);
		}
	}
	
	View.prototype.update = function(selector, content){
		$(selector,this._context).html(content);
	}
	
	View.prototype.select = function(){
		this._context = $(this._context.selector);
	}
	
	View.prototype.isReady = function(){
		if(this._templateFile && !this._template){
			return false;
		}
		
		if(this._context.length === 0){
			return false;
		}
		return true;
	}
	
	View.prototype.display = function(template, data){
		this.on('template:loaded', this.display.bind(this));
		if(!this.isReady()){
			this.select();
			this.fetchTemplate(this._templateFile);
			return;
		}
		this.stopListening('template:loaded', this.display.bind(this));
		this.listen();
		
		if(typeof template === 'string'){
			this._template = template;
		}
		this.render(this._template,data||this._data);
		Zippy.Event.fire('view:displayed', {selector: this._context.selector});
	}
	
	View.prototype.render = function(template,data){
		this._context.html(context.Template.render(template, data));
	}
	context.View = View;
	Class.mixin(context.View, context.Mixin.Event);
})(Zippy);