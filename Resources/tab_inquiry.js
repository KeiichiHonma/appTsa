var win = Titanium.UI.currentWindow;
win.orientationModes = [Ti.UI.PORTRAIT];
var tab = Titanium.UI.currentTab;

// ライブラリの読み込み
Titanium.include('include/fw/container.js');
con.UI.tableView.separatorStyle = Titanium.UI.iPhone.TableViewSeparatorStyle.NONE;
//con.loadInquiry();


var listener = function(e) {
    con.loadInquiry();
}
win.addEventListener('focus', listener);


/*
win.addEventListener('focus', function(e){
    con.loadInquiry();
});
*/
win.add(con.UI.tableView);