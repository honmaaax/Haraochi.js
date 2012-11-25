#Backbone.jsの最もシンプルな使い方

-----------------------------------------------

##最小限な使い方

まず先にbackbone.jsを利用するために必要なunderscore.js（or Lodash）とjQuery（or Zepto）の2ファイルを読み込んでから、backbone.js本体を読み込む

```html
<script src="underscore.js"></script>
<script src="jquery.js"></script>
<script src="backbone.js"></script>
<script src="script.js"></script>
```

最もシンプルな「Model」の書き方

```javascript
var m = new Backbone.Model();
```

最もシンプルな「View」の書き方

```javascript
var v = new Backbone.View();
```

##newした瞬間に何かを実行したい場合

initializeを使えばOK！（Viewも同様）

```javascript
var Model = Backbone.Model.extend({
	initialize : function(){
		console.log("Modelが作られたよ！");
	}
});
var m = new Model(); // "Modelが作られたよ！"
```

##クラスにメソッドを追加したい場合

Modelにメソッドを追加する方法（Viewも同様）

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