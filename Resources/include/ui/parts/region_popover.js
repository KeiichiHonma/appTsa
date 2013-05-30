exports.exec = function(conditions,picker_title,event_obj){
    var rowView = Ti.UI.createView({
        height:40
    });
    rowView.addEventListener('click', function(e){
        // PopOverの作成
        var popTableView = Ti.UI.createTableView({
            data : [
            {title: L('search_map_shinjuku'),value:1},
            {title: L('search_map_akihabara'),value:2},
            {title: L('search_map_shibuya'),value:3},
            {title: L('search_map_roppongi'),value:4},
            {title: L('search_map_ginza'),value:5},
            {title: L('search_map_shinagawa'),value:6},
            {title: L('search_map_yokohama'),value:7},
            {title: L('search_map_odaiba'),value:8},
            ]
        });
        var popOver = Ti.UI.iPad.createPopover({
            title: L('search_map_title'),
            barColor: setting.row_title_background_color,
            width: 400,
            height:350
        });
        popTableView.addEventListener('click', function(e){
            picker_title.text = e.rowData.title;
            //picker_budget_value = e.rowData.value;
            conditions.maps.push(e.rowData.value);
            popOver.hide();
            popTableView = null;
            popOver = null;
        });
        popOver.add(popTableView);
        popOver.show({view: rowView, animate: true});
    });
    event_obj.add(rowView);
}