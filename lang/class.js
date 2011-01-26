var Class = {};

Class.mixin = function(Child,Parent){
	for(var name in Parent.prototype){
		Child.prototype[name] = Parent.prototype[name];
	}
}
