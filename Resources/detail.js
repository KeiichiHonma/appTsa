// win1.jsのwindowを変数にセット
var win = Titanium.UI.currentWindow;
win.title = L('property_window_title');

// ライブラリの読み込み
Titanium.include('include/fw/container.js');

win.add(con.UI.tableView);

// 再読込の設定
/*con.UI.setRefreshButton(function(){
    con.loadIndexCampaign(con.UI.tableView);
});*/
// 初回読み込み
con.loadProperty(win.ext.tid);