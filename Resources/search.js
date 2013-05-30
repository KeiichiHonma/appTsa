// win1.jsのwindowを変数にセット
var win = Titanium.UI.currentWindow;
win.orientationModes = [Ti.UI.PORTRAIT];
// ライブラリの読み込み
Titanium.include('include/fw/container.js');

// TableViewの追加
win.add(con.UI.tableView);
con.loadSearch('search',true,win.ext.conditions);