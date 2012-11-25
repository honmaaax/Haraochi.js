#elを定義すればいつでも高速にjQueryを使える！

-----------------------------------------------

##elを定義するとthis.$elと書くだけでjQueryが使える

```javascript
var View = Backbone.View.extend({
	el : '.popup',
	initialize : function(){
		this.$el.show(); // $('.popup').show();と同義
	},
	renderHello : function(){
		this.$el.html('こんにちは'); // $('.popup').html('こんにちは');と同義
	},
	renderGoodBye : function(){
		$('.popup').html('さようなら'); // 普通に書くことも可
	}
});
var v = new View();
```

※elはelement（和訳すると"要素"）の略記  
※jQuery（またはZepto）を事前に読み込んでおく必要があります

##elのメリットは？

この書き方のメリットは「処理が高速」になること。  
毎回`$('.popup')`と書くよりも、`var $el = $('.popup');`のように変数に入れて利用したほうが高速。

##elの定義はインスタンス化するときでもOK！

```javascript
var View = Backbone.View.extend({
	initialize : function(){
		this.$el.show();
	}
});
var v = new View({
	el : '.popup'
});
```

##elに指定するDOM要素は定義前に必要

クラス定義後に生成しても正しく動作しない

```javascript
var View = Backbone.View.extend({
	el : '.popup',
	initialize : function(){
		this.$el.html('こんにちは'); // 表示されない
	}
});
var v = new View();
$('<div class="popup" />').appendTo('.container');
```

クラス定義前に生成すれば正しく動作する

```javascript
$('<div class="popup" />').appendTo('.container');
var View = Backbone.View.extend({
	el : '.popup',
	initialize : function(){
		this.$el.html('こんにちは'); // 表示される
	}
});
var v = new View();
```

インスタンス化する時にelを定義するなら、インスタンス化より前に生成すれば正しく動作する

```javascript
var View = Backbone.View.extend({
	initialize : function(){
		this.$el.html('こんにちは'); // 表示される
	}
});
$('<div class="popup" />').appendTo('.container');
var v = new View({
	el : '.popup'
});
```