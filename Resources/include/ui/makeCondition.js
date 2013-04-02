exports.exec = function(json){
    // データをクリア
    con.UI.tableView.data = [];

/*    con.UI.tableView.addEventListener('click', function(e) {
        if (e.source == this) {
            if(false == e.rowData.ext.checkbox.value) {
                e.rowData.ext.checkbox.title='\u2713';
                e.rowData.ext.checkbox.value = true;
                Ti.API.info(2);
            } else {
                e.rowData.ext.checkbox.title='';
                e.rowData.ext.checkbox.value = false;
                Ti.API.info(3);
            }
        }
    });*/

    var regions = [];
    var dimensions = [];
    var features = [];
    //var conditions = [];
    //var conditions = [regions, dimensions, features];
    var conditions = { regions: regions, dimensions: dimensions ,features: features}

    //場所
    con.UI.tableView.appendRow( cu.createCheckboxTitleRow( L('search_region_title') ) );
    con.UI.tableView.appendRow( cu.makeCheckboxRow( L('search_region_shinjuku') , conditions.regions , 1 ) );
    con.UI.tableView.appendRow( cu.makeCheckboxRow( L('search_region_akihabara') , conditions.regions , 2 ) );
    con.UI.tableView.appendRow( cu.makeCheckboxRow( L('search_region_shibuya')   , conditions.regions , 3 ) );
    con.UI.tableView.appendRow( cu.makeCheckboxRow( L('search_region_roppongi')  , conditions.regions , 4 ) );
    con.UI.tableView.appendRow( cu.makeCheckboxRow( L('search_region_ginza')     , conditions.regions , 5 ) );
    con.UI.tableView.appendRow( cu.makeCheckboxRow( L('search_region_shinagawa') , conditions.regions , 6 ) );
    con.UI.tableView.appendRow( cu.makeCheckboxRow( L('search_region_yokohama')  , conditions.regions , 7 ) );
    con.UI.tableView.appendRow( cu.makeCheckboxRow( L('search_region_odaiba')    , conditions.regions , 8 ) );

    //間取り
    con.UI.tableView.appendRow( cu.createCheckboxTitleRow( L('search_dimension_title') ) );
    con.UI.tableView.appendRow( cu.makeCheckboxRow( L('search_dimension_1ldk') , conditions.dimensions , 3 ) );
    con.UI.tableView.appendRow( cu.makeCheckboxRow( L('search_dimension_2ldk') , conditions.dimensions , 4 ) );
    con.UI.tableView.appendRow( cu.makeCheckboxRow( L('search_dimension_3ldk') , conditions.dimensions , 5 ) );

    //こだわり
    con.UI.tableView.appendRow( cu.createCheckboxTitleRow( L('search_feature_title') ) );
    con.UI.tableView.appendRow( cu.makeCheckboxRow( L('search_feature_24') ,        conditions.features , 1 ) );
    con.UI.tableView.appendRow( cu.makeCheckboxRow( L('search_feature_swimming') ,  conditions.features , 2 ) );
    con.UI.tableView.appendRow( cu.makeCheckboxRow( L('search_feature_pets') ,      conditions.features , 3 ) );
    con.UI.tableView.appendRow( cu.makeCheckboxRow( L('search_feature_market') ,    conditions.features , 4 ) );
    con.UI.tableView.appendRow( cu.makeCheckboxRow( L('search_feature_parking') ,   conditions.features , 5 ) );
    con.UI.tableView.appendRow( cu.makeCheckboxRow( L('search_feature_haneda') ,    conditions.features , 6 ) );
    con.UI.tableView.appendRow( cu.makeCheckboxRow( L('search_feature_smoking') ,   conditions.features , 7 ) );
    con.UI.tableView.appendRow( cu.makeCheckboxRow( L('search_feature_breakfast') , conditions.features , 8 ) );
    con.UI.tableView.appendRow( cu.makeCheckboxRow( L('search_feature_gym') ,       conditions.features , 9 ) );

    //検索ボタン
    var search_view = Titanium.UI.createView({
        //top:50,
        bottom:0,
        height:50,
        width:'auto',
        opacity:0.4,
        backgroundColor:'#666666',
        borderRadius:5
    });

    var search_button = Ti.UI.createButton({
      backgroundImage:'img/search_btn.png',
      color:'#ffffff',
      width:100,
      height:35,
      bottom:5,
      left:'10%',
      opacity:1,
    });

    var clear_button = Ti.UI.createButton({
      backgroundImage:'img/clear_btn.png',
      color:'#ffffff',
      width:100,
      height:35,
      bottom:5,
      right:'10%',
      opacity:1,
    });
    
    win.add(search_view);
    win.add(search_button);
    win.add(clear_button);

    search_button.addEventListener('click', function(e){
        Ti.UI.currentTab.open(
            Ti.UI.createWindow({
                url: "search.js",
                navBarHidden: false,
                // Extended
                ext : {
                    conditions : conditions
                }
            })
        );
    });
};