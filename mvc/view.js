(function(){
	var _ajax = this.Ajax;
	var _template = this.Template;	
	function View(context, template){
		this._context = context;
		this._data = {};
		this._templateFile = template;
		this.fetchTemplate(this._templateFile, this.onTemplateFetched.bind(this));
	}
	
	View.prototype.setData = function(data){
		this._data = data;
	}
	
	View.prototype.setTemplate = function(template){
		this._templateFile = template;
	}
	
	View.prototype.onTemplateFetched = function(template){
		this._template = template;
	}
	
	View.prototype.fetchTemplate = function(url,cb){
		_ajax.load(url,cb);
	}
	
	View.prototype.display = function(){
		//TODO: add template checking
		this.render();
	}
	
	View.prototype.render = function(){
		this._context.innerHTML = _template.render(this._template, this._data);
	}
	this.View = View;
	Class.mixin(this.View,this.Event);
}).call(Zippy);