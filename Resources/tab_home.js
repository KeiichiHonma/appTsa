// ライブラリの読み込み
Titanium.include('include/container.js');

// tab1.js
var win = Titanium.UI.currentWindow;

// 表示させるデータソース
var campaign_title = L('campaign_spring');
var campaign_header = L('campaign_spring') + L('campaign_end_string');
var rowData = [
    {url: 'campaign.js',title:false,          rowTitle:'',image:"img/header.jpg",height:130,child:false},
    {url: 'campaign.js',title:campaign_header,rowTitle:campaign_title, image:"img/campaign.jpg",height:30,child:true},
];



// TableViewへ渡すデータソースの生成
var dataSource =[];
for (var i=0; i<rowData.length;i++) {
    
    
    if(i < 2 ){
        var row = Ti.UI.createTableViewRow({
            url: rowData[i].url,
            height:rowData[i].height,
            hasChild:rowData[i].child,
            // Extended
            ext : {
                rowTitle : rowData[i].rowTitle,
                //"rule-name" : ["hoge", "piyo"]
            }
        });
        row.add(cu.createWrapImageView(rowData[i].image,320,rowData[i].height));
        
    }else{
        var row = Ti.UI.createTableViewRow({
            className:'cell',
            height:rowData[i].height,
            hasChild:rowData[i].child,
            // Extended
            ext : {
                rowTitle : rowData[i].rowTitle,
                //"rule-name" : ["hoge", "piyo"]
            }
        });
    }
    if(rowData[i].title != false){
        var labelName = cu.createTitleLabel(rowData[i].title,'#990000','auto','auto',5,80);
        row.add(labelName);
    }
    dataSource.push(row);
}

// TableViewの生成
var tableView =Ti.UI.createTableView({
    data:dataSource
});

// 再読込の設定
//con.UI.setRefreshButton(function(){
    //con.loadIndexCampaign('appcelerator');
//});
// 初回読み込み
con.loadIndexCampaign(tableView);
win.add(tableView);

// TableView選択時のイベント
tableView.addEventListener('click', function(e) {
    // TableViewRowの各データにアクセスするにはe.rowDataを介する
    //Ti.API.info(e.rowData.ext.tid);
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