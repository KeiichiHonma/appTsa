exports.exec = function(tids,json){
    var form_title_height = 20;
    var form_tf_height = 20;
    var similar_property_name_margin_left = 70;
    if(setting.os =='ipad'){
        form_title_height = 30;
        form_tf_height = 30;
        similar_property_name_margin_left = 95;
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
    
    //アニメーション
    var open_animation = Ti.UI.createAnimation();
    open_animation.bottom = 0;
    open_animation.duration = 300; //0.5秒間のアニメーションにする

    var hide_animation = Ti.UI.createAnimation();
    hide_animation.bottom = -300;
    hide_animation.duration = 300; //0.5秒間のアニメーションにする

    //共通アイテム
    var btn_view = Titanium.UI.createView({
        //top:50,
        bottom:0,
        height:50,
        width:'auto',
        backgroundColor:'#666666'
    });

    //stay////////////////////////////////////////
    var row = cu.makeTitleRow( L('form_stay_title'),form_title_height,form_margin_left );
    var stay_tf = makeTextField( L('form_stay_title'),"90%",form_margin_left,Ti.UI.KEYBOARD_DEFAULT );
    row.add(stay_tf);
    con.UI.tableView.appendRow(row);
    var is_stay_view = false;

    var childStayWin = Ti.UI.createWindow();
    childStayWin.bottom = -300;

    var picker_stay_name = '';
    var picker_stay_value = '';

    var stay_picker = Ti.UI.createPicker({bottom:50});
    var stay_data = [];
    stay_data[0]=Ti.UI.createPickerRow({title:L('form_stay_name_0'),value:0});
    stay_data[1]=Ti.UI.createPickerRow({title:L('form_stay_name_1'),value:1});
    stay_data[2]=Ti.UI.createPickerRow({title:L('form_stay_name_2'),value:2});
    stay_data[3]=Ti.UI.createPickerRow({title:L('form_stay_name_3'),value:3});
    stay_data[4]=Ti.UI.createPickerRow({title:L('form_stay_name_4'),value:4});
    stay_data[5]=Ti.UI.createPickerRow({title:L('form_stay_name_5'),value:5});
    stay_picker.add(stay_data);
    stay_picker.setSelectedRow(0, 0);
    if(setting.isDebug){
        picker_stay_value = '0';
        stay_tf.value = L('form_stay_name_0');
    }
    
    // 選択表示を有効にします（標準は無効）
    stay_picker.selectionIndicator = true;
    stay_picker.addEventListener('change',function(e){
        // e.row, e.columnとして選択項目が取得できます
        // e.row.custom_itemとして各列のカスタムデータが帰ります
        picker_stay_name = e.row.title;
        picker_stay_value = e.row.value;
    });

    var cancel_stay_button = Ti.UI.createButton({
      backgroundImage:'img/cancel_btn_' + setting.lang_string + '.png',
      color:'#ffffff',
      width:100,
      height:35,
      bottom:5,
      left:'10%',
      opacity:1,
    });

    var submit_stay_button = Ti.UI.createButton({
      backgroundImage:'img/select_btn_' + setting.lang_string + '.png',
      color:'#ffffff',
      width:100,
      height:35,
      bottom:5,
      right:'10%',
      opacity:1,
    });

    childStayWin.add(stay_picker);
    childStayWin.add(btn_view);
    childStayWin.add(submit_stay_button);
    childStayWin.add(cancel_stay_button);

    submit_stay_button.addEventListener('click', function(e){
        is_stay_view = false;
        childStayWin.close(hide_animation);
        stay_tf.value = picker_stay_name;
        //stay_data[picker_stay_value].selected = true;
        //stay_picker.setSelectedRow(0, picker_stay_value,true);
    });

    cancel_stay_button.addEventListener('click', function(e){
        is_stay_view = false;
        childStayWin.close(hide_animation);
    });

    stay_tf.addEventListener('focus', function(e) {
        if(!is_stay_view){
            stay_tf.blur();
            if(picker_stay_value != ''){
                stay_picker.setSelectedRow(0, picker_stay_value,true);
            }
            childStayWin.open(open_animation);
        }
        is_stay_view = true;
    });

    //span////////////////////////////////////////
    var row = cu.makeTitleRow( L('form_span_title'),form_title_height,form_margin_left );
    var span_tf = makeTextField( L('form_span_title'),"90%",form_margin_left,Ti.UI.KEYBOARD_DEFAULT );
    row.add(span_tf);
    con.UI.tableView.appendRow(row);
    var is_span_view = false;

    var childSpanWin = Ti.UI.createWindow();
    childSpanWin.bottom = -300;

    var picker_span_name = '';
    var picker_span_value = '';

    var span_picker = Ti.UI.createPicker({bottom:50});
    var data = [];
    data[0]=Ti.UI.createPickerRow({title:L('form_span_name_0'),value:0});
    data[1]=Ti.UI.createPickerRow({title:L('form_span_name_1'),value:1});
    data[2]=Ti.UI.createPickerRow({title:L('form_span_name_2'),value:2});
    data[3]=Ti.UI.createPickerRow({title:L('form_span_name_3'),value:3});
    data[4]=Ti.UI.createPickerRow({title:L('form_span_name_4'),value:4});
    data[4]=Ti.UI.createPickerRow({title:L('form_span_name_5'),value:4});
    span_picker.add(data);
    span_picker.setSelectedRow(0, 0);
    if(setting.isDebug){
        picker_span_value = '0';
        span_tf.value = L('form_span_name_0');
    }
    
    // 選択表示を有効にします（標準は無効）
    span_picker.selectionIndicator = true;
    span_picker.addEventListener('change',function(e){
        // e.row, e.columnとして選択項目が取得できます
        // e.row.custom_itemとして各列のカスタムデータが帰ります
        picker_span_name = e.row.title;
        picker_span_value = e.row.value;
    });

    var cancel_span_button = Ti.UI.createButton({
      backgroundImage:'img/cancel_btn_' + setting.lang_string + '.png',
      color:'#ffffff',
      width:100,
      height:35,
      bottom:5,
      left:'10%',
      opacity:1,
    });

    var submit_span_button = Ti.UI.createButton({
      backgroundImage:'img/select_btn_' + setting.lang_string + '.png',
      color:'#ffffff',
      width:100,
      height:35,
      bottom:5,
      right:'10%',
      opacity:1,
    });

    childSpanWin.add(span_picker);
    childSpanWin.add(btn_view);
    childSpanWin.add(submit_span_button);
    childSpanWin.add(cancel_span_button);

    submit_span_button.addEventListener('click', function(e){
        is_span_view = false;
        childSpanWin.close(hide_animation);
        span_tf.value = picker_span_name;
    });

    cancel_span_button.addEventListener('click', function(e){
        is_span_view = false;
        childSpanWin.close(hide_animation);
    });

    span_tf.addEventListener('focus', function(e) {
        if(!is_span_view){
            span_tf.blur();
            if(picker_span_value != ''){
                span_picker.setSelectedRow(0, picker_span_value,true);
            }
            childSpanWin.open(open_animation);
        }
        is_span_view = true;
    });

    //お名前///////////////////////////////////////
    var row = cu.makeTitleRow( L('form_name_title'),form_title_height,form_margin_left );
    var name_tf = makeTextField( L('form_name_title'),"90%",form_margin_left,Ti.UI.KEYBOARD_DEFAULT );
    if(setting.isDebug) name_tf.value = '本間　圭一';
    row.add(name_tf);
    con.UI.tableView.appendRow(row);
    
    //フリガナ///////////////////////////////////////
    if(!setting.isEn){
        var row = cu.makeTitleRow( L('form_kana_title'),form_title_height,form_margin_left );
        var kana_tf = makeTextField( L('form_kana_title'),"90%",form_margin_left,Ti.UI.KEYBOARD_DEFAULT );
        if(setting.isDebug) kana_tf.value = 'ホンマ　ケイイチ';
        row.add(kana_tf);
        con.UI.tableView.appendRow(row);
    }

    //会社名///////////////////////////////////////
    var row = cu.makeTitleRow( L('form_company_name_title'),form_title_height,form_margin_left );
    var company_tf = makeTextField( L('form_company_name_title'),"90%",form_margin_left,Ti.UI.KEYBOARD_DEFAULT );
    if(setting.isDebug) company_tf.value = '株式会社81';
    row.add(company_tf);
    con.UI.tableView.appendRow(row);

    //メールアドレス///////////////////////////////////////
    var row = cu.makeTitleRow( L('form_mail_title'),form_title_height,form_margin_left );
    var mail_tf = makeTextField( L('form_mail_title'),"90%",form_margin_left,Ti.UI.KEYBOARD_DEFAULT );
    if(setting.isDebug) mail_tf.value = 'honma@zeus.corp.813.co.jp';
    row.add(mail_tf);
    con.UI.tableView.appendRow(row);

    //tel///////////////////////////////////////
    var row = cu.makeTitleRow( L('form_tel_title'),form_title_height,form_margin_left );
    var tel_tf = makeTextField( L('form_tel_title'),"90%",form_margin_left,Ti.UI.KEYBOARD_PHONE_PAD );
    if(setting.isDebug) tel_tf.value = '03-5428-8307';
    row.add(tel_tf);
    con.UI.tableView.appendRow(row);

    //メッセージ///////////////////////////////////////
    var row = cu.makeTitleRow( L('form_requests_questions_title'),form_title_height,form_margin_left );
    var request_ta = Ti.UI.createTextArea({
        value:'',
        font: {fontSize:12},
        color: '#333333',
        height: 30,
        top: form_title_height,
        left: form_margin_left,
        right: form_margin_left,
        keyboardType:Ti.UI.KEYBOARD_DEFAULT,
        textAlign:'left',
        appearance:Titanium.UI.KEYBOARD_APPEARANCE_ALERT,
        borderWidth:2,
        borderColor:'#bbb',
        borderRadius:5
    });
    if(setting.isDebug) request_ta.value = '要望は特にありません\n宜しくお願いいたします。';
    row.add(request_ta);
    con.UI.tableView.appendRow(row);

    //similar property///////////////////////////////////////
    var isSimilar = true;
    var similar_tid_mid = '';
    if(json.inquiry_similar.length > 0){
        var row = cu.makeTitleRow( L('property_near_property_title'),form_title_height,form_margin_left );
        row.selectionStyle = Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE;
        var top_margin = form_title_height;
        
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
        var similar_property_name = cu.createTitleLabel(property_name_text,setting.row_title_color,'auto',form_title_height,0,form_margin_left);
        similar_property_name.color = '#000000';
        similar_property_name.height = Ti.UI.SIZE;
        similar_property_name.left = similar_property_name_margin_left;
        similar_property_name.top = top_margin + 5;
        row.add(btnDelete);
        row.add(similar_property_name);

        // Event
        btnDelete.addEventListener('click', function(e){
            isSimilar = false;
            btnDelete.enabled = false;
            similar_property_name.color = '#FFFFFF';
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

    // 送信ボタン押下時の処理
    confirm_button.addEventListener('click', function(e){
        //validateチェック
        var validate = true;
        if(validate && picker_stay_value === ''){
            alert(L('alert_stay_message'));
            validate = false;
        }
        if(validate && picker_span_value === ''){
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
            params.stay = picker_stay_value;
            params.span = picker_span_value;
            params.name = name_tf.value;
            if(!setting.isEn) params.kana = kana_tf.value;
            
            params.company = company_tf.value;
            params.mail = mail_tf.value;
            params.telephone = tel_tf.value;
            params.detail = request_ta.value;

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
            height: form_tf_height,
            top: form_title_height,
            left: margin_left,
            borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
            keyboardType:keyboard_type
        });
        return tf;
    }

};