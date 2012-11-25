#eventsを使うときはel定義に注意！

-----------------------------------------------

##elを定義しないとevents機能は動かない

```javascript
var View = Backbone.View.extend({
	events : {
		'click .button' : 'render'
	},
	render : function(){
		//.buttonがクリックされてもココが実行されない！
	}
});
var v = new View();
```

【補足】elの定義はインスタンス化するときでもOK！

```javascript
var v = new View({
	el : '.container'
});
```

##elには親要素を定義しないとevents機能は動かない

こんなHTML構成のとき、

```html
<div class="container">
	<div class="button"></div>
</div>
<div class="footer">

</div>
```

こういう書き方をしちゃダメ。

```javascript
var View = Backbone.View.extend({
	el : '.footer',
	events : {
		'click .button' : 'render'
	},
	render : function(){
		//.buttonがクリックされてもココが実行されない！
	}
});
var v = new View();
```

##elにeventsと同じ要素を指定しても動く

```javascript
var View = Backbone.View.extend({
	el : '.button',
	events : {
		'click .button' : 'render'
	},
	render : function(){
		//.buttonがクリックされたらココが実行されるよ！
	}
});
var v = new View();
```

##elにbodyを指定しても動く

bodyを指定しちゃったほうがラクだけど、あんまり多用しないほうが良いです。

```javascript
var View = Backbone.View.extend({
	el : 'body',
	events : {
		'click .button' : 'render'
	},
	render : function(){
		//.buttonがクリックされたらココが実行されるよ！
	}
});
var v = new View();
```