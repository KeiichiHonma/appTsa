exports.exec = function(json,tid){
    var margin_left = 15;
    var row_margin_left = 10;
    var row_title_width = 96;
    var row_title_height = 30;
    var row_title_color = '#2f0103';
    var row_summary_color = '#222222';
    var isEn = false;

    if(Ti.Platform.locale == 'en'){
        isEn = true;
    }

    // データをクリア
    con.UI.tableView.data = [];
    //テキスト
    if(isEn){
        //campaign bg画像
        var row_campaign_bg = cu.createWrapImageView('img/row_campaign_bg_e.gif',row_title_width,row_title_height + 10);
        var property_title = json['building'].col_building_e + ' / ' + json['type'].col_type_e;
        var campaign_title = json['type'].col_campaign_title_e;
        var monthly_rent = json['type'].col_rent_cost_e;
    }else{
        var row_campaign_bg = cu.createWrapImageView('img/row_campaign_bg.gif',row_title_width,row_title_height);
        var property_title = json['building'].col_building + ' / ' + json['type'].col_type;
        var campaign_title = json['type'].col_campaign_title;
        var monthly_rent = json['type'].col_rent_cost;
    }
    //Ti.API.info(rent_cost);
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

    //bg画像
    var row_bg = cu.createWrapImageView('img/row_bg.gif',96,30);

    //campaign//////////////////////////////////////////////////////////////////////////////
    var campaignRow = Ti.UI.createTableViewRow({
        height:row_title_height + 10,
        hasChild:false
    });
    campaignRow.add(row_campaign_bg);
    var campaign_summary = cu.createTitleLabel(campaign_title,row_title_color,'auto',row_title_height + 10,0,row_title_width + 10);
    campaignRow.add(campaign_summary);
    con.UI.tableView.appendRow(campaignRow);

    //cost//////////////////////////////////////////////////////////////////////////////
    var costRow = Ti.UI.createTableViewRow({
        height:30,
        hasChild:false
    });
    costRow.add(row_bg);

    var monthly_rent_title = cu.createSummaryLabel(L('property_monthly_rent_title'),row_title_color,row_title_width - row_margin_left,row_title_height,0,row_margin_left);
    var monthly_rent_summary = cu.createSummaryLabel(monthly_rent,row_summary_color,'auto',row_title_height,0,row_title_width + 10);
    costRow.add(monthly_rent_title);
    costRow.add(monthly_rent_summary);
    con.UI.tableView.appendRow(costRow);
};