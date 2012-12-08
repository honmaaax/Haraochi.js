define(function(){
	return function(){
		var self = this;
		afterEach(function(){
			self.stub && self.stub.restore();
			self.stubs && _.each(self.stubs, function(stub){stub.restore();});
			self.clock && self.clock.restore();
		});
		describe('onとtriggerを使ってイベントドリブン化', function(){
			it('onを先に設定してからtriggerを実行する', function(){
				var View = Backbone.View.extend({
					initialize : function(){
						this.on('render', this.showPopup);
					},
					render : function(){
						this.trigger('render');
					},
					showPopup : function(){
						// renderイベントが発火されたらココが実行！
					}
				});
				self.stub = sinon.stub(View.prototype, 'showPopup');
				var v = new View();
				v.render();
				expect(self.stub).toHaveBeenCalledOnce();
			});
			describe('複数設定することも可能', function(){
				var v;
				beforeEach(function(){
					var View = Backbone.View.extend({
						initialize : function(){
							this.on('render', this.checkDate);
							this.on('HappyNewYear', this.showNewYearPopup);
							this.on('MerryXmas', this.showXmasPopup);
							this.on('MerryXmas', this.showXmasMessage);
						},
						render : function(){
							this.trigger('render');
						},
						checkDate : function(){
							// renderイベントが発火されたらココが実行！
							var month = new Date().getMonth()+1;
							if( month===1 ){
								this.trigger('HappyNewYear');
							} else if( month===12 ){
								this.trigger('MerryXmas');
							}
						},
						showNewYearPopup : function(){
							// HappyNewYearイベントが発火されたらココが実行！
						},
						showXmasPopup : function(){
							// MerryXmasイベントが発火されたらココが実行！
						},
						showXmasMessage : function(){
							// MerryXmasイベントが発火されたらココが実行！
						}
					});
					self.stubs = {
						checkDate : sinon.spy(View.prototype, 'checkDate'),
						showNewYearPopup : sinon.stub(View.prototype, 'showNewYearPopup'),
						showXmasPopup : sinon.stub(View.prototype, 'showXmasPopup'),
						showXmasMessage : sinon.stub(View.prototype, 'showXmasMessage')
					};
					v = new View();
				});
				it('1月にはハッピーニューイヤー', function(){
					self.clock = sinon.useFakeTimers(new Date(2012, 0, 1).getTime());
					v.render();
					expect(self.stubs.checkDate).toHaveBeenCalledOnce();
					expect(self.stubs.showNewYearPopup).toHaveBeenCalledOnce();
				});
				it('12月にはメリークリスマス', function(){
					self.clock = sinon.useFakeTimers(new Date(2012, 11, 1).getTime());
					v.render();
					expect(self.stubs.showXmasPopup).toHaveBeenCalledOnce();
					expect(self.stubs.showXmasMessage).toHaveBeenCalledOnce();
				});
			});
			it('引数を渡すことも可能', function(){
				var View = Backbone.View.extend({
					initialize : function(){
						this.on('postComment', this.showPopup);
						this.on('sendMessage', this.showPopup);
					},
					postComment : function(){
						this.trigger('postComment', 'コメントを投稿しました');
					},
					sendMessage : function(){
						this.trigger('sendMessage', 'メッセージを送りました');
					},
					showPopup : function(text){
						// postCommentまたはsendMessageイベントが発火されたらココが実行！
						$('#popupText').text(text);
						$('#popup').show();
					}
				});
				self.stub = sinon.stub(View.prototype, 'showPopup');
				var v = new View();
				v.postComment();
				expect(self.stub).toHaveBeenCalledWith('コメントを投稿しました');
				v.sendMessage();
				expect(self.stub).toHaveBeenCalledWith('メッセージを送りました');
			});
		});
	};
});
