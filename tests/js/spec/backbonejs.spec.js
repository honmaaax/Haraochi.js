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
		describe('DOMイベントを定義する（eventsとdelegateEvents）', function(){
			var self = this;
			beforeEach(function(){
				loadFixtures('../../../html/backbonejs.html');
			});
			afterEach(function(){
				self.stub && self.stub.restore();
				self.stubs && _.each(self.stubs, function(stub){stub.restore();});
			});
			describe('DOMイベントを定義する方法は2つ', function(){
				it('jQueryで書くとこんな記述', function(){
					var render = sinon.spy();
					$('.container').find('.button').on('click', render);
					$('.container').find('.button').trigger('click');
					expect(render).toHaveBeenCalledOnce();
				});
				it('(1) eventsを使う方法', function(){
					var View = Backbone.View.extend({
						el : '.container',
						events : {
							'click .button' : 'render'
						},
						render : function(){
							//.buttonがクリックされたらココが実行されるよ！
						}
					});
					self.stub = sinon.stub(View.prototype, 'render');
					var v = new View();
					$('.button').trigger('click');
					expect(self.stub).toHaveBeenCalledOnce();
				});
				it('(2) delegateEventsを使う方法', function(){
					var View = Backbone.View.extend({
						el : '.container',
						initialize : function(){
							this.delegateEvents({
								"click .button" : "render"
							});
						},
						render : function(){
							//.buttonがクリックされたらココが実行されるよ！
						}
					});
					self.stub = sinon.stub(View.prototype, 'render');
					var v = new View();
					$('.button').trigger('click');
					expect(self.stub).toHaveBeenCalledOnce();
				});
			});
			describe('複数のDOM要素に同じイベントを同時適用することも可能', function(){
				it('こんな感じで指定することもできるし、', function(){
					var View = Backbone.View.extend({
						el : '.container',
						events : {
							'click .button' : 'render',
							'click .menu' : 'render',
							'click .refresh' : 'render'
						},
						render : function(){
							//.buttonか.menuか.refreshがクリックされたらココが実行！
						}
					});
					self.stub = sinon.stub(View.prototype, 'render');
					var v = new View();
					$('.button').trigger('click');
					$('.menu').trigger('click');
					$('.refresh').trigger('click');
					expect(self.stub).toHaveBeenCalledThrice();
				});
				it('カンマ区切りで指定することもできる。', function(){
					var View = Backbone.View.extend({
						el : '.container',
						events : {
							'click .button, .menu, .refresh' : 'render'
						},
						render : function(){
							//.buttonか.menuか.refreshがクリックされたらココが実行！
						}
					});
					self.stub = sinon.stub(View.prototype, 'render');
					var v = new View();
					$('.button, .menu, .refresh').trigger('click');
					expect(self.stub).toHaveBeenCalledThrice();
				});
			});
			it('複数のDOMイベントを追加することも可能', function(){
				var View = Backbone.View.extend({
					el : '.container',
					events : {
						'click .button' : 'render',
						'click .menu' : 'goToOtherPage',
						'mouseover .menu' : 'hoverMenu',
						'focus .text_field' : 'showForm'
					},
					render : function(){
						//.buttonがクリックされたらココが実行されるよ！
					},
					goToOtherPage : function(){
						//.menuがクリックされたらココが実行されるのじゃ！
					},
					hoverMenu : function(){
						//.menuの上にカーソルが載ったらココが実行されるぜ！
					},
					showForm : function(){
						//.text_fieldがフォーカスを受け取ったらココが実行だ！
					}
				});
				self.stubs = {
					render : sinon.stub(View.prototype, 'render'),
					goToOtherPage : sinon.stub(View.prototype, 'goToOtherPage'),
					hoverMenu : sinon.stub(View.prototype, 'hoverMenu'),
					showForm : sinon.stub(View.prototype, 'showForm')
				};
				var v = new View();
				$('.button').trigger('click');
				$('.menu').trigger('click');
				$('.menu').trigger('mouseover');
				$('.text_field').trigger('focus');
				expect(self.stubs.render).toHaveBeenCalledOnce();
				expect(self.stubs.goToOtherPage).toHaveBeenCalledOnce();
				expect(self.stubs.hoverMenu).toHaveBeenCalledOnce();
				expect(self.stubs.showForm).toHaveBeenCalledOnce();
			});
			it('同じ要素＆同じイベントに対して複数メソッド実行はできない', function(){
				var View = Backbone.View.extend({
					el : 'body',
					events : {
						'click .button' : 'render',
						'click .button' : 'goToOtherPage'
					},
					render : function(){

					},
					goToOtherPage : function(){

					}
				});
				expect(View).toThrow();
			});
			describe('eventsで指定したDOM要素はいつ生成してもイベントが適用される', function(){
				afterEach(function(){
					var $el = $('.popup');
					$el[0] && $el.remove();
				});
				it('クラスを定義する前に生成しても動くし、', function(){
					$('<div class="popup" />').appendTo('.container');
					var View = Backbone.View.extend({
						el : '.container',
						events : {
							'click .popup' : 'render'
						},
						render : function(){
							//.popupがクリックされたらココが実行されるよ！
						}
					});
					self.stub = sinon.stub(View.prototype, 'render');
					var v = new View();
					$('.popup').trigger('click');
					expect(self.stub).toHaveBeenCalledOnce();
				});
				it('インスタンス化した後に生成しても動く', function(){
					var View = Backbone.View.extend({
						el : '.container',
						events : {
							'click .popup' : 'render'
						},
						render : function(){
							//.popupがクリックされたらココが実行されるよ！
						}
					});
					self.stub = sinon.stub(View.prototype, 'render');
					var v = new View();
					$('<div class="popup" />').appendTo('.container');
					$('.popup').trigger('click');
					expect(self.stub).toHaveBeenCalledOnce();
				});
			});
		});
		describe('eventsを使うときはel定義に注意！', function(){
			var self = this;
			beforeEach(function(){
				loadFixtures('../../../html/backbonejs.html');
			});
			afterEach(function(){
				self.stub && self.stub.restore();
			});
			it('elを定義しないとevents機能は動かない', function(){
				var View = Backbone.View.extend({
					events : {
						'click .button' : 'render'
					},
					render : function(){
						//.buttonがクリックされてもココが実行されない！
					}
				});
				self.stub = sinon.stub(View.prototype, 'render');
				new View();
				$('.button').trigger('click');
				expect(self.stub).not.toHaveBeenCalledOnce();
				new View({el : '.container'});
				$('.button').trigger('click');
				expect(self.stub).toHaveBeenCalledOnce();
			});
			it('elには親要素を定義しないとevents機能は動かない', function(){
				var View = Backbone.View.extend({
					el : '.footer',
					events : {
						'click .button' : 'render'
					},
					render : function(){
						//.buttonがクリックされてもココが実行されない！
					}
				});
				self.stub = sinon.stub(View.prototype, 'render');
				new View();
				$('.button').trigger('click');
				expect(self.stub).not.toHaveBeenCalledOnce();
				new View({el : '.container'});
				$('.button').trigger('click');
				expect(self.stub).toHaveBeenCalledOnce();
			});
			it('elにeventsと同じ要素を指定しても動く（※非推奨）', function(){
				var View = Backbone.View.extend({
					el : '.button',
					events : {
						'click .button' : 'render'
					},
					render : function(){
						//.buttonがクリックされたらココが実行されるよ！
					}
				});
				self.stub = sinon.stub(View.prototype, 'render');
				new View();
				$('.button').trigger('click');
				expect(self.stub).toHaveBeenCalledOnce();
			});
			it('elにbodyを指定しても動く（※非推奨）', function(){
				var View = Backbone.View.extend({
					el : 'body',
					events : {
						'click .button' : 'render'
					},
					render : function(){
						//.buttonがクリックされたらココが実行されるよ！
					}
				});
				self.stub = sinon.stub(View.prototype, 'render');
				new View();
				$('.button').trigger('click');
				expect(self.stub).toHaveBeenCalledOnce();
			});
		});
	};
});
