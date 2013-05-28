exports.exec = function(json){
    // データをクリア
    con.UI.tableView.data = [];
    var budgets = [];
    var maps = [];

    var conditions = { maps: maps, budgets: budgets};

    //予算
    con.UI.tableView.appendRow( cu.createSearchTitleRow( L('search_budget_title') ) );

    var row = Ti.UI.createTableViewRow({
        height:40,
        hasChild:true
    });

    var picker_title = cu.createCheckboxTitleLabel(L('search_budget_action'),10,30);
    row.add( picker_title );
    con.UI.tableView.appendRow(row);
    
    //budget
    var budget_picker = require("include/ui/parts/budget_picker");
    budget_picker.exec(conditions,picker_title,row);

    //場所
    con.UI.tableView.appendRow( cu.createSearchTitleRow( L('search_map_title') ) );
    con.UI.tableView.appendRow( cu.makeCheckboxRow( L('search_map_shinjuku') , conditions.maps , 1 ) );
    con.UI.tableView.appendRow( cu.makeCheckboxRow( L('search_map_akihabara') , conditions.maps , 2 ) );
    con.UI.tableView.appendRow( cu.makeCheckboxRow( L('search_map_shibuya')   , conditions.maps , 3 ) );
    con.UI.tableView.appendRow( cu.makeCheckboxRow( L('search_map_roppongi')  , conditions.maps , 4 ) );
    con.UI.tableView.appendRow( cu.makeCheckboxRow( L('search_map_ginza')     , conditions.maps , 5 ) );
    con.UI.tableView.appendRow( cu.makeCheckboxRow( L('search_map_shinagawa') , conditions.maps , 6 ) );
    con.UI.tableView.appendRow( cu.makeCheckboxRow( L('search_map_yokohama')  , conditions.maps , 7 ) );
    con.UI.tableView.appendRow( cu.makeCheckboxRow( L('search_map_odaiba')    , conditions.maps , 8 ) );

    //検索ボタン
    var search_view = Titanium.UI.createView({
        bottom:0,
        height:45,
        width:'auto',
        opacity:0.4,
        backgroundColor:'#666666',
        borderRadius:5
    });

    var search_button = Ti.UI.createButton({
      backgroundImage:'img/search_btn_' + setting.lang_string + '.png',
      color:'#ffffff',
      width:300,
      height:35,
      bottom:5,
      //left:'10%',
      opacity:1,
    });

    win.add(search_view);
    win.add(search_button);

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
};