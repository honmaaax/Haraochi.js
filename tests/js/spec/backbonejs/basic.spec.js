define(function(){
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
	};
});
