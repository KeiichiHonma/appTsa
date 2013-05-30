exports.exec = function(json){
    con.UI.tableView.scrollable = true;
    // データをクリア
    con.UI.tableView.data = [];
    
    if(setting.os == 'ipad'){
        setting.list_row_height = 150;
        setting.list_property_height = 30;
        setting.list_area_height = 30;
        setting.list_summety_height = 90;
        var property_name_fontsize = 22;
        var property_summary_fontsize = 18;
    }

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
        db.execute('create table if not exists ' + db_setting.table_save + ' (tid integer)');
        db.execute('begin transaction');
        db.execute("delete from " + db_setting.table_save + " where tid = '" + e.rowData.ext.tid + "' ");
        db.execute('commit');
        db.close();
    });

    //table//////////////////////////////////////////////////////////////
    for(var i = 0; i< json.save_list.length; i++) {
        var row = Ti.UI.createTableViewRow({
            className:L('property_detail_title'),
            height:setting.list_row_height,
            hasDetail:true,
            url: 'detail.js',
            // Extended
            ext : {
                tid : json.save_list[i].col_tid
            }
        });

        row.addEventListener('click', function(e) {
            var newWindow = Titanium.UI.createWindow({
                title: e.rowData.ext.rowTitle,
                backgroundColor: '#fff',
                url: e.rowData.url,
                navBarHidden: false,
                barColor: setting.bar_color,
                ext : {
                    tid : e.rowData.ext.tid
                }
            });
            Titanium.UI.currentTab.open(newWindow);
        });

        //画像配置
        row.add(cu.createImageView(setting.tsa_url + json.save_list[i].path,setting.list_row_height,setting.list_row_height));

        //メインタイトル
        if(setting.isEn){
            var property_name_text = json.save_list[i].col_type_e + ' - ' + json.save_list[i].col_building_e;
            var area_name_text = json.save_list[i].col_size + '㎡' + ' / ' + json.save_list[i].col_area_e;
            var summary_text = json.save_list[i].col_rent_cost_e;
        }else{
            var property_name_text = json.save_list[i].col_type + ' - ' + json.save_list[i].col_building;
            var area_name_text = json.save_list[i].col_size + '㎡' + ' / ' + json.save_list[i].col_area;
            var summary_text = json.save_list[i].col_rent_cost;
        }
        var property_name = cu.createTitleBoldLabel(property_name_text,setting.row_summary_color,'auto',setting.list_property_height,0,setting.list_row_height + 5);
        row.add(property_name);
        var area_name = cu.createTitleBoldLabel(area_name_text,setting.row_summary_color,'auto',setting.list_area_height,setting.list_property_height,setting.list_row_height + 5);
        row.add(area_name);

        //説明文
        var property_summary = cu.createSummaryBoldLabel(summary_text,setting.row_summary_bold_color,'auto',setting.list_summety_height,setting.list_property_height + setting.list_area_height,setting.list_row_height + 5);
        property_summary.font = {fontSize:12,fontWeight:'bold'};
        //osでフォント変更
        if(setting.os == 'ipad'){
            property_name.font = {fontSize:property_name_fontsize};
            property_summary.font = {fontSize:property_summary_fontsize,fontWeight:'bold'};
            area_name.font = {fontSize:property_summary_fontsize};
        }
        row.add(property_summary);
        con.UI.tableView.appendRow(row);
    }
    
    //similar
    if(json.inquiry_similar.length > 0){

        var similar_view = Titanium.UI.createView({
            top:0,
            height:30,
            width:'auto',
            backgroundColor:setting.row_title_background_color,
        });
        var label = Ti.UI.createLabel({
            text:L('property_near_property_title'),
            color:setting.row_title_color,
            font:{fontSize:14,fontWeight:'bold'},
            top:5,
            bottom:5
        });
        similar_view.add(label);
        var row = Ti.UI.createTableViewRow({
            className:L('property_detail_title'),
            height:setting.list_row_height + 30,
            //hasChild:true,
            url: 'detail.js',
            // Extended
            ext : {
                tid : json.inquiry_similar[0].col_tid
            }
        });
        // TableView選択時のイベント
        row.addEventListener('click', function(e) {
            var newWindow = Titanium.UI.createWindow({
                title: e.rowData.ext.rowTitle,
                backgroundColor: '#fff',
                url: e.rowData.url,
                navBarHidden: false,
                barColor: setting.bar_color,
                ext : {
                    tid : e.rowData.ext.tid
                }
            });
            Titanium.UI.currentTab.open(newWindow);
        });
        row.add(similar_view);
        //画像配置
        var similar_img = cu.createImageView(setting.tsa_url + json.inquiry_similar[0].path,setting.list_row_height,setting.list_row_height);
        similar_img.top = 30;
        row.add(similar_img);

        //メインタイトル
        if(setting.isEn){
            var property_name_text = 'simi' + json.inquiry_similar[0].col_building_e;
            var area_name_text = json.inquiry_similar[0].col_type_e + ' / ' + json.inquiry_similar[0].col_size + '㎡' + ' / ' + json.inquiry_similar[0].col_area_e;
            var summary_text = json.inquiry_similar[0].col_rent_cost_e;
        }else{
            var property_name_text = json.inquiry_similar[0].col_building;
            var area_name_text = json.inquiry_similar[0].col_type + ' / ' + json.inquiry_similar[0].col_size + '㎡' + ' / ' + json.inquiry_similar[0].col_area;
            var summary_text = json.inquiry_similar[0].col_rent_cost;
        }
        var property_name = cu.createTitleBoldLabel(property_name_text,setting.row_summary_color,'auto',setting.list_property_height,30,setting.list_row_height + 5);
        row.add(property_name);
        var area_name = cu.createTitleBoldLabel(area_name_text,setting.row_summary_color,'auto',setting.list_area_height,setting.list_property_height + 30,setting.list_row_height + 5);
        row.add(area_name);

        //説明文
        var property_summary = cu.createSummaryBoldLabel(summary_text,setting.row_summary_bold_color,'auto',setting.list_summety_height,setting.list_property_height + setting.list_area_height + 30,setting.list_row_height + 5);
        property_summary.font = {fontSize:12,fontWeight:'bold'};
        //osでフォント変更
        if(setting.os == 'ipad'){
            property_name.font = {fontSize:property_name_fontsize};
            property_summary.font = {fontSize:property_summary_fontsize,fontWeight:'bold'};
            area_name.font = {fontSize:property_summary_fontsize};
        }
        row.add(property_summary);
        con.UI.tableView.appendRow(row);

        win.addEventListener('blur', function(e){
            //editボタン
            con.UI.tableView.editing = false;
            //if(is_similar_table){
                //win.remove(similar_table);
                //is_similar_table = false;
            //}
            win.rightNavButton = null;
        });
    }
};