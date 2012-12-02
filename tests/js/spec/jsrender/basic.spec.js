define(function(){
	return function(){
		describe('JsRenderの最もシンプルな使い方', function(){
			it('最小限な使い方', function(){
				var tmpl = "<div>{{:hello}}</div>";
				var data = {hello : 'こんにちは'};
				var html = $.templates(tmpl).render(data);
				expect(html).toEqual('<div>こんにちは</div>');
			});
			it('複数のプロパティを入れることも可能', function(){
				var tmpl = "<div>{{:name}}は{{:age}}歳で{{:from}}出身です。</div>";
				var user = {
					name : 'まっくす',
					age : 29,
					from : '神奈川県'
				};
				var html = $.templates(tmpl).render(user);
				expect(html).toEqual('<div>まっくすは29歳で神奈川県出身です。</div>');
			});
			it('エスケープさせる方法', function(){
				var tmpl = "<div>{{>name}}さん、こんにちは。</div>";
				var user = {name : '<script></script>'};
				var html = $.templates(tmpl).render(user);
				expect(html).toEqual('<div>&lt;script&gt;&lt;/script&gt;さん、こんにちは。</div>');
			});
		});
	};
});
