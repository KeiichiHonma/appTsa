var win = Titanium.UI.currentWindow;

// ライブラリの読み込み
Titanium.include('include/fw/container.js');
win.add(con.UI.tableView);
con.loadCondition();