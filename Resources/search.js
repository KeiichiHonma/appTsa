// win1.jsのwindowを変数にセット
var win = Titanium.UI.currentWindow;

// ライブラリの読み込み
Titanium.include('include/fw/container.js');

// TableViewの追加
win.add(con.UI.tableView);
con.loadSearch(false,false,true,win.ext.conditions);