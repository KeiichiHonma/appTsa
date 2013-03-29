var win = Titanium.UI.currentWindow;

// ライブラリの読み込み
Titanium.include('include/container.js');
win.add(con.UI.tableView);
con.loadSave();

// TableView選択時のイベント
con.UI.tableView.addEventListener('click', function(e) {
    var newWindow = Titanium.UI.createWindow({
        title: e.rowData.ext.rowTitle,
        backgroundColor: '#fff',
        url: e.rowData.url,
        navBarHidden: false,
        // Extended
        ext : {
            tid : e.rowData.ext.tid,
            //"rule-name" : ["hoge", "piyo"]
        }
    });
    Titanium.UI.currentTab.open(newWindow);
});