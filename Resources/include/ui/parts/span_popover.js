exports.exec = function(approximate,span_tf,row_count,default_span){
    if(row_count > 0){
        span_tf.value = L('form_span_name_' + default_span);
    }else{
        if(setting.isDebug){
            span_tf.value = L('form_span_name_0');
        }
    }
    span_tf.addEventListener('focus', function(e){
        // PopOverの作成
        var popTableView = Ti.UI.createTableView({
            data : [
            {title: L('form_span_name_0'),value:0},
            {title: L('form_span_name_1'),value:1},
            {title: L('form_span_name_2'),value:2},
            {title: L('form_span_name_3'),value:3},
            {title: L('form_span_name_4'),value:4},
            {title: L('form_span_name_5'),value:5}
            ]
        });
        var popOver = Ti.UI.iPad.createPopover({
            title: L('form_span_title'),
            barColor: setting.row_title_background_color,
            width: 400,
            height:265
        });
        popTableView.addEventListener('click', function(e){
            span_tf.value = e.rowData.title;
            approximate.period = e.rowData.value;
            popOver.hide();
            popTableView = null;
            popOver = null;
        });
        popOver.add(popTableView);
        popOver.show({view: span_tf, animate: true});
    });
}