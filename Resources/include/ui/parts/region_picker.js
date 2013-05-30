exports.exec = function(conditions,picker_title,event_obj){
    var is_region_view = false;

    var childWin = Ti.UI.createWindow();
    childWin.bottom = -300; //最初は右にずらして画面からはみ出した状態にしておく

    var open_animation = Ti.UI.createAnimation();
    open_animation.bottom = 0;
    open_animation.duration = 300; //0.5秒間のアニメーションにする

    var hide_animation = Ti.UI.createAnimation();
    hide_animation.bottom = -300;
    hide_animation.duration = 300; //0.5秒間のアニメーションにする

    var picker_region_name = '';
    var picker_region_value = '';

    var btn_view = Titanium.UI.createView({
        //top:50,
        bottom:0,
        height:50,
        width:'auto',
        backgroundColor:'#666666'
    });

    var region_picker = Ti.UI.createPicker({bottom:50});
    var data = [];
    data[0]=Ti.UI.createPickerRow({title:L('search_map_shinjuku'),value:1});
    data[1]=Ti.UI.createPickerRow({title:L('search_map_akihabara'),value:2});
    data[2]=Ti.UI.createPickerRow({title:L('search_map_shibuya'),value:3});
    data[3]=Ti.UI.createPickerRow({title:L('search_map_roppongi'),value:4});
    data[4]=Ti.UI.createPickerRow({title:L('search_map_ginza'),value:5});
    data[5]=Ti.UI.createPickerRow({title:L('search_map_shinagawa'),value:6});
    data[6]=Ti.UI.createPickerRow({title:L('search_map_yokohama'),value:7});
    data[7]=Ti.UI.createPickerRow({title:L('search_map_odaiba'),value:8});
    region_picker.add(data);
    region_picker.setSelectedRow(0, 0);
    // 選択表示を有効にします（標準は無効）
    region_picker.selectionIndicator = true;
    region_picker.addEventListener('change',function(e){
        // e.row, e.columnとして選択項目が取得できます
        // e.row.custom_itemとして各列のカスタムデータが帰ります
        picker_region_name = e.row.title;
        picker_region_value = e.row.value;
    });

    var cancel_button = Ti.UI.createButton({
      backgroundImage:'img/cancel_btn_' + setting.lang_string + '.png',
      color:'#ffffff',
      width:100,
      height:35,
      bottom:5,
      left:'10%',
      opacity:1,
    });

    var submit_button = Ti.UI.createButton({
      backgroundImage:'img/select_btn_' + setting.lang_string + '.png',
      color:'#ffffff',
      width:100,
      height:35,
      bottom:5,
      right:'10%',
      opacity:1,
    });
      
    childWin.add(region_picker);
    childWin.add(btn_view);
    childWin.add(submit_button);
    childWin.add(cancel_button);

    submit_button.addEventListener('click', function(e){
        conditions.maps = [];//初期化
        picker_title.text = picker_region_name;
        conditions.maps.push(picker_region_value);
        is_region_view = false;
        childWin.close(hide_animation);
    });

    cancel_button.addEventListener('click', function(e){
        is_region_view = false;
        childWin.close(hide_animation);
    });
    event_obj.addEventListener('click', function(e) {
        if(!is_region_view){
            var index = conditions.maps[0] - 1;//ずれるので
            if(conditions.maps.length > 0)region_picker.setSelectedRow(0,index);
            childWin.open(open_animation);
        }
        is_region_view = true;
    });
}