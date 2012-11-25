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
		describe('elで対象となるDOM要素を定義する', function(){
			var self = this;
			beforeEach(function(){
				loadFixtures('../../../html/backbonejs.html');
			});
			afterEach(function(){
				self.stub && self.stub.restore();
				self.stubs && _.each(self.stubs, function(stub){stub.restore();});
			});
			it('elを定義するとthis.$elと書くだけでjQueryが使える', function(){
				$('<div class="popup" />').appendTo('.container').hide();
				var View = Backbone.View.extend({
					el : '.popup',
					initialize : function(){
						this.$el.show(); // $('.popup').show();と同義
					},
					renderHello : function(){
						this.$el.html('こんにちは'); // $('.popup').html('こんにちは');と同義
					},
					renderGoodBye : function(){
						$('.popup').html('さようなら'); // 普通に書くことも可
					}
				});
				var v = new View();
				var $el = $('.popup');
				expect($el.css('display')).toEqual('block');
				v.renderHello();
				expect($el.html()).toEqual('こんにちは');
				v.renderGoodBye();
				expect($el.html()).toEqual('さようなら');
				$el.remove();
			});
			it('elの定義はインスタンス化するときでもOK！', function(){
				$('<div class="popup" />').appendTo('.container').hide();
				var View = Backbone.View.extend({
					initialize : function(){
						this.$el.show();
					}
				});
				new View({el : '.popup'});
				var $el = $('.popup');
				expect($el.css('display')).toEqual('block');
				$el.remove();
			});
			describe('elに指定するDOM要素はクラス定義より前に必要', function(){
				it('クラス定義より後に生成しても正しく動作しない', function(){
					var View = Backbone.View.extend({
						el : '.popup',
						initialize : function(){
							this.$el.html('こんにちは'); // 表示されない
						}
					});
					var v = new View();
					$('<div class="popup" />').appendTo('.container');
					var $el = $('.popup');
					expect($el.html()).not.toEqual('こんにちは');
					$el.remove();
				});
				it('クラス定義より前に生成すれば正しく動作する', function(){
					$('<div class="popup" />').appendTo('.container');
					var View = Backbone.View.extend({
						el : '.popup',
						initialize : function(){
							this.$el.html('こんにちは'); // 表示される
						}
					});
					var v = new View();
					var $el = $('.popup');
					expect($el.html()).toEqual('こんにちは');
					$el.remove();
				});
				it('インスタンス化する時にelを定義するなら、インスタンス化より前に生成すれば正しく動作する', function(){
					var View = Backbone.View.extend({
						initialize : function(){
							this.$el.html('こんにちは'); // 表示される
						}
					});
					$('<div class="popup" />').appendTo('.container');
					var v = new View({
						el : '.popup'
					});
					var $el = $('.popup');
					expect($el.html()).toEqual('こんにちは');
					$el.remove();
				});
			});
		});
	};
});
