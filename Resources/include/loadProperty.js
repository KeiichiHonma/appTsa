exports.exec = function(json,tid){
    // データをクリア
    con.UI.tableView.data = [];
    //テキスト
    if(setting.isEn){
        //building
        var about_property = "About " + json['building'].col_building_e;
        var property_title = json['building'].col_building_e + ' / ' + json['type'].col_type_e;
        var detail = json['building'].col_building_detail_e;
        var catch_phrase = json['building'].col_catch_phrase_e;
        
        
        
        var row_campaign_bg = cu.createWrapImageView('img/row_campaign_bg_e.gif',setting.row_title_width,setting.row_title_height + 10);
        
        var campaign_title = json['type'].col_campaign_title_e;
        var campaign_title = json['type'].col_campaign_title_e;
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
        var about_property = json['building'].col_building_e + "について";
        var property_title = json['building'].col_building + ' / ' + json['type'].col_type;
        var detail = json['building'].col_building_detail;
        var catch_phrase = json['building'].col_catch_phrase;
        
        var row_campaign_bg = cu.createWrapImageView('img/row_campaign_bg.gif',setting.row_title_width,setting.row_title_height);
        var campaign_title = json['type'].col_campaign_title;
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
        height:20,
        hasChild:false
    });

    var label = Ti.UI.createLabel({
        text:property_title,
        color:'#6f5b37',
        font:{fontSize:14,fontWeight:'bold', fontFamily:'Arial'},
    });
    titleRow.add(label);
    con.UI.tableView.appendRow(titleRow);

    //photo////////////////////////////////////////////////////////////////////////////
    var photoRow = Ti.UI.createTableViewRow({
        height:'auto',
        hasChild:true,
        color:'#6f5b37',
        url: 'slideshow.js',
        // Extended
        ext : {
            tid : tid
        }
    });
    //物件外観
    var face = cu.createWrapImageView(tsa_url + json['building'].face.path,140,140,21,15);
    //部屋画像
    var roombig = cu.createWrapImageView(tsa_url + json['type'].roombig.path,140,140,21,155);
    photoRow.add(face);
    photoRow.add(roombig);
    con.UI.tableView.appendRow(photoRow);

    //catch////////////////////////////////////////////////////////////////////////////
    var catchRow = Ti.UI.createTableViewRow({
        backgroundColor:'#F5F2EC',
        hasChild:false
    });

    var label = Ti.UI.createLabel({
        text:catch_phrase,
        color:setting.row_title_color,
        font:{fontSize:14, fontFamily:'Arial'},
    });
    catchRow.add(label);
    con.UI.tableView.appendRow(catchRow);

    //campaign//////////////////////////////////////////////////////////////////////////////
    var campaignRow = Ti.UI.createTableViewRow({
        height:setting.row_title_height + 10,
        hasChild:false
    });
    campaignRow.add(row_campaign_bg);
    var campaign_summary = cu.createTitleLabel(campaign_title,setting.row_title_color,'auto',setting.row_title_height + 10,0,setting.row_title_width + 10);
    campaignRow.add(campaign_summary);
    con.UI.tableView.appendRow(campaignRow);

    //Monthly Rent
    cu.makePropertyRow('property_monthly_rent_title',monthly_rent);
    //Other Expenses
    cu.makePropertyRow('property_other_expenses_title',other_expenses);
    //size
    cu.makePropertyRow('property_size_title',size);
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




};