#JsRenderの最もシンプルな使い方

-----------------------------------------------

##ファイルを読み込む

まず先にbackbone.jsを利用するために必要なライブラリとして、

* jQuery（or Zepto）

を読み込んでから、JsRender本体を読み込む

```html
<script src="jquery.js"></script>
<script src="jsrender.js"></script>
<script src="script.js"></script>
```

##最小限な書き方

```javascript
var tmpl = "<div>{{:hello}}</div>";
var data = {hello : 'こんにちは'};
var html = $.templates(tmpl).render(data);
console.log(html); // "<div>こんにちは</div>"
```

##複数のプロパティを入れることも可能

```javascript
var tmpl = "<div>{{:name}}は{{:age}}歳で{{:from}}出身です。</div>";
var user = {
	name : 'まっくす',
	age : 29,
	from : '神奈川県'
};
var html = $.templates(tmpl).render(user);
console.log(html); // "<div>まっくすは29歳で神奈川県出身です。</div>"
```