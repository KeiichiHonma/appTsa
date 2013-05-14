// win1.jsのwindowを変数にセット
var win = Titanium.UI.currentWindow;

// ライブラリの読み込み
Titanium.include('include/fw/container.js');

// 再読込の設定
con.UI.setRefreshButton(function(){
    // データをクリア
    con.UI.tableView.data = [];
    con.loadCampaign('campaign',true,null);
});

//キャンペーン画像////////////////////////////////////////
var row = Ti.UI.createTableViewRow({
    height:40,
    hasChild:false,
    touchEnabled : false,
    selectionStyle : Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE
});
row.add(cu.createWrapImageView('img/campaign_spring.jpg',320,40));
con.UI.tableView.appendRow(row);

// TableViewの追加
win.add(con.UI.tableView);
con.loadCampaign('campaign',true,null);