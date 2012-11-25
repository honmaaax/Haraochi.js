#delegateEventsとundelegateEventsの独特な挙動

-----------------------------------------------

##eventsを定義しているとdelegateEventsは無視される

```javascript
var View = Backbone.View.extend({
	el : '.container',
	events : {
		'click .button' : 'render'
	},
	initialize : function(){
		this.delegateEvents({
			'click .menu' : 'showMenu'
		});
	},
	render : function(){
		//.buttonがクリックされたらココが実行されるよ！
	},
	showMenu : function(){
		//.menuがクリックされてもココは実行されないよ！
	}
});
var v = new View();
```

##delegateEventsを再実行すると前回の設定は破棄される

```javascript
var View = Backbone.View.extend({
	el : '.container',
	initialize : function(){
		this.delegateEvents({
			'click .button' : 'render'
		});
		this.delegateEvents({
			'click .menu' : 'showMenu'
		});
	},
	render : function(){
		//.buttonがクリックされてもココは実行されないよ！
	},
	showMenu : function(){
		//.menuがクリックされたらココが実行されるよ！
	}
});
var v = new View();
```

##undelegateEventsを実行すると全てのイベントを破棄する

```javascript
var View = Backbone.View.extend({
	el : '.container',
	initialize : function(){
		this.delegateEvents({
			'click .button' : 'render'
		});
		this.undelegateEvents();
	},
	render : function(){
		//.buttonがクリックされてもココは実行されないよ！
	}
});
var v = new View();
```

【補足】引数を与えられないので、一部イベントだけ破棄するようなことはできない。