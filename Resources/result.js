// win1.jsのwindowを変数にセット
var win = Titanium.UI.currentWindow;
win.hideNavBar();

// ライブラリの読み込み
Titanium.include('include/fw/container.js');

// TableViewの追加
win.add(con.UI.tableView);
con.UI.tableView.separatorColor = '#ffffff';

con.loadResult(win.ext.params);