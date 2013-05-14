// win1.jsのwindowを変数にセット
var win = Titanium.UI.currentWindow;
win.hideNavBar();

// ライブラリの読み込み
Titanium.include('include/fw/container.js');
con.loadResult(win.ext.params);
win.add(con.UI.tableView);
con.UI.tableView.separatorColor = '#ffffff';