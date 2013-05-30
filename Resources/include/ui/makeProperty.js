exports.exec = function(json,tid){
    // データをクリア
    con.UI.tableView.data = [];
    //テキスト
    if(setting.isEn){
        //building
        var property_name = json['building'].col_building_e;
        
        var about_property = "About " + property_name;
        var property_title = property_name + ' / ' + json['type'].col_type_e;
        var detail = json['building'].col_building_detail_e;
        var catch_phrase = json['building'].col_catch_phrase_e;
        var feature = json['feature'].en;
        var station = json['building'].col_station_e;
        var address = json['building'].col_address_e;
        
        //type
        if(json['type'].col_campaign == 0){
            var row_campaign_bg = cu.createWrapImageView('img/row_campaign_bg_en.gif',setting.detail_title_width,setting.row_title_height + 10);
            var campaign_title = json['type'].col_campaign_title_e;
        }
        var type_name = json['type'].col_type_e;
        var monthly_rent = json['type'].col_rent_cost_e;
        var other_expenses = json['type'].col_cost_e;
        var size = json['type'].col_size;
        if(json['type'].col_remarks_e != "") var remarks = json['type'].col_remarks_e;
        if(json['type'].col_service_e != "") var service = json['type'].col_service_e;
        if(json['type'].col_furniture_e != "") var furniture = json['type'].col_furniture_e;
        if(json['type'].col_kitchen_e != "") var kitchen = json['type'].col_kitchen_e;
        if(json['type'].col_facility_e != "") var facility = json['type'].col_facility_e;
        
    }else{
        //building
        var property_name = json['building'].col_building;
        var about_property = property_name + "について";
        var property_title = property_name + ' / ' + json['type'].col_type;
        var detail = json['building'].col_building_detail;
        var catch_phrase = json['building'].col_catch_phrase;
        var feature = json['feature'].ja;
        var station = json['building'].col_station;
        var address = json['building'].col_address;
        
        //type
        if(json['type'].col_campaign == 0){
            var row_campaign_bg = cu.createWrapImageView('img/row_campaign_bg_ja.gif',setting.detail_title_width,setting.row_title_height);
            var campaign_title = json['type'].col_campaign_title;
        }
        var type_name = json['type'].col_type;
        var monthly_rent = json['type'].col_rent_cost;
        var other_expenses = json['type'].col_cost;
        var size = json['type'].col_size;
        if(json['type'].col_remarks_e != "") var remarks = json['type'].col_remarks;

        if(json['type'].col_service != "") var service = json['type'].col_service;
        if(json['type'].col_furniture != "") var furniture = json['type'].col_furniture;
        if(json['type'].col_kitchen != "") var kitchen = json['type'].col_kitchen;
        if(json['type'].col_facility != "") var facility = json['type'].col_facility;
    }

    //title////////////////////////////////////////////////////////////////////////////
    var titleRow = Ti.UI.createTableViewRow({
        //height:30,
        height:Ti.UI.FILL,
        touchEnabled : false,
        backgroundColor:setting.row_title_background_color,
        selectionStyle : Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
        hasChild:false
    });

    var label = Ti.UI.createLabel({
        text:property_title,
        color:setting.row_title_color,
        font:{fontSize:14,fontWeight:'bold'},
        top:5,
        bottom:5
    });
    titleRow.add(label);
    con.UI.tableView.appendRow(titleRow);

    //photo////////////////////////////////////////////////////////////////////////////
    if(setting.os == 'ipad'){
        var photo_max_width = 239;
        var photo_max_height = 239;
        var photo_margin_left = 5;
    }else{
        var photo_max_width = 140;
        var photo_max_height = 140;
        var photo_margin_left = 15;
    }
    var photoRow = Ti.UI.createTableViewRow({
        height:'auto',
        hasChild:true,
        color:setting.row_title_color,
        height:photo_max_height + 10
    });

    photoRow.addEventListener('click', function(e) {
        var slideshowWindow = Titanium.UI.createWindow({
            backgroundColor:'#ffffff',
            url: 'slideshow.js',
            navBarHidden: false,
            barColor: setting.bar_color,
            // Extended
            ext : {
                tid : tid
            }
        });
        Titanium.UI.currentTab.open(slideshowWindow);
    });


    //物件外観
    var face = cu.createWrapImageView(setting.tsa_url + json['building'].face.path,photo_max_width,photo_max_height,5,photo_margin_left);
    
    //部屋画像
    var roombig = cu.createWrapImageView(setting.tsa_url + json['type'].roombig.path,photo_max_width,photo_max_height,5,photo_max_width + photo_margin_left * 2);

    photoRow.add(face);
    photoRow.add(roombig);
    if(setting.os == 'ipad'){
        //間取り画像
        var layout = cu.createWrapImageView(setting.tsa_url + json['type'].layout.path,photo_max_width,photo_max_height,5,photo_max_width * 2 + photo_margin_left * 3);
        photoRow.add(layout);
    }
    con.UI.tableView.appendRow(photoRow);
    
    //catch////////////////////////////////////////////////////////////////////////////
    var catchRow = Ti.UI.createTableViewRow({
        backgroundColor:'#F5F2EC',
        touchEnabled : false,
        selectionStyle : Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
        hasChild:false
    });

    var label = Ti.UI.createLabel({
        text:catch_phrase,
        color:setting.row_title_color,
        font:{fontSize:14},

    });
    catchRow.add(label);
    con.UI.tableView.appendRow(catchRow);

    //campaign//////////////////////////////////////////////////////////////////////////////
    if(json['type'].col_campaign == 0){
        var campaignRow = Ti.UI.createTableViewRow({
            //height:setting.row_title_height + 10,
            height:'auto',
            touchEnabled : false,
            selectionStyle : Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
            hasChild:false
        });
        campaignRow.add(row_campaign_bg);
        var campaign_summary = Ti.UI.createLabel({
            text:campaign_title,
            color:setting.row_title_color,
            width:'auto',
            height:Ti.UI.SIZE,
            top:5,
            bottom:5,
            left:setting.detail_title_width + 10,
            font:{fontSize:12,fontWeight:'bold'}
        });


        campaignRow.add(campaign_summary);
        con.UI.tableView.appendRow(campaignRow);
    }
    //save
    //cu.makeSaveProperty(tid,false);
    //Monthly Rent
    cu.makePropertyRow('property_monthly_rent_title',monthly_rent);
    //Other Expenses
    if(other_expenses) cu.makePropertyRow('property_other_expenses_title',other_expenses);
    //size
    cu.makePropertyRow('property_size_title',size + '㎡');
    //remarks
    if(remarks) cu.makePropertyRow('property_remarks_title',remarks);
    //service
    if(service) cu.makePropertyRow('property_service_title',service);
    //furniture
    if(furniture) cu.makePropertyRow('property_furniture_title',furniture);
    //kitchen
    if(kitchen) cu.makePropertyRow('property_kitchen_title',kitchen);
    //facility
    if(facility) cu.makePropertyRow('property_facility_title',facility);

    //section
    con.UI.tableView.appendRow(cu.makePropertySectionRow(about_property));
    //detail
    cu.makePropertyRow('property_detail_title',detail);
    //feature
    cu.makePropertyRow('property_feature_title',feature);

    //address
    cu.makeMapPropertyRow('property_address_title',address,property_name);
    //station
    cu.makePropertyRow('property_station_title',station);
    //save
    //cu.makeSaveProperty(tid,false);

    var btn_view = Titanium.UI.createView({
        bottom:0,
        height:setting.btn_view_height,
        width:'auto',
        opacity:0.6,
        backgroundColor:'#666666'
    });
    win.add(btn_view);
    if(setting.isEn){
        var save_button = cu.makeSaveProperty(tid,'en_detail');
        win.add(save_button);
    }else{
        var save_button = cu.makeSaveProperty(tid,'ja_detail');
        win.add(save_button);
        if(setting.os == 'iphone'){
            var tel_button = Ti.UI.createButton({
              backgroundImage:'img/telephone_btn_' + setting.lang_string + '.png',
              color:'#ffffff',
              width:150,
              height:35,
              bottom:2,
              right:5,
              opacity:1,
            });
            tel_button.addEventListener('click', function(e) {
                var confirm = Titanium.UI.createAlertDialog({
                    title: L('telephone_confirm_message'),
                    buttonNames: [L('no'),L('yes')]
                });

                confirm.addEventListener('click', function(conEvt) {
                    if(conEvt.index === 1){
                        Titanium.Platform.openURL('tel:'+setting.telephone_number);
                    }
                });
                confirm.show();
            });
            win.add(tel_button);
        }
    }
};