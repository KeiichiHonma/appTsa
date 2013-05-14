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
    for(var i = 0; i< json.save_list.length; i++) {
        var row = Ti.UI.createTableViewRow({
            className:L('property_detail_title'),
            height:setting.row_height,
            hasDetail:true,
            url: 'detail.js',
            // Extended
            ext : {
                tid : json.save_list[i].col_tid
            }
        });

        //画像配置
        row.add(cu.createImageView(tsa_url + json.save_list[i].path,setting.row_height,setting.row_height));

        //メインタイトル
        if(setting.isEn){
            var property_name_text = json.save_list[i].col_building_e;
            var area_name_text = json.save_list[i].col_type_e + ' / ' + json.save_list[i].col_size + '㎡' + ' / ' + json.save_list[i].col_area_e;
            var summary_text = json.save_list[i].col_rent_cost_e;
        }else{
            var property_name_text = json.save_list[i].col_building;
            var area_name_text = json.save_list[i].col_type + ' / ' + json.save_list[i].col_size + '㎡' + ' / ' + json.save_list[i].col_area;
            var summary_text = json.save_list[i].col_rent_cost;
        }
        var property_name = cu.createTitleBoldLabel(property_name_text,setting.row_summary_color,'auto',15,0,setting.row_height + 5);
        row.add(property_name);
        var area_name = cu.createTitleBoldLabel(area_name_text,setting.row_summary_color,'auto',15,15,setting.row_height + 5);
        row.add(area_name);

        //説明文
        var property_summary = cu.createSummaryBoldLabel(summary_text,setting.row_summary_bold_color,'auto',30,30,setting.row_height + 5);
        
        row.add(property_summary);
        con.UI.tableView.appendRow(row);
    }
    if(json.inquiry_similar.length > 0){
        var position = json.save_list.length * setting.row_height;
        //title////////////////////////////////////////////////////////////////////////////
        var title_view = Titanium.UI.createView({
            top:position,
            height:30,
            backgroundColor:setting.row_title_background_color,
        });

        var titleRow = Ti.UI.createTableViewRow({
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
        title_view.add(label);
        win.add(title_view);
        var similar_table = Titanium.UI.createTableView({
            top:position + 30
        });
        var row = Ti.UI.createTableViewRow({
            className:L('property_detail_title'),
            height:setting.row_height,
            hasDetail:true,
            url: 'detail.js',
            // Extended
            ext : {
                tid : json.inquiry_similar[0].col_tid
            }
        });

        //画像配置
        row.add(cu.createImageView(tsa_url + json.inquiry_similar[0].path,setting.row_height,setting.row_height));

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
        var property_name = cu.createTitleBoldLabel(property_name_text,setting.row_summary_color,'auto',15,0,setting.row_height + 5);
        row.add(property_name);
        var area_name = cu.createTitleBoldLabel(area_name_text,setting.row_summary_color,'auto',15,15,setting.row_height + 5);
        row.add(area_name);

        //説明文
        var property_summary = cu.createSummaryBoldLabel(summary_text,setting.row_summary_bold_color,'auto',30,30,setting.row_height + 5);
        
        row.add(property_summary);
        //con.UI.tableView.appendRow(row);
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
                // Extended
                ext : {
                    tid : e.rowData.ext.tid,
                    //"rule-name" : ["hoge", "piyo"]
                }
            });
            Titanium.UI.currentTab.open(newWindow);
        });
        win.addEventListener('blur', function(e){
            win.remove(title_view);
            win.remove(similar_table);
            win.rightNavButton = null;
        });
    }
};