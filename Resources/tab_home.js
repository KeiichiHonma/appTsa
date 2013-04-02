var win = Titanium.UI.currentWindow;

// ライブラリの読み込み
Titanium.include('include/fw/container.js');

win.add(con.UI.tableView);

//ヘッダ画像////////////////////////////////////////
var row = Ti.UI.createTableViewRow({
    height:130,
    hasChild:false
});
row.add(cu.createWrapImageView('img/header.jpg',320,130));
con.UI.tableView.appendRow(row);

//キャンペーン画像////////////////////////////////////////
var row = Ti.UI.createTableViewRow({
    url: 'campaign.js',
    height:30,
    hasChild:true,
    // Extended
    ext : {
        rowTitle : L('campaign_spring'),
        //"rule-name" : ["hoge", "piyo"]
    }
});
row.add(cu.createWrapImageView('img/campaign.jpg',320,30));
row.add( cu.createTitleLabel(L('campaign_spring') + L('campaign_end_string'),'#990000','auto','auto',10,null) );
con.UI.tableView.appendRow(row);

con.loadList(true,true,true,null);

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