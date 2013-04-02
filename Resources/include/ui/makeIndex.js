exports.exec = function(json,isHeader){
    // データをクリア
    con.UI.tableView.data = [];
    
    if(isHeader){
        var campaign_title = L('campaign_spring');
        var campaign_header = L('campaign_spring') + L('campaign_end_string');

        //ヘッダ画像////////////////////////////////////////
        var row = Ti.UI.createTableViewRow({
            height:130,
            hasChild:false
        });
        row.add(cu.createWrapImageView('img/header.jpg',320,130));
        con.UI.tableView.appendRow(row);
        
        //キャンペーン画像////////////////////////////////////////
        var row = Ti.UI.createTableViewRow({
            url: 'campaign.js',
            height:30,
            hasChild:true,
            // Extended
            ext : {
                rowTitle : campaign_title,
                //"rule-name" : ["hoge", "piyo"]
            }
        });
        row.add(cu.createWrapImageView('img/campaign.jpg',320,30));
        row.add( cu.createTitleLabel(campaign_header,'#990000','auto','auto',5,80) );
        con.UI.tableView.appendRow(row);
    }
    //campaign
    for(var i = 0; i< json.type.length; i++) {
        var row = Ti.UI.createTableViewRow({
            height:60,
            hasDetail:true,
            url: 'detail.js',
            // Extended
            ext : {
                tid : json.type[i].col_tid,
                //"rule-name" : ["hoge", "piyo"]
            }
        });

        //画像配置
        row.add(cu.createImageView(tsa_url + json.type[i].path,60,60));

        //メインタイトル
        if(setting.isEn){
            var main_text = json.type[i].col_building_e + ' / ' + json.type[i].col_type_e + ' / ' + json.type[i].col_area_e;
            var summary_text = json.type[i].col_campaign_title_e;
        }else{
            var main_text = json.type[i].col_building + ' / ' + json.type[i].col_type + ' / ' + json.type[i].col_area;
            var summary_text = json.type[i].col_campaign_title;
        }
        
        var property_title = cu.createTitleLabel(main_text,'#6f5b37','auto',30,0,70);
        row.add(property_title);

        //説明文
        var property_summary = cu.createSummaryLabel(summary_text,'#222222','auto',30,30,70);
        row.add(property_summary);
        con.UI.tableView.appendRow(row);
    }
};