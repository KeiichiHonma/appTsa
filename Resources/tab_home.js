var win = Titanium.UI.currentWindow;
win.orientationModes = [Ti.UI.PORTRAIT];
// ライブラリの読み込み
Titanium.include('include/fw/container.js');
con.UI.tableView.separatorStyle = Titanium.UI.iPhone.TableViewSeparatorStyle.NONE;
    
//ヘッダ画像////////////////////////////////////////
var row = Ti.UI.createTableViewRow({
    height:setting.header_img_height,
    touchEnabled : false,
    selectionStyle : Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
    hasChild:false,
    ext : {
        rowTitle : 'home'
    }
    });
row.add(cu.createWrapImageView('img/header_' + setting.lang_string + setting.os_width + '.jpg',setting.os_width,setting.header_img_height));
con.UI.tableView.appendRow(row);

//検索////////////////////////////////////////
var budgets = [];
var maps = [];

var conditions = { maps: maps, budgets: budgets};

var row = Ti.UI.createTableViewRow({
    height:115,
    touchEnabled : false,
    selectionStyle : Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
    hasChild:false
    });

var search_table = Titanium.UI.createTableView({
    backgroundColor:setting.row_title_background_color,
    scrollable:false
});
if (Ti.Platform.osname !== 'mobileweb') {
    search_table.style = Titanium.UI.iPhone.TableViewStyle.GROUPED;
}

//budget////////////////////////////////////////////
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
if(setting.os == 'ipad'){
    var budget_popover = require("include/ui/parts/budget_popover");
    budget_popover.exec(conditions,picker_budget_title,row_budget);
}else{
    var budget_picker = require("include/ui/parts/budget_picker");
    budget_picker.exec(conditions,picker_budget_title,row_budget);
}
search_table.appendRow(row_budget);

//region//////////////////////////////////////////
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
if(setting.os == 'ipad'){
    var region_popover = require("include/ui/parts/region_popover");
    region_popover.exec(conditions,picker_region_title,row_region);
}else{
    var region_picker = require("include/ui/parts/region_picker");
    region_picker.exec(conditions,picker_region_title,row_region);
}


var search_button = Ti.UI.createButton({
  backgroundImage:'img/search_btn_' + setting.lang_string + '.png',
  color:'#ffffff',
  width:300,
  height:35,
  //top:110,
  top:5,
  bottom:5,
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
con.UI.tableView.appendRow(row);

var row = Ti.UI.createTableViewRow({
    //height:35,
    backgroundColor:setting.row_title_background_color,
    touchEnabled : false,
    selectionStyle : Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
    hasChild:false
    });
row.add(search_button);
con.UI.tableView.appendRow(row);

//キャンペーン画像////////////////////////////////////////
var row = Ti.UI.createTableViewRow({
    url: 'campaign.js',
    height:setting.campaign_img_height,
    hasChild:true,
    ext : {
        rowTitle : L('campaign_' + setting.season)
    }
});
row.add(cu.createWrapImageView('img/campaign_' + setting.season + setting.os_width +  '.jpg',setting.os_width,setting.campaign_img_height));

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
if(setting.os == 'ipad'){
    con.loadCampaign('index',true,null);
}else{
    con.loadBigFaceCampaign('index',true,null);
}
/*
win.addEventListener('focus', function(e){
    Ti.API.info(Ti.Platform.availableMemory);
});
*/