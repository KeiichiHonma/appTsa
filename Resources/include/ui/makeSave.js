exports.exec = function(json){
    // データをクリア
    con.UI.tableView.data = [];

    //編集//////////////////////////////////////////////////////////////
    var btnEdit = Ti.UI.createButton({
        title : L('btn_edit_title'),
    });

    var btnDone = Ti.UI.createButton({
        title : L('btn_done_title'),
    });

    // Event
    btnEdit.addEventListener('click', function(e){
        Ti.UI.currentWindow.rightNavButton = btnDone;
        //table.moving = true;  // これを入れると削除アイコンが同時に描画されない
        con.UI.tableView.editing = true;
    });

    btnDone.addEventListener('click', function(e){
        Ti.UI.currentWindow.rightNavButton = btnEdit;
        //table.moving = false;  // これを入れると削除アイコンが同時に描画されない
        con.UI.tableView.editing = false;
    });

    Ti.UI.currentWindow.rightNavButton = btnEdit;

    // 行削除処理
    con.UI.tableView.addEventListener('delete', function(e){
        // データの削除処理
        var db = Ti.Database.open(db_setting.table_save);
        db.execute('begin transaction');
        db.execute("delete from " + db_setting.table_save + " where tid = '" + e.rowData.ext.tid + "' ");
        db.execute('commit');
        db.close();
    });

    //table//////////////////////////////////////////////////////////////
    for(var i = 0; i< json.length; i++) {
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
        var property_title = cu.createTitleLabel(main_text,'#6f5b37','auto',30,0,70);
        row.add(property_title);

        //説明文
        var property_summary = cu.createSummaryLabel(summary_text,'#222222','auto',30,30,70);
        row.add(property_summary);
        //tableView.appendRow(row);
        con.UI.tableView.appendRow(row);
    }
};