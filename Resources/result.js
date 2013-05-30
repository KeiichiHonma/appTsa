// win1.jsのwindowを変数にセット
var win = Titanium.UI.currentWindow;
win.orientationModes = [Ti.UI.PORTRAIT];

// ライブラリの読み込み
Titanium.include('include/fw/container.js');
con.loadResult(win.ext.params);

var listener = function(e) {
    win.showNavBar();
    win.title = L('tab_name_inquiry');
    con.loadInquiry();
}

win.add(con.UI.tableView);
con.UI.tableView.separatorColor = '#ffffff';