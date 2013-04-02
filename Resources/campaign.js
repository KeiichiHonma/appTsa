// win1.jsのwindowを変数にセット
var win = Titanium.UI.currentWindow;

// ライブラリの読み込み
Titanium.include('include/container.js');

// TableViewの追加
win.add(con.UI.tableView);

// 再読込の設定
con.UI.setRefreshButton(function(){
    // データをクリア
    con.UI.tableView.data = [];
    con.loadList(false,true,true,null);
});
// 初回読み込み
con.loadList(false,true,true,null);