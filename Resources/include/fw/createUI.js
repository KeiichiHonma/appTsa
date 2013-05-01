// imageManager.js
var cu = {};
var setting = {
    "section_title_background_color":'#F5F2EC',
    "terminal_width":320,
    "row_margin":5,
    "row_title_width":106,
    "row_title_height":30,
    //"row_title_color":'#2f0103',
    //"row_title_color":'#7D715B',
    "row_title_color":'#330000',
    "row_title_background_color":'#DCD1BA',
    "row_summary_color":'#222222',
    "row_bg":'img/row_bg.gif',
    "isEn":false,
    "isDebug":true,
    "isResult":false,
    "lang_string":"",
    };
    
    if(Ti.Platform.locale == 'en'){
        setting.isEn = true;
        setting.lang_string = "en";
        //setting.lang_string = "ja";
    }else{
        ///debug//////////////////////////////////////////////////
        setting.isEn = true;
        setting.lang_string = "en";
        //////////////////////////////////////////////////////////
        //setting.lang_string = "ja";
    }

(function() {
    cu.createWrapImageView = function(image,width,height,top,left) {
        if (top == undefined) top = 0;
        if (left == undefined) left = 0;
        
        var imageWrap = Ti.UI.createView({
            width: width,
            height: height,
            top:top,
            left:left
        });
        //画像配置
        var create_image = Ti.UI.createImageView({
            image: image,
            hires: true
        });
        imageWrap.add(create_image);
        return imageWrap;
    };

    cu.createWrap2ImageView = function(image,width,height,top,left,image_width,image_height) {
        if (top == undefined) top = 0;
        if (left == undefined) left = 0;
        
        var imageWrap = Ti.UI.createView({
            width: width,
            height: height,
            top:top,
            left:left
        });
        //画像配置
        var create_image = Ti.UI.createImageView({
            image: image,
            width: image_width,
            height: image_height,
            hires: true
        });
        imageWrap.add(create_image);
        return imageWrap;
    };

    cu.createImageView = function(image,width,height) {
        var create_image = Ti.UI.createImageView({
            image: image,
            width: width,
            height: height,
            top:0,
            left:0,
            hires: true
        });
        return create_image;
    };

    cu.createTitleLabel = function(text,color,width,height,top,left) {
        var label = Ti.UI.createLabel({
            text:text,
            color:color,
            //backgroundColor:'#DCD1BA',
            width:width,
            height:height,
            top:top,
            left:left,
            font:{fontSize:12,fontWeight:'normal'}
        });
        return label;
    };

    cu.createSummaryLabel = function(text,color,width,height,top,left) {
        var label = Ti.UI.createLabel({
            text:text,
            color:color,
            backgroundColor:'#ffffff',
            width:width,
            height:height,
            top:top,
            left:left,
            bottom:top,
            font:{fontSize:12,fontWeight:'normal'},
        });
        return label;
    };

    //property_detail
    cu.makePropertySectionRow = function(about_property) {
        var row = Ti.UI.createTableViewRow({
            height:20,
            backgroundColor:setting.section_title_background_color,
            touchEnabled : false,
            selectionStyle : Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
            hasChild:false
        });

        var label = Ti.UI.createLabel({
            text:about_property,
            color:'#000000',
            
            font:{fontSize:14,fontWeight:'bold'},
        });
        row.add(label);
        return row;
    };

    //property_detail
    cu.makePropertyRow = function(row_title_define,row_data) {
        var row = Ti.UI.createTableViewRow({
            height:'auto',
            backgroundColor:setting.row_title_background_color,
            touchEnabled : false,
            selectionStyle : Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
            hasChild:false
        });
        var col_width = setting.row_title_width - setting.row_margin;
        var row_title = cu.createTitleLabel(L(row_title_define),setting.row_title_color,col_width,'auto',setting.row_margin,setting.row_margin);

        var rowWrap = Ti.UI.createView({
            width: setting.terminal_width - col_width - setting.row_margin,
            backgroundColor:'#ffffff',
            height: Ti.UI.SIZE,
            top:0,
            left:setting.row_title_width + setting.row_margin,
            //bottom:10,
        });
        //var row_detail = cu.createSummaryLabel(row_data,setting.row_summary_color,setting.terminal_width - col_width - 40,'auto',setting.row_margin,setting.row_margin);
        var row_detail = cu.createSummaryLabel(row_data,setting.row_summary_color,setting.terminal_width - col_width - 30,'auto',setting.row_margin,setting.row_margin);
        
        rowWrap.add(row_detail)
        
        row.add(row_title);
        //row.add(row_summary);
        row.add(rowWrap);
        con.UI.tableView.appendRow(row);
    };

    //map
    cu.makeMapPropertyRow = function(row_title_define,address,property_name) {
        var row = Ti.UI.createTableViewRow({
            height:'auto',
            backgroundColor:setting.row_title_background_color,
            touchEnabled : false,
            selectionStyle : Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
            hasChild:false
        });
        var col_width = setting.row_title_width - setting.row_margin;
        var row_title = cu.createTitleLabel(L(row_title_define),setting.row_title_color,col_width,'auto',setting.row_margin,setting.row_margin);

        var rowWrap = Ti.UI.createView({
            width: 320 - col_width - setting.row_margin,
            backgroundColor:'#ffffff',
            height: Ti.UI.SIZE,
            top:0,
            left:setting.row_title_width + setting.row_margin
        });
        var row_detail = cu.createSummaryLabel(address,setting.row_summary_color,320 - col_width - 30 - 50,'auto',setting.row_margin,setting.row_margin);

        rowWrap.add(row_detail);

        var map_button = Ti.UI.createButton({
          backgroundImage:'img/map_btn_' + setting.lang_string + '.png',
          color:'#ffffff',
          width:50,
          height:35,
          top:0,
          right:10
        });
        rowWrap.add(map_button);

        map_button.addEventListener('click', function(e){
            Ti.UI.currentTab.open(
                Ti.UI.createWindow({
                    url: "include/ui/makeMap.js",
                    navBarHidden: false,
                    // Extended
                    ext : {
                        address : address,
                        property_name : property_name
                    }
                })
            );
        });

        row.add(row_title);
        row.add(rowWrap);
        con.UI.tableView.appendRow(row);
    };


    cu.createSearchTitleRow = function(text) {
        var row = Ti.UI.createTableViewRow({
            height:20,
            backgroundColor:setting.row_title_background_color,
            hasChild:false
        });
        var label = cu.createTitleLabel(text,setting.row_title_color,'auto','auto',0,5);
        label.font = {fontSize:14,fontWeight:'bold'};
        row.add(label);
        return row;
    };

    cu.createCheckboxTitleLabel = function(text,top,left) {
        var label = Ti.UI.createLabel({
            text:text,
            color:'#000000',
            //width:width,
            //height:height,
            top:top,
            left:left,
            font:{fontSize:14,fontWeight:'bold'},
        });
        return label;
    };

    cu.makeCheckboxRow = function(title,array,value) {
        var checkbox = Ti.UI.createButton({
            title: '',
            top: 10,
            left: 5,
            width: 20,
            height: 20,
            borderColor: '#666666',
            borderWidth: 1,
            borderRadius: 5,
            backgroundColor: '#CCCCCC',
            backgroundImage: 'none',
            //color: '#fff',
            color: '#000000',
            font:{fontSize: 14, fontWeight: 'bold'},
            value: false //value is a custom property in this casehere.
        });
        
        checkbox.on = function() {
            //Ti.API.info('on_s : ' + array);
            
            this.title='\u2713';
            this.value = true;
            
            if(array.indexOf(value) == -1 ){
                array.push(value);
            }
            //Ti.API.info('on_e : ' + array);
        };
         
        checkbox.off = function() {
            //Ti.API.info('off_s : ' + array);
            
            this.title='';
            this.value = false;
            
            var index = array.indexOf(value);
            if(index != -1 ){
                if(array.length > 1){
                    for(i = 0; i < array.length; i++){
                        if(array[i] == value){
                            array.splice(i,index);
                        }
                    }
                }else{
                    array.length = 0;
                }
            }
            //Ti.API.info('off_e : ' + array);
        };
         
        checkbox.addEventListener('click', function(e) {
            if(false == e.source.value) {
                e.source.on();
            } else {
                e.source.off();
            }
        });
        
        var row = Ti.UI.createTableViewRow({
            height:40,
            ext : {
                checkbox : checkbox
            }
        });

        row.addEventListener('click', function(e) {
            //Ti.API.info(e.rowData.ext.checkbox.value);
            if (e.source == this) {
                if(false == e.rowData.ext.checkbox.value) {
                    checkbox.title='\u2713';
                    checkbox.value = true;
                    if(array.indexOf(value) == -1 ){
                        array.push(value);
                    }
                    //Ti.API.info('on_e : ' + array);
                } else {
                    checkbox.title='';
                    checkbox.value = false;
                    var index = array.indexOf(value);
                    if(index != -1 ){
                        if(array.length > 1){
                            for(i = 0; i < array.length; i++){
                                if(array[i] == value){
                                    array.splice(i,index);
                                }
                            }
                        }else{
                            array.length = 0;
                        }
                    }
                    //Ti.API.info('off_e : ' + array);
                }
            }
        });

        row.add(checkbox);
        
        var checkbox_title = cu.createCheckboxTitleLabel(title,10,30);

        checkbox_title.addEventListener('click', function(e) {
            if (e.source == this) {
                if(false == e.rowData.ext.checkbox.value) {
                    checkbox.title='\u2713';
                    checkbox.value = true;
                    if(array.indexOf(value) == -1 ){
                        array.push(value);
                    }
                    //Ti.API.info('on_e : ' + array);
                } else {
                    checkbox.title='';
                    checkbox.value = false;
                    var index = array.indexOf(value);
                    if(index != -1 ){
                        if(array.length > 1){
                            for(i = 0; i < array.length; i++){
                                if(array[i] == value){
                                    array.splice(i,index);
                                }
                            }
                        }else{
                            array.length = 0;
                        }
                    }
                    //Ti.API.info('off_e : ' + array);
                }
            }
        });
        row.add(checkbox_title);
        return row;
    }

    //save
    cu.makeSavePropertyRow = function(tid,property_name,type_name,size,monthly_rent) {
        var row = Ti.UI.createTableViewRow({
            height:110,
            touchEnabled : false,
            selectionStyle : Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
            hasChild:false
        });

        var save_button = Ti.UI.createButton({
          backgroundImage:'img/save_btn_' + setting.lang_string + '.png',
          color:'#ffffff',
          width:320,
          height:60,
          top:10,
          left:0
        });
        row.add(save_button);

        save_button.addEventListener('click', function(e){
            
            //Ti.API.info(db_setting.table_save);
            //db:sqlite
            var db = Ti.Database.open(db_setting.table_save);
            db.execute('create table if not exists ' + db_setting.table_save + ' (tid integer)');
            
            var rows = db.execute('select rowid,* from ' + db_setting.table_save + ' where tid = ' + tid);
            
            //Ti.API.info(rows.fieldByName('tid'));
            //Ti.API.info(tid);
            
            if( rows.fieldByName('tid') == tid){
                //存在してた
                var alert_title = L('save_alert_not_add');
                var alert_message = '';
            }else{
                //insert
                db.execute('insert into ' + db_setting.table_save + ' (tid) values(?)',tid);
                var alert_title = L('save_alert_add');
                var alert_title = L('save_alert_add_message');
            }
/*
            Ti.API.info('lastInsertRowId = ' + db.lastInsertRowId);
            var rows = db.execute('select rowid,* from save');
            Ti.API.info('row count' + rows.getRowCount());
            while(rows.isValidRow()){
                Ti.API.info('id:' + rows.fieldByName('rowid')+'tid:'+rows.fieldByName('tid'));
                rows.next();
            }
*/
            rows.close();
            db.close();

            // 複数の選択肢をもつアラートダイアログ
            var multi_option_alert = Ti.UI.createAlertDialog({
                title: alert_title,//ダイアログのタイトル
                message: alert_message,//ダイアログの本文
                buttonNames: ['OK']
                //buttonNames: ['OK!', 'Cancel', 'HELP'],//ボタンの名前＆数
                //cancel: 1 //cancelボタンが配列の何番目かを指定
            }); 
            multi_option_alert.show();
        });
        var info = cu.createSummaryLabel(L('help_press_message'),setting.row_summary_color,300,40,70,10);
        row.add(info);
        con.UI.tableView.appendRow(row);
    };
    cu.makeTitleRow = function(title,form_title_height,form_margin_left){
        var row = Ti.UI.createTableViewRow();
        var title = cu.createTitleLabel(title,setting.row_title_color,'auto',form_title_height,0,form_margin_left);
        row.add(title);
        return row;
    }
})();