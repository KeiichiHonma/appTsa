// win1.jsのwindowを変数にセット
var win = Titanium.UI.currentWindow;

// ライブラリの読み込み
Titanium.include('include/fw/container.js');
con.loadConfirm(win.ext.params);
win.add(con.UI.tableView);
con.UI.tableView.separatorColor = '#ffffff';