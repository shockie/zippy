var View = Class.create({
	methods: {
		initialize: function(context, template){
			this.set('context', context, {silent: true});
			this.set('data', {}, {silent: true});
			if(template){
				this.fetchTemplate(template);
			}
		},
		setData: function(data){
			this.set('data', data);
		},
		setTemplate: function(url){
			this.fetchTemplate(url);
		},
		fetchTemplate: function(url){
			View.Ajax.load(url,function(template){
				this.set('template', template, {silent: true});
				this.trigger('view:loaded', {loaded: true});
			}.bind(this));
		},
		display: function(data){
			if(!this.get('template')){
				this.subscribe('view:loaded', this.display.bind(this));
				return;
			}
			if(data){
				this.unsubscribe('view:loaded', this.display.bind(this));
			}
			this.render();
			this.trigger('view:displayed');
		},
		render: function(){
			this.get('context').innerHTML = View.Template.render(this.get('template'), this.get('data'));
		}
	}
});
// make jx global to the view module;
View.Ajax = jx;
View.Template = {
	render: function(template, data){
		return Mustache.to_html(template, data);
	}
};