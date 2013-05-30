// win1.jsのwindowを変数にセット
var win = Titanium.UI.currentWindow;
win.orientationModes = [Ti.UI.PORTRAIT];
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
    height:setting.campaign_img_height,
    hasChild:false,
    touchEnabled : false,
    selectionStyle : Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE
});
row.add(cu.createWrapImageView('img/campaign_' + setting.season + setting.os_width +  '.jpg',setting.os_width,setting.campaign_img_height));
con.UI.tableView.appendRow(row);

// TableViewの追加
win.add(con.UI.tableView);
con.loadCampaign('campaign',true,null);