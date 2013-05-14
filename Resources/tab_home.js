var win = Titanium.UI.currentWindow;
// ライブラリの読み込み
Titanium.include('include/fw/container.js');
//win.backgroundColor = setting.row_title_background_color;
con.UI.tableView.separatorStyle = Titanium.UI.iPhone.TableViewSeparatorStyle.NONE;
//con.UI.tableView.separatorColor = '#333333';
//con.UI.tableView.separatorColor = '#333333';
    
//ヘッダ画像////////////////////////////////////////
var row = Ti.UI.createTableViewRow({
    height:130,
    touchEnabled : false,
    selectionStyle : Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
    hasChild:false,
    ext : {
        rowTitle : 'home'
    }
    });
row.add(cu.createWrapImageView('img/header_' + setting.lang_string + '.jpg',320,130));
con.UI.tableView.appendRow(row);

//検索////////////////////////////////////////
var budgets = [];
var maps = [];

var conditions = { maps: maps, budgets: budgets};

var row = Ti.UI.createTableViewRow({
    height:150,
    touchEnabled : false,
    selectionStyle : Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
    hasChild:false
    });

var search_table = Titanium.UI.createTableView({
    backgroundColor:setting.row_title_background_color
});
if (Ti.Platform.osname !== 'mobileweb') {
    search_table.style = Titanium.UI.iPhone.TableViewStyle.GROUPED;
}

//budget
var row_budget = Ti.UI.createTableViewRow({
    backgroundColor:'#FFFFFF',
    hasChild:true,
    key:'budget'
});

var picker_budget_title = Ti.UI.createLabel({
    text:L('search_budget_action'),
    color:'#000000',
    //width:width,
    height:40,
    top:0,
    left:10,
    font:{fontSize:16,fontWeight:'bold'},
});
row_budget.add( picker_budget_title );
search_table.appendRow(row_budget);

var budget_picker = require("include/ui/parts/budget_picker");
budget_picker.exec(conditions,picker_budget_title,row_budget);

//region
var row_region = Ti.UI.createTableViewRow({
    backgroundColor:'#FFFFFF',
    hasChild:true,
    key:'region'
});
var picker_region_title = Ti.UI.createLabel({
    text:L('search_map_action'),
    color:'#000000',
    height:40,
    top:0,
    left:10,
    font:{fontSize:16,fontWeight:'bold'},
});
row_region.add( picker_region_title );
search_table.appendRow(row_region);
var region_picker = require("include/ui/parts/region_picker");
region_picker.exec(conditions,picker_region_title,row_region);

var search_button = Ti.UI.createButton({
  backgroundImage:'img/search_btn_' + setting.lang_string + '.png',
  color:'#ffffff',
  width:300,
  height:35,
  top:110,
  opacity:1,
});
search_button.addEventListener('click', function(e){
    if(conditions.budgets.length > 0 || conditions.maps.length > 0){
        Ti.UI.currentTab.open(
            Ti.UI.createWindow({
                title: L('property_search_window_title'),
                url: "search.js",
                navBarHidden: false,
                barColor: setting.bar_color,
                // Extended
                ext : {
                    conditions : conditions
                }
            })
        );
    }
});
row.add(search_table);
var label = cu.createTitleLabel(L('search_title'),setting.row_title_color,'auto','auto',0,20);
label.font = {fontSize:15,fontWeight:'bold'};
row.add(label);
row.add(search_button);
con.UI.tableView.appendRow(row);

//キャンペーン画像////////////////////////////////////////
var row = Ti.UI.createTableViewRow({
    url: 'campaign.js',
    height:40,
    hasChild:true,
    ext : {
        rowTitle : L('campaign_spring')
    }
});
row.add(cu.createWrapImageView('img/campaign_spring.jpg',320,40));
con.UI.tableView.appendRow(row);

row.addEventListener('click', function(e) {
    var newWindow = Titanium.UI.createWindow({
        title: e.rowData.ext.rowTitle,
        backgroundColor: '#fff',
        url: e.rowData.url,
        navBarHidden: false,
        barColor: setting.bar_color
    });
    Titanium.UI.currentTab.open(newWindow);
});
win.add(con.UI.tableView);
//con.loadCampaign('index',true,null);
con.loadBigFaceCampaign('index',true,null);
