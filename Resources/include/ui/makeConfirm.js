exports.exec = function(params){
    // データをクリア
    con.UI.tableView.data = [];
    var row = cu.makeInquiryTitleRow( L('confirm_message_title'),20,10 );
    con.UI.tableView.appendRow(row);

    //送信ボタン
    var row = Ti.UI.createTableViewRow();
    var submit_button = Ti.UI.createButton({
        backgroundImage:'img/submit_btn_' + setting.lang_string + '.png',
        top:5,
        bottom:5,
        width:300,
        height:35,
    });
    row.add(submit_button);
    con.UI.tableView.appendRow(row);

    //stay///////////////////////////////////////
    var row = cu.makeInquiryTitleRow( L('form_stay_title'),20,10 );
    row.add(makeLabel( L('form_stay_name_' + win.ext.params.stay) ) );
    con.UI.tableView.appendRow(row);

    //span///////////////////////////////////////
    var row = cu.makeInquiryTitleRow( L('form_span_title'),20,10 );
    row.add(makeLabel( L('form_span_name_' + win.ext.params.span) ) );
    con.UI.tableView.appendRow(row);

    //お名前///////////////////////////////////////
    var row = cu.makeInquiryTitleRow( L('form_name_title'),20,10 );
    row.add(makeLabel(win.ext.params.name) );
    con.UI.tableView.appendRow(row);

    //フリガナ///////////////////////////////////////
    if(!setting.isEn){
        var row = cu.makeInquiryTitleRow( L('form_kana_title'),20,10 );
        row.add(makeLabel(win.ext.params.kana) );
        con.UI.tableView.appendRow(row);
    }

    //会社名///////////////////////////////////////
    var row = cu.makeInquiryTitleRow( L('form_company_name_title'),20,10 );
    row.add(makeLabel(win.ext.params.company) );
    con.UI.tableView.appendRow(row);

    //メールアドレス///////////////////////////////////////
    var row = cu.makeInquiryTitleRow( L('form_mail_title'),20,10 );
    row.add(makeLabel(win.ext.params.mail) );
    con.UI.tableView.appendRow(row);
    
    //tel///////////////////////////////////////
    var row = cu.makeInquiryTitleRow( L('form_tel_title'),20,10 );
    row.add(makeLabel(win.ext.params.telephone) );
    con.UI.tableView.appendRow(row);

    //メッセージ///////////////////////////////////////
    var row = cu.makeInquiryTitleRow( L('form_requests_questions_title'),20,10 );
    row.add(makeLabel(win.ext.params.detail) );
    con.UI.tableView.appendRow(row);

    //similar///////////////////////////////////////
    if(win.ext.params.similar_property_name != ''){
        var row = cu.makeInquiryTitleRow( L('property_near_property_title'),20,10 );
        row.add(makeLabel(win.ext.params.similar_property_name) );
        con.UI.tableView.appendRow(row);
    }

    

    // 送信ボタン押下時の処理
    submit_button.addEventListener('click', function(e){
        Ti.UI.currentTab.open(
            Ti.UI.createWindow({
                title: L('tab_name_inquiry'),
                url: "result.js",
                navBarHidden: false,
                barColor: setting.bar_color,
                _caller_confirm:win,
                // Extended
                ext : {
                    params : params
                }
            })
        );
    });

    function makeLabel(text){
        if(setting.os == 'ipad'){
            var font_size = 16;
        }else{
            var font_size = 12;
        }
        var label = Ti.UI.createLabel({
            text:text,
            color:setting.row_summary_color,
            backgroundColor:'#ffffff',
            font:{fontSize:font_size,fontWeight:'normal'},
            top:20,
            left:10,
            right:10
        });
        return label;
    }
};