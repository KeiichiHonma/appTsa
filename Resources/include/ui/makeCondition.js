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

    var budgets = [];
    var maps = [];
    //var dimensions = [];
    //var features = [];

    //var conditions = { maps: maps, dimensions: dimensions ,features: features}
    var conditions = { maps: maps, budgets: budgets};

    //予算
    con.UI.tableView.appendRow( cu.createSearchTitleRow( L('search_budget_title') ) );

    var row = Ti.UI.createTableViewRow({
        height:30,
        hasChild:true
    });

    var picker_title = cu.createCheckboxTitleLabel(L('search_budget_action'),5,30);
    row.add( picker_title );
    con.UI.tableView.appendRow(row);
    var is_budget_view = false;

    var childWin = Ti.UI.createWindow();
    childWin.bottom = -300; //最初は右にずらして画面からはみ出した状態にしておく

    var open_animation = Ti.UI.createAnimation();
    open_animation.bottom = 0;
    open_animation.duration = 300; //0.5秒間のアニメーションにする

    var hide_animation = Ti.UI.createAnimation();
    hide_animation.bottom = -300;
    hide_animation.duration = 300; //0.5秒間のアニメーションにする

    var picker_budget_name = '';
    var picker_budget_value = '';
    
    var btn_view = Titanium.UI.createView({
        //top:50,
        bottom:0,
        height:50,
        width:'auto',
        backgroundColor:'#666666'
    });

    var budget_picker = Ti.UI.createPicker({bottom:50});
    var data = [];
    data[0]=Ti.UI.createPickerRow({title:L('search_budget_0'),value:0});
    data[1]=Ti.UI.createPickerRow({title:L('search_budget_1'),value:1});
    data[2]=Ti.UI.createPickerRow({title:L('search_budget_2'),value:2});
    data[3]=Ti.UI.createPickerRow({title:L('search_budget_3'),value:3});
    data[4]=Ti.UI.createPickerRow({title:L('search_budget_4'),value:4});
    budget_picker.add(data);

    // 選択表示を有効にします（標準は無効）
    budget_picker.selectionIndicator = true;
    budget_picker.addEventListener('change',function(e){
        // e.row, e.columnとして選択項目が取得できます
        // e.row.custom_itemとして各列のカスタムデータが帰ります
        picker_budget_name = e.row.title;
        picker_budget_value = e.row.value;
    });
    
    var cancel_button = Ti.UI.createButton({
      backgroundImage:'img/cancel_btn_' + setting.lang_string + '.png',
      color:'#ffffff',
      width:100,
      height:35,
      bottom:5,
      left:'10%',
      opacity:1,
    });

    var submit_button = Ti.UI.createButton({
      backgroundImage:'img/select_btn_' + setting.lang_string + '.png',
      color:'#ffffff',
      width:100,
      height:35,
      bottom:5,
      right:'10%',
      opacity:1,
    });
      
    childWin.add(budget_picker);
    childWin.add(btn_view);
    childWin.add(submit_button);
    childWin.add(cancel_button);

    submit_button.addEventListener('click', function(e){
        picker_title.text = picker_budget_name;
        conditions.budgets.push(picker_budget_value);
        is_budget_view = false;
        childWin.close(hide_animation);
    });

    cancel_button.addEventListener('click', function(e){
        is_budget_view = false;
        childWin.close(hide_animation);
    });

    row.addEventListener('click', function(e) {
        if(!is_budget_view){
            childWin.open(open_animation);
        }
        is_budget_view = true;
    });


/*
    con.UI.tableView.appendRow( cu.createSelectboxTitleRow( L('search_budget_title') ) );
    con.UI.tableView.appendRow( cu.makeSelectboxRow( L('search_budget_0') , conditions.budget , 0 ) );
*/
/*
    con.UI.tableView.appendRow( cu.createRadioTitleRow( L('search_budget_title') ) );
    con.UI.tableView.appendRow( cu.makeRadioRow( L('search_budget_0') , conditions.budget , 0 ) );
    con.UI.tableView.appendRow( cu.makeRadioRow( L('search_budget_1') , conditions.budget , 1 ) );
    con.UI.tableView.appendRow( cu.makeRadioRow( L('search_budget_2') , conditions.budget , 2 ) );
    con.UI.tableView.appendRow( cu.makeRadioRow( L('search_budget_3') , conditions.budget , 3 ) );
    con.UI.tableView.appendRow( cu.makeRadioRow( L('search_budget_4') , conditions.budget , 4 ) );
*/
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

    //間取り
/*
    con.UI.tableView.appendRow( cu.createCheckboxTitleRow( L('search_dimension_title') ) );
    con.UI.tableView.appendRow( cu.makeCheckboxRow( L('search_dimension_1br') , conditions.dimensions , 3 ) );
    con.UI.tableView.appendRow( cu.makeCheckboxRow( L('search_dimension_2br') , conditions.dimensions , 4 ) );
    con.UI.tableView.appendRow( cu.makeCheckboxRow( L('search_dimension_3br') , conditions.dimensions , 5 ) );
    con.UI.tableView.appendRow( cu.makeCheckboxRow( L('search_dimension_4br') , conditions.dimensions , 6 ) );
*/
    //こだわり
/*
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
*/
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
/*
    var clear_button = Ti.UI.createButton({
      backgroundImage:'img/clear_btn_' + setting.lang_string + '.png',
      color:'#ffffff',
      width:100,
      height:35,
      bottom:5,
      right:'10%',
      opacity:1,
    })*/;

    win.add(search_view);
    win.add(search_button);
    //win.add(clear_button);

    search_button.addEventListener('click', function(e){
        Ti.UI.currentTab.open(
            Ti.UI.createWindow({
                title: L('property_search_window_title'),
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