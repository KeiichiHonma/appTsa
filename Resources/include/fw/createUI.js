// imageManager.js
var cu = {};
var setting = {
    "tsa_url":"",
    "tsa_url_ssl":"",
    "isEn":false,
    "isDebug":true,
    "isResult":false,
    "lang_string":"",
    "os":"",
    "os_width":"",
    "season":"",
    "bar_color":"#7D715B",
    //campaign
    "header_img_height":130,
    "campaign_img_height":40,
    "section_title_background_color":'#F5F2EC',
    "row_margin":5,
    "list_row_height":70,
    "list_property_height":15,
    "list_area_height":15,
    "list_summety_height":35,
    "detail_title_width":106,
    "row_title_height":30,
    "row_title_color":'#330000',
    "row_title_background_color":'#DCD1BA',
    "row_summary_color":'#222222',
    "row_summary_bold_color":'#860100',
    "row_bg":'img/row_bg.gif',
    "similar_face_height":80,
    "btn_view_height":39,
    "save_btn_width":150,
    "save_btn_height":35,
    "save_btn_s_width":100,
    "save_btn_s_height":35,
    "telephone_number":'0354288307',
    "form_tf_height":20,
    "form_title_height":20
    
    };
    if(setting.isDebug){
        //setting.tsa_url = 'http://tsa.hades.corp.813.co.jp';
        setting.tsa_url = 'http://tsa.813.co.jp';
        //setting.tsa_url_ssl = 'http://tsa.hades.corp.813.co.jp';
        setting.tsa_url_ssl = 'http://tsa.813.co.jp';
    }else{
        setting.tsa_url = 'http://www.serviced-apartments-tokyo.com';
        setting.tsa_url_ssl = 'https://ps128.xbit.jp/~w123177';
    }


    if(Ti.Platform.locale == 'en'){
        setting.isEn = true;
        setting.lang_string = "en";
        //setting.lang_string = "ja";
    }else{
        ///debug//////////////////////////////////////////////////
        //setting.isEn = true;
        //setting.lang_string = "en";
        
        //////////////////////////////////////////////////////////
        setting.lang_string = "ja";
    }

    //季節判定
    myD = new Date();
    var month = myD.getMonth()+1;// 月
    if(month == 12 || month == 1 || month == 2 ){
        setting.season = 'winter';
    }else if(month >= 3 && month <= 5){
        setting.season = 'spring';
    }else if(month >= 6 && month <= 8){
        setting.season = 'summer';
    }else{
        setting.season = 'autumn';
    }
