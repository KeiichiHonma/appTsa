// win1.jsのwindowを変数にセット
var win = Titanium.UI.currentWindow;
win.orientationModes = [Ti.UI.PORTRAIT];
// ライブラリの読み込み
Titanium.include('include/fw/container.js');
con.loadConfirm(win.ext.params);
win.add(con.UI.tableView);
con.UI.tableView.separatorColor = '#ffffff';