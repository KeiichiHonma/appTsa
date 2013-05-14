exports.exec = function(params){
    var row = cu.makeTitleRow( L('confirm_message_title'),20,10 );
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
    var row = cu.makeTitleRow( L('form_stay_title'),20,10 );
    row.add(makeLabel( L('form_stay_name_' + win.ext.params.stay) ) );
    con.UI.tableView.appendRow(row);

    //span///////////////////////////////////////
    var row = cu.makeTitleRow( L('form_span_title'),20,10 );
    row.add(makeLabel( L('form_span_name_' + win.ext.params.span) ) );
    con.UI.tableView.appendRow(row);

    //お名前///////////////////////////////////////
    var row = cu.makeTitleRow( L('form_name_title'),20,10 );
    row.add(makeLabel(win.ext.params.name) );
    con.UI.tableView.appendRow(row);

    //フリガナ///////////////////////////////////////
    if(!setting.isEn){
        var row = cu.makeTitleRow( L('form_kana_title'),20,10 );
        row.add(makeLabel(win.ext.params.kana) );
        con.UI.tableView.appendRow(row);
    }

    //会社名///////////////////////////////////////
    var row = cu.makeTitleRow( L('form_company_name_title'),20,10 );
    row.add(makeLabel(win.ext.params.company) );
    con.UI.tableView.appendRow(row);

    //メールアドレス///////////////////////////////////////
    var row = cu.makeTitleRow( L('form_mail_title'),20,10 );
    row.add(makeLabel(win.ext.params.mail) );
    con.UI.tableView.appendRow(row);
    
    //tel///////////////////////////////////////
    var row = cu.makeTitleRow( L('form_tel_title'),20,10 );
    row.add(makeLabel(win.ext.params.telephone) );
    con.UI.tableView.appendRow(row);

    //メッセージ///////////////////////////////////////
    var row = cu.makeTitleRow( L('form_requests_questions_title'),20,10 );
    row.add(makeLabel(win.ext.params.detail) );
    con.UI.tableView.appendRow(row);

    //similar///////////////////////////////////////
    var row = cu.makeTitleRow( L('property_near_property_title'),20,10 );
    row.add(makeLabel(win.ext.params.similar_property_name) );
    con.UI.tableView.appendRow(row);

    // 送信ボタン押下時の処理
    submit_button.addEventListener('click', function(e){
        Ti.UI.currentTab.open(
            Ti.UI.createWindow({
                url: "result.js",
                navBarHidden: false,
                barColor: setting.bar_color,
                // Extended
                ext : {
                    params : params
                }
            })
        );
    });

    function makeLabel(text){
        var label = Ti.UI.createLabel({
            text:text,
            color:setting.row_summary_color,
            backgroundColor:'#ffffff',
            font:{fontSize:12,fontWeight:'normal'},
            top:20,
            left:10,
            right:10
        });
        return label;
    }
};