switch(Ti.Platform.osname){
    case 'iphone':
        setting.os = 'iphone';
        setting.header_img_height = 130;
        setting.os_width = 320;
        setting.campaign_img_height = 40;
        break;
    case 'ipad':
        setting.os = 'ipad';
        setting.header_img_height = 260;
        setting.os_width = 768;
        setting.campaign_img_height = 48;
        //detail
        setting.detail_title_width = 150;
        break;
    case 'android':
        setting.os = 'android';
        setting.header_img_height = 130;
        setting.os_width = 320;
        setting.campaign_img_height = 40;
        break;
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
            //borderColor : '#000000',
            //borderWidth : 0,
            hires: true,
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

    cu.createTitleBoldLabel = function(text,color,width,height,top,left) {
        var label = Ti.UI.createLabel({
            text:text,
            color:color,
            //backgroundColor:'#DCD1BA',
            width:width,
            height:height,
            top:top,
            left:left,
            font:{fontSize:11,fontWeight:'bold'}
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

    cu.createSummaryBoldLabel = function(text,color,width,height,top,left) {
        var label = Ti.UI.createLabel({
            text:text,
            color:color,
            backgroundColor:'#ffffff',
            width:width,
            height:height,
            top:top,
            left:left,
            bottom:top,
            font:{fontSize:11,fontWeight:'bold'},
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
        var col_width = setting.detail_title_width - setting.row_margin;
        var row_title = cu.createTitleLabel(L(row_title_define),setting.row_title_color,col_width,'auto',setting.row_margin,setting.row_margin);

        var rowWrap = Ti.UI.createView({
            width: setting.os_width - col_width - setting.row_margin,
            backgroundColor:'#ffffff',
            height: Ti.UI.SIZE,
            top:0,
            left:setting.detail_title_width + setting.row_margin,
            //bottom:10,
        });
        var row_detail = cu.createSummaryLabel(row_data,setting.row_summary_color,setting.os_width - col_width - 30,'auto',setting.row_margin,setting.row_margin);
        
        rowWrap.add(row_detail);
        
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
        var col_width = setting.detail_title_width - setting.row_margin;
        var row_title = cu.createTitleLabel(L(row_title_define),setting.row_title_color,col_width,'auto',setting.row_margin,setting.row_margin);

        var rowWrap = Ti.UI.createView({
            width: setting.os_width - col_width - setting.row_margin,
            backgroundColor:'#ffffff',
            height: Ti.UI.SIZE,
            top:0,
            left:setting.detail_title_width + setting.row_margin
        });
        var row_detail = cu.createSummaryLabel(address,setting.row_summary_color,setting.os_width - col_width - 30 - 50,'auto',setting.row_margin,setting.row_margin);

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
                    barColor: setting.bar_color,
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
            hasChild:false,
            touchEnabled : false,
            selectionStyle : Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
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

    cu.makeSaveProperty = function(tid,use) {
        
        if(use == 'similar'){
            if(setting.os == 'ipad'){
                var save_button = Ti.UI.createButton({
                  backgroundImage:'img/save_btn_s_' + setting.lang_string + '.png',
                  width:setting.save_btn_s_width,
                  height:setting.save_btn_s_height,
                  top:5,
                  right:10
                });
            }else{
                var save_button = Ti.UI.createButton({
                  backgroundImage:'img/save_btn_s_' + setting.lang_string + '.png',
                  width:setting.save_btn_s_width,
                  height:setting.save_btn_s_height,
                  top:45,
                  left:setting.similar_face_height + 5
                });
            }
        }else if(use == 'ja_detail'){
            if(setting.os == 'ipad'){
                var save_button = Ti.UI.createButton({
                  backgroundImage:'img/save_btn_' + setting.lang_string + '.png',
                  color:'#ffffff',
                  width:setting.save_btn_width,
                  height:setting.save_btn_height,
                  bottom:2
                });
            }else{
                var save_button = Ti.UI.createButton({
                  backgroundImage:'img/save_btn_' + setting.lang_string + '.png',
                  color:'#ffffff',
                  width:setting.save_btn_width,
                  height:setting.save_btn_height,
                  bottom:2,
                  left:5
                });
            }
        }else{
            var save_button = Ti.UI.createButton({
              backgroundImage:'img/save_btn_' + setting.lang_string + '.png',
              color:'#ffffff',
              width:setting.save_btn_width,
              height:setting.save_btn_height,
              bottom:2,
            });
        }


        save_button.addEventListener('click', function(e){
            //db:sqlite
            var db = Ti.Database.open(db_setting.table_save);
            db.execute('create table if not exists ' + db_setting.table_save + ' (tid integer)');
            
            var rows = db.execute('select rowid,* from ' + db_setting.table_save + ' where tid = ' + tid);

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
        return save_button;
    };
    cu.makeInquiryTitleRow = function(title,form_title_height,form_margin_left){
        var row = Ti.UI.createTableViewRow({
            touchEnabled : false,
            selectionStyle : Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
            hasChild:false
        });
        var title = cu.createTitleLabel(title,setting.row_title_color,'auto',form_title_height,0,form_margin_left);
        if(setting.os == 'ipad'){
            title.font = {fontSize:16};
        }else{
            title.font = {fontSize:12};
        }
        row.add(title);
        return row;
    }
})();