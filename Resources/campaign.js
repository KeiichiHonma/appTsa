// win1.jsのwindowを変数にセット
var win = Titanium.UI.currentWindow;

// ライブラリの読み込み
Titanium.include('include/fw/container.js');

// 再読込の設定
con.UI.setRefreshButton(function(){
    // データをクリア
    con.UI.tableView.data = [];
    con.loadList(false,true,true,null);
});
// TableViewの追加
win.add(con.UI.tableView);
con.loadList(false,true,true,null);