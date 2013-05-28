var win = Titanium.UI.currentWindow;
var tab = Titanium.UI.currentTab;

// ライブラリの読み込み
Titanium.include('include/fw/container.js');
con.UI.tableView.separatorStyle = Titanium.UI.iPhone.TableViewSeparatorStyle.NONE;

con.loadInquiry();

tab.addEventListener('focus', function(e){
//win.addEventListener('focus', function(e){
//winにフォーカスすると、ピッカーで選択するたびに画面の再描画していまうため
    con.loadInquiry();
});

win.add(con.UI.tableView);