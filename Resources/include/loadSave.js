exports.exec = function(json){
    // データをクリア
    con.UI.tableView.data = [];
    
    for(var i = 0; i< json.length; i++) {
        Ti.API.info(json[i].path);
        var row = Ti.UI.createTableViewRow({
            className:L('property_detail_title'),
            height:60,
            hasDetail:true,
            url: 'detail.js',
            // Extended
            ext : {
                tid : json[i].col_tid,
                //"rule-name" : ["hoge", "piyo"]
            }
        });

        //画像配置
        row.add( cu.createImageView(tsa_url + json[i].path,60,60) );

        //メインタイトル
        if(setting.isEn){
            var main_text = json[i].col_building_e + ' / ' + json[i].col_type_e + ' / ' + json[i].col_area_e;
            if(json[i].col_campaign_title_e != ''){
                var summary_text = json[i].col_campaign_title_e;
            }else{
                var summary_text = json[i].col_rent_cost_e + ' / ' + json[i].col_rent_size;
            }
            
        }else{
            var main_text = json[i].col_building + ' / ' + json[i].col_type + ' / ' + json[i].col_area;
            if(json[i].col_campaign_title != ''){
                var summary_text = json[i].col_campaign_title;
            }else{
                var summary_text = json[i].col_rent_cost + ' / ' + json[i].col_rent_size;
            }
        }
        
        Ti.API.info(main_text);
        var property_title = cu.createTitleLabel(main_text,'#6f5b37','auto',30,0,70);
        row.add(property_title);

        //説明文
        var property_summary = cu.createSummaryLabel(summary_text,'#222222','auto',30,30,70);
        row.add(property_summary);
        //tableView.appendRow(row);
        con.UI.tableView.appendRow(row);
    }
};