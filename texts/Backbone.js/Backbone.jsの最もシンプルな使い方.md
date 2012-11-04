#Backbone.jsの最もシンプルな使い方

-----------------------------------------------

##概要

Backbone.jsは、JavaScriptでMVCモデルを実現しやすくするために使うフレームワークです。  
  
ただ、MVCのうちコントローラーにあたる「C」はBackbone.jsには存在せず、  
代わりに「Model（モデル）」「View（ビュー）」「Router（ルーター）」が用意されており、  
事実上、これらがそれぞれコントローラーの役割を分担しています。

##基本的な書き方

(1) 先にbackbone.jsライブラリファイル本体を読み込む

```html
<script src="backbone.js"></script>
<script src="script.js"></script>
```

(2) 最もシンプルな「Model」の書き方

```javascript
// クラス定義
var Model = Backbone.Model.extend({
	initialize : function(){
		console.log("Modelが作られたよ！");
	}
});
// インスタンス化
var m = new Model(); // "Modelが作られたよ！"
```

(3) 最もシンプルな「View」の書き方

```javascript
// クラス定義
var View = Backbone.View.extend({
	initialize : function(){
		console.log("Viewが作られたよ！");
	}
});
// インスタンス化
var v = new View(); // "Viewが作られたよ！"
```

##Modelにデータを保存する方法

(1) 最もシンプルなデータ保存

```javascript
// クラス定義
var Model = Backbone.Model.extend({
	initialize : function(){
		console.log("Modelが作られたよ！");
	}
});
// インスタンス化
var m = new Model(); // "Modelが作られたよ！"
m.set({name : "まっくす"});
console.log( m.get("name") ); // "まっくす"
```

(2) 複数データの保存

```javascript
// クラス定義
var Model = Backbone.Model.extend({
	initialize : function(){
		console.log("Modelが作られたよ！");
	}
});
// インスタンス化
var m = new Model(); // "Modelが作られたよ！"
m.set({
	name : "まっくす",
	age : 28,
	id : 1234567890
});
console.log( m.get("name") ); // "まっくす"
console.log( m.get("age") ); // 28
console.log( m.get("id") ); // 1234567890
```

(3) クラス内部でのデータ保存

```javascript
// クラス定義
var Model = Backbone.Model.extend({
	initialize : function(){
		this.set({
			name : "まっくす",
			age : 28,
			id : 1234567890
		});
	}
});
// インスタンス化
var m = new Model();
console.log( m.get("name") ); // "まっくす"
console.log( m.get("age") ); // 28
console.log( m.get("id") ); // 1234567890
```

(4) インスタンス化するときの引数を利用したデータ保存

```javascript
// クラス定義
var Model = Backbone.Model.extend({
	initialize : function(){
		
	}
});
// インスタンス化
var m = new Model({
	name : "まっくす",
	age : 28,
	id : 1234567890
});
console.log( m.get("name") ); // "まっくす"
console.log( m.get("age") ); // 28
console.log( m.get("id") ); // 1234567890
```