(function(root, _, Backbone){
	var helpers = {
		getCallbacks : function(event){
			var self = this;
			var callbacks = [];
			var func = function(callback){
				if( !callback.next.callback ) return;
				func(callback.next);
				callbacks.push(callback.next.callback);
			};
			var is_expected = !!_.find(
				self._callbacks,
				function(v, k){return k === event}
			);
			if( is_expected ){
				func(self._callbacks[event]);
			}
			return callbacks.reverse();
		},
		existCallback : function(callbacks, func){
			return !!_.find(callbacks, function(callback){
				return callback === func;
			});
		}
	};
	Backbone.Model = Backbone.Model.extend(helpers);
	Backbone.View = Backbone.View.extend(helpers);
	Backbone.Router = Backbone.Router.extend(helpers);
	root.Backbone = Backbone;
})(window, _, Backbone);



