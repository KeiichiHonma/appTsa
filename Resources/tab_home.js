var win = Titanium.UI.currentWindow;

// ライブラリの読み込み
Titanium.include('include/container.js');

win.add(con.UI.tableView);

var campaign_title = L('campaign_spring');
var campaign_header = L('campaign_spring') + L('campaign_end_string');

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
        rowTitle : campaign_title,
        //"rule-name" : ["hoge", "piyo"]
    }
});
row.add(cu.createWrapImageView('img/campaign.jpg',320,30));
row.add( cu.createTitleLabel(campaign_header,'#990000','auto','auto',5,80) );
con.UI.tableView.appendRow(row);

//con.loadIndex(true);
con.loadCampaign(true,true);

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