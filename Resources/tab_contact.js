var win = Titanium.UI.currentWindow;

// ライブラリの読み込み
Titanium.include('include/fw/container.js');

//con.UI.tableView.separatorColor = '#ffffff';
//win.add(con.UI.tableView);


var url = con.loadContact();
var webview = Ti.UI.createWebView({
    url:url,
    //url:'http://tsa.hades.corp.813.co.jp/en/webview/result?tids=236%2C266',
    loading:true
});

webview.addEventListener('load',function(e) {
    var save = webview.evalJS("appendInquiry()");
    if(save){
        var json = JSON.parse(save);
        
        // データの削除処理
        var db = Ti.Database.open(db_setting.table_save);
        db.execute('begin transaction');
        
        for(var i = 0; i< json.length; i++) {
            //Ti.API.info( json[i] );
            db.execute("delete from " + db_setting.table_save + " where tid = '" + json[i] + "' ");
        }
        db.execute('commit');
        db.close();
    }
});

win.add(webview);