var win = Titanium.UI.currentWindow;
// ライブラリの読み込み
Titanium.include('include/fw/container.js');

win.addEventListener('focus', function(e){
    con.loadSave();
});
win.add(con.UI.tableView);



// TableView選択時のイベント
con.UI.tableView.addEventListener('click', function(e) {
    if(e.rowData.hasChild){
        var newWindow = Titanium.UI.createWindow({
            title: e.rowData.ext.rowTitle,
            backgroundColor: '#fff',
            url: e.rowData.url,
            navBarHidden: false,
            barColor: setting.bar_color,
            ext : {
                tid : e.rowData.ext.tid
            }
        });
        Titanium.UI.currentTab.open(newWindow);
    }
});