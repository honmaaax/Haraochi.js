define([], function(){
	return function(){
		describe('Backbone.jsの最もシンプルな使い方', function(){
			it('最小限な使い方', function(){
				var m = new Backbone.Model();
				var v = new Backbone.View();
				expect(m).toBeDefined();
				expect(v).toBeDefined();
			});
			it('newした瞬間に何かを実行したい場合', function(){
				var isInit;
				var Model = Backbone.Model.extend({
					initialize : function(){
						isInit = true;
					}
				});
				var m = new Model();
				expect(isInit).toBeTruthy();
			});
			it('クラスにメソッドを追加したい場合', function(){
				var Model = Backbone.Model.extend({
					methodA : function(){
						console.log("methodAが呼ばれたよ！");
					},
					methodB : function(){
						console.log("methodBが呼ばれたよ！");
					}
				});
				var m = new Model();
				var stubs = [
					sinon.stub(m, 'methodA'),
					sinon.stub(m, 'methodB')
				]
				m.methodA();
				m.methodB();
				expect(stubs[0]).toHaveBeenCalledOnce();
				expect(stubs[1]).toHaveBeenCalledOnce();
				stubs[0].restore();
				stubs[1].restore();
			});
		});
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
