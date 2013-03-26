var win = Titanium.UI.currentWindow;

// ライブラリの読み込み
Titanium.include('include/container.js');

// TableViewの生成
//var tableView =Ti.UI.createTableView();

// 再読込の設定
//con.UI.setRefreshButton(function(){
    //con.loadIndexCampaign('appcelerator');
//});
// 初回読み込み
//win.add(tableView);
//con.loadSave(tableView);

win.add(con.UI.tableView);
con.loadSave();

// TableView選択時のイベント
con.UI.tableView.addEventListener('click', function(e) {
    // TableViewRowの各データにアクセスするにはe.rowDataを介する
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