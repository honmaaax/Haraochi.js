$.views.helpers({
    
    // 10000000→10,000,000する
    commaFormat: function (val) {
        // undefined/nullのときは空文字。
        if (undefined === val || null === val) val = '';
        // 文字列に変換
        val += '';
        // 数値じゃなければ、return
        if (isNaN(val)) return val;
        // 余計なコンマを一度取り除く
        var num = val.replace(/,/g, '');
        // コンマを一つずつ挿入。置換しても値がかわらなくなったらwhileを抜ける。
        while(num != (num = num.replace(/^(-?\d+)(\d{3})/, '$1,$2')));
        // return
        return num;
    }
    
});
$.views.converters({
	truncate : function(val){
		// 省略文字の初期値を設定
		var count = 0;
		var str = [];
		var isMultiByte;
		for (i=0; i < val.length; i++){
			// エンコードしたときの文字数でバイト数を判定
			isMultiByte = escape(val.charAt(i)).length >= 4;
			isMultiByte ? count+=2 : count++;
			// 制限文字数をチェックして、超えていたら省略文字をつけて終了
			if( count > 16 ){
				isMultiByte = escape(val.charAt(i-2)).length >= 4;
				if( !isMultiByte ) str[i-2] = '';
				str[i-1] = '…';
				break;
			}
			str[i] = val.charAt(i);
		}
		return str.join("");
	}
});
$.views.tags({
	getToday : function(){
		var date = new Date();
		var month = date.getMonth()+1;
		var day = date.getDate();
		var today = {
			year : date.getFullYear(),
			month : month < 10 ? "0"+month : month,
			day : day < 10 ? "0"+day : day
		};
		return today.year+"-"+today.month+"-"+today.day;
	},
	escape : function() {
		return this.tmpl.markup.replace(/\\/g, "").replace(/\{\{/g, "{\{").replace(/\}\}/g, "}\}");
	}
});