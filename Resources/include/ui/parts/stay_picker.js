exports.exec = function(approximate,stay_tf){
    var is_stay_view = false;

    var childStayWin = Ti.UI.createWindow();
    childStayWin.bottom = -300;

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
        win.removeEventListener('focus', listener);
        is_stay_view = false;
        childStayWin.close(hide_animation);
        stay_tf.value = picker_stay_name;
        approximate.move = picker_stay_value;
        win.addEventListener('focus', listener);
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
}