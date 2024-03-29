exports.exec = function(tids,json){
    con.UI.tableView.scrollable = true;
    // データをクリア
    con.UI.tableView.data = [];
    con.UI.tableView.backgroundColor = '#FFFFFF';
    var similar_property_name_margin_left = 70;
    var form_ta_height = 60;
    if(setting.os =='ipad'){
        setting.form_title_height = 30;
        setting.form_tf_height = 30;
        similar_property_name_margin_left = 95;
        var form_ta_height = 120;
    }
    var form_margin_left = "5%";
    
    var stay = '';
    var span = '';
    var name = '';
    var kana = '';
    var company = '';
    var mail = '';
    var telephone = '';
    var detail = '';
    var params = { tids:'',similar_tid_mid:'',similar_property_name:'',stay: stay,span: span,name: name,kana: kana,company: company,mail: mail,telephone: telephone,detail: detail};
    var approximate = { move:0, period:0};
    //database
    var db = Ti.Database.open(db_setting.database);
    //add col
    db.execute('create table if not exists ' + db_setting.table_inquiry + ' (approximate_move INTEGER, approximate_period INTEGER, name TEXT, kana TEXT, company TEXT, mail TEXT, telephone TEXT, detail TEXT, similar INTEGER)');
    //db.execute('alter table ' + db_setting.table_inquiry + ' add column similar INTEGER');
    
    var rows = db.execute('select rowid,* from ' + db_setting.table_inquiry);
    var row_count = rows.getRowCount();
    
    //debug
    //if( row_count > 0) db.execute('update ' + db_setting.table_inquiry + ' set similar = ? where rowid = ?', 0, rows.fieldByName('rowid'));
    
    //stay////////////////////////////////////////
    var row = cu.makeInquiryTitleRow( L('form_stay_title'),setting.form_title_height,form_margin_left );
    var stay_tf = makeTextField( L('form_stay_title'),"90%",form_margin_left,Ti.UI.KEYBOARD_DEFAULT );
    //キーボード消す
    stay_tf.addEventListener('focus',function(e){
        stay_tf.blur();
    });
    row.add(stay_tf);
    con.UI.tableView.appendRow(row);
    var default_stay = 0;
    if(row_count > 0){
        default_stay = rows.fieldByName('approximate_move');
        approximate.move = default_stay;
    }
    if(setting.os == 'ipad'){
        var stay_popover = require("include/ui/parts/stay_popover");
        stay_popover.exec(approximate,stay_tf,row_count,default_stay);
    }else{
        var stay_picker = require("include/ui/parts/stay_picker");
        stay_picker.exec(approximate,stay_tf,row_count,default_stay);
    }

    //span////////////////////////////////////////
    var row = cu.makeInquiryTitleRow( L('form_span_title'),setting.form_title_height,form_margin_left );
    var span_tf = makeTextField( L('form_span_title'),"90%",form_margin_left,Ti.UI.KEYBOARD_DEFAULT );
    //キーボード消す
    span_tf.addEventListener('focus',function(e){
        span_tf.blur();
    });
    row.add(span_tf);
    con.UI.tableView.appendRow(row);
    var default_span = 0;
    if(row_count > 0){
        default_span = rows.fieldByName('approximate_period');
        approximate.period = default_span;
    }
    if(setting.os == 'ipad'){
        var span_popover = require("include/ui/parts/span_popover");
        span_popover.exec(approximate,span_tf,row_count,default_span);
    }else{
        var span_picker = require("include/ui/parts/span_picker");
        span_picker.exec(approximate,span_tf,row_count,default_span);
    }


    // Reusable buttons
    var buttonSpacer =  Titanium.UI.createButton({
            systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE,
        });
        // Keyboard Toolbar
    
    var buttonHide = Ti.UI.createButton({
            title: L('form_hide_title')
        });
    var keyboardToolbarButtons = [buttonSpacer, buttonHide];


    //お名前///////////////////////////////////////
    var row = cu.makeInquiryTitleRow( L('form_name_title'),setting.form_title_height,form_margin_left );
    var name_tf = makeTextField( L('form_name_title'),"90%",form_margin_left,Ti.UI.KEYBOARD_DEFAULT );
    name_tf.keyboardToolbar = keyboardToolbarButtons;
    name_tf.keyboardToolbarColor = setting.bar_color;

    if(row_count > 0){
        name_tf.value = rows.fieldByName('name');
    }else{
        if(setting.isDebug) name_tf.value = '本間 圭一';
    }
    row.add(name_tf);
    con.UI.tableView.appendRow(row);
    
    //フリガナ///////////////////////////////////////
    if(!setting.isEn){
        var row = cu.makeInquiryTitleRow( L('form_kana_title'),setting.form_title_height,form_margin_left );
        var kana_tf = makeTextField( L('form_kana_title'),"90%",form_margin_left,Ti.UI.KEYBOARD_DEFAULT );
        kana_tf.keyboardToolbar = keyboardToolbarButtons;
        kana_tf.keyboardToolbarColor = setting.bar_color;
        if(row_count > 0){
            kana_tf.value = rows.fieldByName('kana');
        }else{
            if(setting.isDebug) kana_tf.value = 'ホンマ ケイイチ';
        }
        row.add(kana_tf);
        con.UI.tableView.appendRow(row);
    }

    //会社名///////////////////////////////////////
    var row = cu.makeInquiryTitleRow( L('form_company_name_title'),setting.form_title_height,form_margin_left );
    var company_tf = makeTextField( L('form_company_name_title'),"90%",form_margin_left,Ti.UI.KEYBOARD_DEFAULT );
    company_tf.keyboardToolbar = keyboardToolbarButtons;
    company_tf.keyboardToolbarColor = setting.bar_color;
    if(row_count > 0){
        company_tf.value = rows.fieldByName('company');
    }else{
        if(setting.isDebug) company_tf.value = '株式会社81';
    }
    row.add(company_tf);
    con.UI.tableView.appendRow(row);

    //メールアドレス///////////////////////////////////////
    var row = cu.makeInquiryTitleRow( L('form_mail_title'),setting.form_title_height,form_margin_left );
    var mail_tf = makeTextField( L('form_mail_title'),"90%",form_margin_left,Ti.UI.KEYBOARD_DEFAULT );
    mail_tf.keyboardToolbar = keyboardToolbarButtons;
    mail_tf.keyboardToolbarColor = setting.bar_color;
    if(row_count > 0){
        mail_tf.value = rows.fieldByName('mail');
    }else{
        if(setting.isDebug) mail_tf.value = 'honma@zeus.corp.813.co.jp';
    }
    row.add(mail_tf);
    con.UI.tableView.appendRow(row);

    //tel///////////////////////////////////////
    var row = cu.makeInquiryTitleRow( L('form_tel_title'),setting.form_title_height,form_margin_left );
    var tel_tf = makeTextField( L('form_tel_title'),"90%",form_margin_left,Ti.UI.KEYBOARD_PHONE_PAD );
    tel_tf.keyboardToolbar = keyboardToolbarButtons;
    tel_tf.keyboardToolbarColor = setting.bar_color;
    if(row_count > 0){
        tel_tf.value = rows.fieldByName('telephone');
    }else{
        if(setting.isDebug) tel_tf.value = '03-5428-8307';
    }
    
    row.add(tel_tf);
    con.UI.tableView.appendRow(row);

    //メッセージ///////////////////////////////////////
    var row = cu.makeInquiryTitleRow( L('form_requests_questions_title'),setting.form_title_height,form_margin_left );
    
    var request_ta = Ti.UI.createTextArea({
        value:'',
        keyboardToolbar: keyboardToolbarButtons,
        keyboardToolbarColor: setting.bar_color,
        suppressReturn: false,
        font: {fontSize:12},
        color: '#333333',
        height: form_ta_height,
        top: setting.form_title_height,
        left: form_margin_left,
        right: form_margin_left,
        keyboardType:Ti.UI.KEYBOARD_DEFAULT,
        textAlign:'left',
        appearance:Titanium.UI.KEYBOARD_APPEARANCE_ALERT,
        borderWidth:2,
        borderColor:'#bbb',
        borderRadius:5
    });
    buttonHide.addEventListener('click', function(e){
        name_tf.blur();
        if(!setting.isEn) kana_tf.blur();
        company_tf.blur();
        mail_tf.blur();
        tel_tf.blur();
        request_ta.blur();
    });
    if(row_count > 0){
        request_ta.value = rows.fieldByName('detail');
    }else{
        if(setting.isDebug) request_ta.value = '要望は特にありません\n宜しくお願いいたします。';
    }
    
    row.add(request_ta);
    con.UI.tableView.appendRow(row);

    //similar property///////////////////////////////////////
    var isSimilar = true;
    var similar_value = 0;
    var similar_tid_mid = '';
    var db_is_similar = 0;
    if(row_count > 0){
        db_is_similar = rows.fieldByName('similar');
        if(db_is_similar == 1){
            similar_value = 1;
        }
    }
    if(db_is_similar != 1 && json.inquiry_similar.length > 0){
        var row = cu.makeInquiryTitleRow( L('property_near_property_title'),setting.form_title_height,form_margin_left );
        row.selectionStyle = Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE;
        var top_margin = setting.form_title_height;
        
        var btnDelete = Ti.UI.createButton({
            title : L('btn_delete_title'),
            color:'#000000',
            width:50,
            height:30,
            top:top_margin,
            left:form_margin_left,
            font:{fontSize:11,fontWeight:'normal'},
        });
        //tids更新
        similar_tid_mid = json.inquiry_similar[0].col_tid + ',' + json.inquiry_similar[0].col_mid;
        
        //物件タイトル
        if(setting.isEn){
            var property_name_text = json.inquiry_similar[0].col_building_e + ' / ' + json.inquiry_similar[0].col_type_e + ' / ' + json.inquiry_similar[0].col_size + '㎡' + ' / ' + json.inquiry_similar[0].col_area_e + ' / ' +  json.inquiry_similar[0].col_rent_cost_e;
        }else{
            var property_name_text = json.inquiry_similar[0].col_building + ' / ' + json.inquiry_similar[0].col_type + ' / ' + json.inquiry_similar[0].col_size + '㎡' + ' / ' + json.inquiry_similar[0].col_area + ' / ' +  json.inquiry_similar[0].col_rent_cost;
        }
        var similar_property_name = cu.createTitleLabel(property_name_text,setting.row_title_color,'auto',setting.form_title_height,0,form_margin_left);
        similar_property_name.color = '#000000';
        similar_property_name.height = Ti.UI.SIZE;
        similar_property_name.left = similar_property_name_margin_left;
        similar_property_name.top = top_margin + 5;
        row.add(btnDelete);
        row.add(similar_property_name);

        // Event
        btnDelete.addEventListener('click', function(e){
            isSimilar = false;
            similar_value = 1;
            btnDelete.enabled = false;
            similar_property_name.color = '#FFFFFF';//delete
        });
        con.UI.tableView.appendRow(row);
    }

    // 確認ボタン
    var row = Ti.UI.createTableViewRow();
    var confirm_button = Ti.UI.createButton({
        backgroundImage:'img/confirm_btn_' + setting.lang_string + '.png',
        top:5,
        width:300,
        height:35,
    });
    row.add(confirm_button);
    con.UI.tableView.appendRow(row);

    rows.close();
    db.close();

    // 送信ボタン押下時の処理
    confirm_button.addEventListener('click', function(e){
        //validateチェック
        var validate = true;
        if(validate && approximate.move === ''){
            alert(L('alert_stay_message'));
            validate = false;
        }
        if(validate && approximate.period === ''){
            alert(L('alert_span_message'));
            validate = false;
        }
        if(validate && name_tf.value == ''){
            alert(L('alert_name_message'));
            validate = false;
        }
        if(validate && !setting.isEn && kana_tf.value == ''){
            alert(L('alert_kana_message'));
            validate = false;
        }
        if(validate && mail_tf.value == ''){
            alert(L('alert_mail_message'));
            validate = false;
        }
        if(validate && tel_tf.value == ''){
            alert(L('alert_tel_message'));
            validate = false;
        }
        
        
        if(validate){
            
            params.tids = tids;
            if(isSimilar && similar_tid_mid !== '' ){
                params.similar_tid_mid = similar_tid_mid;
                params.similar_property_name = property_name_text;
            }
            params.stay = approximate.move;
            params.span = approximate.period;
            params.name = name_tf.value;
            if(!setting.isEn){
                params.kana = kana_tf.value;
            }else{
                params.kana = '';
            }
            
            params.company = company_tf.value;
            params.mail = mail_tf.value;
            params.telephone = tel_tf.value;
            params.detail = request_ta.value;
            //os
            params.os = setting.os;

            //database
            db = Ti.Database.open(db_setting.database);
            if( row_count > 0){
                db.execute('DELETE FROM ' + db_setting.table_inquiry);
            }
            //insert
            db.execute('insert into ' + db_setting.table_inquiry + ' (approximate_move, approximate_period,name,kana,company,mail,telephone,detail,similar ) VALUES(?,?,?,?,?,?,?,?,?)',params.stay,params.span,params.name,params.kana,params.company,params.mail,params.telephone,params.detail,similar_value);
            db.close();

            Ti.UI.currentTab.open(
                Ti.UI.createWindow({
                    title: L('tab_name_inquiry'),
                    url: "confirm.js",
                    navBarHidden: false,
                    barColor: setting.bar_color,
                    // Extended
                    ext : {
                        params : params
                    }
                })
            );
        }
    });

    function makeTextField(hint,width,margin_left,keyboard_type){
        var tf = Ti.UI.createTextField({
            width:width,
            value:'',
            font: {fontSize:12},
            color: setting.row_summary_color,
            hintText: hint,
            height: setting.form_tf_height,
            top: setting.form_title_height,
            left: margin_left,
            borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
            keyboardType:keyboard_type
        });
        return tf;
    }

};