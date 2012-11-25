define(function(){
	return function(){
		describe('Modelにデータを保存する方法', function(){
			it('最もシンプルなデータ保存', function(){
				var m = new Backbone.Model();
				m.set({name : "まっくす"});
				expect(m.get("name")).toEqual("まっくす");
			});
			it('複数データの保存', function(){
				var m = new Backbone.Model();
				m.set({
					name : "まっくす",
					age : 28,
					id : 1234567890
				});
				expect(m.get("name")).toEqual("まっくす");
				expect(m.get("age")).toEqual(28);
				expect(m.get("id")).toEqual(1234567890);
			});
			it('インスタンス化するときの引数を利用したデータ保存', function(){
				var m = new Backbone.Model({
					name : "まっくす",
					age : 28,
					id : 1234567890
				});
				expect(m.get("name")).toEqual("まっくす");
				expect(m.get("age")).toEqual(28);
				expect(m.get("id")).toEqual(1234567890);
			});
			it('クラス内部でのデータ保存', function(){
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
				expect(m.get("name")).toEqual("まっくす");
				expect(m.get("age")).toEqual(28);
				expect(m.get("id")).toEqual(1234567890);
			});
		});
	};
});
