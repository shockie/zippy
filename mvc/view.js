(function(context){
	function View(options){
		this._delegate = null;
		this.options = options || {};
		this._template = '';
		this._data = {};
		
		if(this.options.tag){
			this._context = this.createElement();
		}
				
		if(this.options.template){
			this._templateFile = this.options.template;
			this.fetchTemplate(this._templateFile);
		}
		context.Event.fire('view:new', {view: this});
	}
	
	View.prototype.createElement = function(){
		var element = document.createElement(this.options.tag);
		element.id = this.options.id;
		return $(element);
	}
	
	View.prototype.attachTo = function(selector){
		$(selector).append(this._context);
	}
	
	View.prototype.setData = function(data){
		this._data = data;
	};
	
	View.prototype.getContext = function(){
		return this._context;
	};
	
	View.prototype.setDelegate = function(delegate){
		this._delegate = delegate;
	};
	
	View.prototype.setTemplate = function(template){
		this._templateFile = template;
	};
	
	View.prototype.onTemplateFetched = function(template){
		this._fetching = false;
		this._template = template;
		this.fire('template:loaded');
	};
	
	View.prototype.fetchTemplate = function(url){
		if(!this._fetching){
			this.setTemplate(url);
			this._fetching = true;
			context.Ajax.get(url,this.onTemplateFetched.bind(this));
		}
	};
	
	View.prototype.listen = function(){
		if(this._delegate && this._delegate.listen){
			this._delegate.listen(this._context);
		}
	};
	
	View.prototype.update = function(selector, content){
		if(arguments.length === 2){
			$(selector,this._context).html(content);
		}else if(arguments.length === 1){
			this.display(null,selector);
		}
	};
	
	View.prototype.select = function(){
		this._context = $(this._context.selector);
	};
	
	View.prototype.isReady = function(){
		if(this._templateFile && !this._template){
			return false;
		}
		
		if(this._context.length === 0){
			return false;
		}
		return true;
	};
	
	View.prototype.display = function(template, data){		
		this.on('template:loaded', this.display.bind(this));
		if(!template && !this.isReady()){
			this.select();
			this.setData(data);
			this.fetchTemplate(this._templateFile);
			return false;
		}
		this.stopListening('template:loaded', this.display.bind(this));
		this.listen();
		
		if(typeof template === 'string'){
			this._template = template;
		}
		this.render(this._template,data||this._data);
		context.Event.fire('view:displayed', {selector: this._context.selector});
	};
	
	View.prototype.render = function(template,data){
		this._context.html(context.Template.render(template, data));
	};
	context.View = View;
	Class.mixin(context.View, context.Mixin.Event);
})(Zippy);