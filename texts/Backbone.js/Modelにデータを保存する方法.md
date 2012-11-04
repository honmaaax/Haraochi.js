#Modelにデータを保存する方法

-----------------------------------------------

(1) 最もシンプルなデータ保存

```javascript
var m = new Backbone.Model();
m.set({name : "まっくす"});
console.log( m.get("name") ); // "まっくす"
```

(2) 複数データの保存

```javascript
var m = new Backbone.Model();
m.set({
	name : "まっくす",
	age : 28,
	id : 1234567890
});
console.log( m.get("name") ); // "まっくす"
console.log( m.get("age") ); // 28
console.log( m.get("id") ); // 1234567890
```

(3) インスタンス化するときの引数を利用したデータ保存

```javascript
var m = new Backbone.Model({
	name : "まっくす",
	age : 28,
	id : 1234567890
});
console.log( m.get("name") ); // "まっくす"
console.log( m.get("age") ); // 28
console.log( m.get("id") ); // 1234567890
```

(4) クラス内部でのデータ保存

```javascript
var Model = Backbone.Model.extend({
	initialize : function(){
		this.set({
			name : "まっくす",
			age : 28,
			id : 1234567890
		});
	}
});
var m = new Model();
console.log( m.get("name") ); // "まっくす"
console.log( m.get("age") ); // 28
console.log( m.get("id") ); // 1234567890
```