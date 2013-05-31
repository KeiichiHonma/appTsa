exports.exec = function(approximate,span_tf,row_count,default_span){
    var is_span_view = false;

    var childSpanWin = Ti.UI.createWindow();
    childSpanWin.bottom = -300;

    //アニメーション
    var open_animation = Ti.UI.createAnimation();
    open_animation.bottom = 0;
    open_animation.duration = 300; //0.5秒間のアニメーションにする

    var hide_animation = Ti.UI.createAnimation();
    hide_animation.bottom = -300;
    hide_animation.duration = 300; //0.5秒間のアニメーションにする

    //共通アイテム
    var btn_view = Titanium.UI.createView({
        bottom:0,
        height:50,
        width:'auto',
        backgroundColor:'#666666'
    });
    var picker_span_name = '';
    var picker_span_value = '';
    
    var span_picker = Ti.UI.createPicker({bottom:50});
    var data = [];
    data[0]=Ti.UI.createPickerRow({title:L('form_span_name_0'),value:0});
    data[1]=Ti.UI.createPickerRow({title:L('form_span_name_1'),value:1});
    data[2]=Ti.UI.createPickerRow({title:L('form_span_name_2'),value:2});
    data[3]=Ti.UI.createPickerRow({title:L('form_span_name_3'),value:3});
    data[4]=Ti.UI.createPickerRow({title:L('form_span_name_4'),value:4});
    data[5]=Ti.UI.createPickerRow({title:L('form_span_name_5'),value:5});
    span_picker.add(data);
    span_picker.setSelectedRow(0, default_span);
    if(row_count > 0){
        picker_span_value = default_span;
        span_tf.value = L('form_span_name_' + default_span);
    }else{
        if(setting.isDebug){
            picker_span_value = '0';
            span_tf.value = L('form_span_name_0');
        }
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
        win.removeEventListener('focus', listener);
        is_span_view = false;
        childSpanWin.close(hide_animation);
        span_tf.value = picker_span_name;
        approximate.period = picker_span_value;
        win.addEventListener('focus', listener);
    });

    cancel_span_button.addEventListener('click', function(e){
        win.removeEventListener('focus', listener);
        is_span_view = false;
        childSpanWin.close(hide_animation);
        win.addEventListener('focus', listener);
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
}