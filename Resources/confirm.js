// win1.jsのwindowを変数にセット
var win = Titanium.UI.currentWindow;

// ライブラリの読み込み
Titanium.include('include/fw/container.js');

// TableViewの追加
win.add(con.UI.tableView);
con.UI.tableView.separatorColor = '#ffffff';
con.loadConfirm(win.ext.params);