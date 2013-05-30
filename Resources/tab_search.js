var win = Titanium.UI.currentWindow;
win.orientationModes = [Ti.UI.PORTRAIT];
// ライブラリの読み込み
Titanium.include('include/fw/container.js');
win.add(con.UI.tableView);
con.loadCondition();