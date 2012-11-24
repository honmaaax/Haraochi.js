#DOMイベントを定義する（eventsとdelegateEvents）

-----------------------------------------------

##DOMイベントを定義する方法は2つ

jQueryで書くとこんな記述

```javascript
var render = function(){
	//.buttonがクリックされたらココが実行されるよ！
};
$('.container').find('.button').on('click', render);
```

をBackbone.jsで書くと以下。  
  
(1) eventsを使う方法

```javascript
var View = Backbone.View.extend({
	el : '.container',
	events : {
		'click .button' : 'render'
	},
	render : function(){
		//.buttonがクリックされたらココが実行されるよ！
	}
});
var v = new View();
```

(2) delegateEventsを使う方法

```javascript
var View = Backbone.View.extend({
	el : '.container',
	initialize : function(){
		this.delegateEvents({
			'click .button' : 'render'
		});
	},
	render : function(){
		//.buttonがクリックされたらココが実行されるよ！
	}
});
var v = new View();
```

**※eventsやdelegateEventsを使うときは必ずelを指定しないとダメ**

##複数のDOM要素に同じイベントを同時適用することも可能

こんな感じで指定することもできるし、

```javascript
var View = Backbone.View.extend({
	el : '.container',
	events : {
		'click .button' : 'render',
		'click .menu' : 'render',
		'click .refresh' : 'render'
	},
	render : function(){
		//.buttonか.menuか.refreshがクリックされたらココが実行！
	}
});
var v = new View();
```

カンマ区切りで指定することもできる。

```javascript
var View = Backbone.View.extend({
	el : '.container',
	events : {
		'click .button, .menu, .refresh' : 'render'
	},
	render : function(){
		//.buttonか.menuか.refreshがクリックされたらココが実行！
	}
});
var v = new View();
```

##複数のDOMイベントを追加することも可能

```javascript
var View = Backbone.View.extend({
	el : '.container',
	events : {
		'click .button' : 'render',
		'click .menu' : 'goToOtherPage',
		'mouseover .menu' : 'hoverMenu',
		'focus .text_field' : 'showForm'
	},
	render : function(){
		//.buttonがクリックされたらココが実行されるよ！
	},
	goToOtherPage : function(){
		//.menuがクリックされたらココが実行されるのじゃ！
	},
	hoverMenu : function(){
		//.menuの上にカーソルが載ったらココが実行されるぜ！
	},
	showForm : function(){
		//.text_fieldがフォーカスを受け取ったらココが実行だ！
	}
});
var v = new View();
```

##eventsで指定したDOM要素はいつ生成してもイベントが適用される

クラスを定義する前に生成しても動くし、

```javascript
$('<div class="popup" />').appendTo('.container');
var View = Backbone.View.extend({
	el : '.container',
	events : {
		'click .popup' : 'render'
	},
	render : function(){
		//.popupがクリックされたらココが実行されるよ！
	}
});
var v = new View();
```

インスタンス化した後に生成しても動く

```javascript
var View = Backbone.View.extend({
	el : '.container',
	events : {
		'click .popup' : 'render'
	},
	render : function(){
		//.popupがクリックされたらココが実行されるよ！
	}
});
var v = new View();
$('<div class="popup" />').appendTo('.container');
```

