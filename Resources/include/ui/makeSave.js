exports.exec = function(json){

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

        //save
        var rows = db.execute('select rowid,* from ' + db_setting.table_save);
        if( rows.getRowCount() == 0){
            //画面からsaveが存在した場合のUIを削除
            if(is_similar_table){
                win.remove(similar_table);
                is_similar_table = false;
            }
        }
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

        //画像配置
        row.add(cu.createImageView(tsa_url + json.save_list[i].path,setting.list_row_height,setting.list_row_height));

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
        
        row.add(property_summary);
        con.UI.tableView.appendRow(row);
    }
    if(json.inquiry_similar.length > 0){
        var position = json.save_list.length * setting.list_row_height;
        
        //nearby title////////////////////////////////////////////////////////////////////////////\
        var titleRow = Ti.UI.createTableViewRow({
            top:position,
            height:30,
            touchEnabled : false,
            backgroundColor:setting.row_title_background_color,
            selectionStyle : Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
            hasChild:false
        });

        var label = Ti.UI.createLabel({
            text:L('property_near_property_title'),
            color:setting.row_title_color,
            font:{fontSize:14,fontWeight:'bold'},
            top:5,
            bottom:5
        });
        var is_similar_table = true;
        var similar_table = Titanium.UI.createTableView({
            top:position
        });
        var row = Ti.UI.createTableViewRow({
            className:L('property_detail_title'),
            height:setting.list_row_height,
            hasDetail:true,
            url: 'detail.js',
            // Extended
            ext : {
                tid : json.inquiry_similar[0].col_tid
            }
        });
        titleRow.add(label);
        //画像配置
        row.add(cu.createImageView(tsa_url + json.inquiry_similar[0].path,setting.list_row_height,setting.list_row_height));

        //メインタイトル
        if(setting.isEn){
            var property_name_text = json.inquiry_similar[0].col_building_e;
            var area_name_text = json.inquiry_similar[0].col_type_e + ' / ' + json.inquiry_similar[0].col_size + '㎡' + ' / ' + json.inquiry_similar[0].col_area_e;
            var summary_text = json.inquiry_similar[0].col_rent_cost_e;
        }else{
            var property_name_text = json.inquiry_similar[0].col_building;
            var area_name_text = json.inquiry_similar[0].col_type + ' / ' + json.inquiry_similar[0].col_size + '㎡' + ' / ' + json.inquiry_similar[0].col_area;
            var summary_text = json.inquiry_similar[0].col_rent_cost;
        }
        var property_name = cu.createTitleBoldLabel(property_name_text,setting.row_summary_color,'auto',15,0,setting.list_row_height + 5);
        row.add(property_name);
        var area_name = cu.createTitleBoldLabel(area_name_text,setting.row_summary_color,'auto',15,15,setting.list_row_height + 5);
        row.add(area_name);

        //説明文
        var property_summary = cu.createSummaryBoldLabel(summary_text,setting.row_summary_bold_color,'auto',30,30,setting.list_row_height + 5);
        
        row.add(property_summary);
        similar_table.appendRow(titleRow);
        similar_table.appendRow(row);
        Ti.UI.currentWindow.add(similar_table);
        // TableView選択時のイベント
        similar_table.addEventListener('click', function(e) {
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

        win.addEventListener('blur', function(e){
            //editボタン
            con.UI.tableView.editing = false;
            if(is_similar_table){
                win.remove(similar_table);
                is_similar_table = false;
            }
            win.rightNavButton = null;
        });
    }
};