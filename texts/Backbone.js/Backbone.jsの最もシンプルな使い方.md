#Backbone.jsの最もシンプルな使い方

-----------------------------------------------

##概要

Backbone.jsは、JavaScriptでMVCモデルを実現しやすくするために使うフレームワークです。  
  
ただ、MVCのうちコントローラーにあたる「C」はBackbone.jsには存在せず、  
代わりに「Model（モデル）」「View（ビュー）」「Router（ルーター）」が用意されており、  
事実上、これらがそれぞれコントローラーの役割を分担しています。

##使い方

(1) 先にbackbone.jsライブラリファイル本体を読み込む

```html
<script src="backbone.js"></script>
<script src="script.js"></script>
```

(2) 最もシンプルな「Model」の書き方

```javascript
var m = new Backbone.Model();
```

(3) 最もシンプルな「View」の書き方

```javascript
var v = new Backbone.View();
```

##クラスにメソッドを追加していく方法

(1) 「Model」にメソッドを追加

```javascript
var Model = Backbone.Model.extend({
	initialize : function(){
		console.log("Modelが作られたよ！");
	},
	methodA : function(){
		console.log("methodAが呼ばれたよ！");
	},
	methodB : function(){
		console.log("methodBが呼ばれたよ！");
	}
});
var m = new Model(); // "Modelが作られたよ！"
m.methodA(); // "methodAが呼ばれたよ！"
m.methodB(); // "methodBが呼ばれたよ！"
```

(2) 「View」にメソッドを追加

```javascript
var View = Backbone.View.extend({
	initialize : function(){
		console.log("Viewが作られたよ！");
	},
	methodA : function(){
		console.log("methodAが呼ばれたよ！");
	},
	methodB : function(){
		console.log("methodBが呼ばれたよ！");
	}
});
var v = new View(); // "Viewが作られたよ！"
v.methodA(); // "methodAが呼ばれたよ！"
v.methodB(); // "methodBが呼ばれたよ！"
```