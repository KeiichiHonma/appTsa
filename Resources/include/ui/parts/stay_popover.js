exports.exec = function(approximate,stay_tf,row_count,default_stay){
    if(row_count > 0){
        stay_tf.value = L('form_stay_name_' + default_stay);
    }else{
        if(setting.isDebug){
            stay_tf.value = L('form_stay_name_0');
        }
    }
    stay_tf.addEventListener('focus', function(e){
        // PopOverの作成
        var popTableView = Ti.UI.createTableView({
            data : [
            {title: L('form_stay_name_0'),value:0},
            {title: L('form_stay_name_1'),value:1},
            {title: L('form_stay_name_2'),value:2},
            {title: L('form_stay_name_3'),value:3},
            {title: L('form_stay_name_4'),value:4},
            {title: L('form_stay_name_5'),value:5}
            ]
        });
        var popOver = Ti.UI.iPad.createPopover({
            title: L('form_stay_title'),
            barColor: setting.row_title_background_color,
            width: 400,
            height:265
        });
        popTableView.addEventListener('click', function(e){
            stay_tf.value = e.rowData.title;
            approximate.move = e.rowData.value;
            popOver.hide();
            popTableView = null;
            popOver = null;
        });
        popOver.add(popTableView);
        popOver.show({view: stay_tf, animate: true});
    });
}