// win1.jsのwindowを変数にセット
var win = Titanium.UI.currentWindow;
Titanium.include('include/container.js');
//win.add(con.UI.tableView);
con.loadSlideshow(win.ext.tid);