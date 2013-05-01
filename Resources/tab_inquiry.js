var win = Titanium.UI.currentWindow;
var tab = Titanium.UI.currentTab;
// ライブラリの読み込み
Titanium.include('include/fw/container.js');
con.UI.tableView.separatorColor = '#ffffff';
win.add(con.UI.tableView);
con.loadInquiry();

tab.addEventListener('focus', function(e){
    con.loadInquiry();
});