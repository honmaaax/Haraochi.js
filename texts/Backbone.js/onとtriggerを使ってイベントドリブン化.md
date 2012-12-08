#onとtriggerを使ってイベントドリブン化

-----------------------------------------------

##onとtriggerの役割

- `trigger` イベントを発火するメソッド（トリガー）
- `on` イベントとメソッドを紐付けるメソッド

※この場合のイベントとは、DOMイベントではなくJS内のイベント

##onを先に設定してからtriggerを実行する

```javascript
var View = Backbone.View.extend({
	initialize : function(){
		this.on('render', this.showPopup);
	},
	render : function(){
		this.trigger('render');
	},
	showPopup : function(){
		// renderイベントが発火されたらココが実行！
	}
});
var v = new View();
```

##この書き方（イベントドリブン）のメリット

1. 各メソッドが疎結合（依存性の低い状態）になりやすい
2. 独立性が高いのでライブラリ化（他の場面で流用）しやすい
3. ユニットテストコードを書きやすい

※詳細は「イベントドリブン」で検索して下さい

##複数設定することも可能

同じイベントを適用した場合は、`on`を設定した順に実行されます。

```javascript
var View = Backbone.View.extend({
	initialize : function(){
		this.on('render', this.checkDate);
		this.on('HappyNewYear', this.showNewYearPopup);
		this.on('MerryXmas', this.showXmasPopup);
		this.on('MerryXmas', this.showXmasMessage);
	},
	render : function(){
		this.trigger('render');
	},
	checkDate : function(){
		// renderイベントが発火されたらココが実行！
		var month = new Date().getMonth()+1;
		if( month===1 ){
			this.trigger('HappyNewYear');
		} else if( month===12 ){
			this.trigger('MerryXmas');
		}
	},
	showNewYearPopup : function(){
		// HappyNewYearイベントが発火されたらココが実行！
	},
	showXmasPopup : function(){
		// MerryXmasイベントが発火されたらココが実行！
	},
	showXmasMessage : function(){
		// MerryXmasイベントが発火されたらココが実行！
	}
});
var v = new View();
```

##引数を渡すことも可能

`trigger`の第二引数以降が、コールバックメソッドの引数になる。

```javascript
var View = Backbone.View.extend({
	initialize : function(){
		this.on('postComment', this.showPopup);
		this.on('sendMessage', this.showPopup);
	},
	postComment : function(){
		this.trigger('postComment', 'コメントを投稿しました');
	},
	sendMessage : function(){
		this.trigger('sendMessage', 'メッセージを送りました');
	},
	showPopup : function(text){
		// postCommentまたはsendMessageイベントが発火されたらココが実行！
		$('#popupText').text(text);
		$('#popup').show();
	}
});
var v = new View();
```

