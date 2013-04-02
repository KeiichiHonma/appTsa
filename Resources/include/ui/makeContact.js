exports.exec = function(json){
    var form_title_height = 20;
    var form_tf_height = 30;
    var form_margin_left = 50;
    var form_width = 200;
    
    // データをクリア
    con.UI.tableView.data = [];
    //お名前
    con.UI.tableView.appendRow( makeTextField( makeTitle( L('form_name_title') ) , L('form_name_title') ) );

    //stay////////////////////////////////////////
    var row = Ti.UI.createTableViewRow();
    var stay_title = cu.createTitleLabel(L('form_stay_title'),'#990000','auto',form_title_height,0,form_margin_left);
    row.add(stay_title);
    
    var stay_picker = Ti.UI.createPicker({
        width: form_width,
        top:form_title_height + 5,
        left: form_margin_left
    });
    var data = [];
    data[0]=Ti.UI.createPickerRow({title:L('form_stay_name_0'),custom_item:0});
    data[1]=Ti.UI.createPickerRow({title:L('form_stay_name_1'),custom_item:1});
    data[2]=Ti.UI.createPickerRow({title:L('form_stay_name_2'),custom_item:2});
    data[3]=Ti.UI.createPickerRow({title:L('form_stay_name_3'),custom_item:3});
    data[4]=Ti.UI.createPickerRow({title:L('form_stay_name_4'),custom_item:4});
    data[5]=Ti.UI.createPickerRow({title:L('form_stay_name_5'),custom_item:5});
    stay_picker.add(data);

    // 選択表示を有効にします（標準は無効）
    stay_picker.selectionIndicator = true;
    stay_picker.addEventListener('change',function(e){
        // e.row, e.columnとして選択項目が取得できます
        // e.row.custom_itemとして各列のカスタムデータが帰ります
    });
    row.add(stay_picker);
    con.UI.tableView.appendRow(row);
    
    //span////////////////////////////////////////
    var row2 = Ti.UI.createTableViewRow();
    var span_title = cu.createTitleLabel(L('form_span_title'),'#990000','auto',form_title_height,0,form_margin_left);
    row2.add(span_title);
    
    var span_picker = Ti.UI.createPicker({
        width: form_width,
        top:form_title_height + 5,
        left: form_margin_left
    });

    var data = [];
    data[0]=Ti.UI.createPickerRow({title:L('form_span_name_0'),custom_item:0});
    data[1]=Ti.UI.createPickerRow({title:L('form_span_name_1'),custom_item:1});
    data[2]=Ti.UI.createPickerRow({title:L('form_span_name_2'),custom_item:2});
    data[3]=Ti.UI.createPickerRow({title:L('form_span_name_3'),custom_item:3});
    data[4]=Ti.UI.createPickerRow({title:L('form_span_name_4'),custom_item:4});
    data[5]=Ti.UI.createPickerRow({title:L('form_span_name_5'),custom_item:5});
    span_picker.add(data);

    // 選択表示を有効にします（標準は無効）
    span_picker.selectionIndicator = true;
    span_picker.addEventListener('change',function(e){
        // e.row, e.columnとして選択項目が取得できます
        // e.row.custom_itemとして各列のカスタムデータが帰ります
    });
    row2.add(span_picker);
    con.UI.tableView.appendRow(row2);

    // 送信ボタン
    var button = Ti.UI.createButton({
        title: 'Submit',
        top: 250,
        left: form_margin_left,
        width: form_width,
        height: 50
    });

    // 結果表示ラベル
    var lbl = Ti.UI.createLabel({
        color: 'yellow',
        font: {fontSize:48},
        text: 'Result',
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        top: 300,
        width: 'auto',
        height: 'auto'
    });

    // 送信ボタン押下時の処理
    button.addEventListener('click', function(e){
        // コンソールに入力値を出力
        Ti.API.info(tf.getValue());
        // 結果表示ラベルに値を設定
        lbl.text = tf.getValue();
    });

    
    
    //row.add(span_picker);
    //row.add(tf);// TextForm
    //row.add(button);// 送信ボタン
    //row.add(lbl);// 結果表示ラベル
    //con.UI.tableView.appendRow(row);

    function makeTitle(title){
        var row = Ti.UI.createTableViewRow();
        var title = cu.createTitleLabel(title,'#990000','auto',form_title_height,0,form_margin_left);
        row.add(title);
        return row;
    }

    function makeTextField(row,hint){
        var tf = Ti.UI.createTextField({
            color: '#333333',
            hintText: hint,
            height: form_tf_height,
            top: form_title_height,
            left: form_margin_left,
            width: form_width,
            borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED
        });
        row.add(tf);
        return row;
    }

};