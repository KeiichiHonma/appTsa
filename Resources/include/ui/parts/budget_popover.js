exports.exec = function(conditions,picker_title,event_obj){
    var rowView = Ti.UI.createView({
        height:40
    });
    rowView.addEventListener('click', function(e){
        // PopOverの作成
        var popTableView = Ti.UI.createTableView({
            data : [
            {title: L('search_budget_0'),value:0},
            {title: L('search_budget_1'),value:1},
            {title: L('search_budget_2'),value:2},
            {title: L('search_budget_3'),value:3},
            {title: L('search_budget_4'),value:4},
            ]
        });
        var popOver = Ti.UI.iPad.createPopover({
            title: L('search_budget_title'),
            barColor: setting.row_title_background_color,
            width: 400,
            height:220
        });
        popTableView.addEventListener('click', function(e){
            picker_title.text = e.rowData.title;
            //picker_budget_value = e.rowData.value;
            conditions.budgets.push(e.rowData.value);
            popOver.hide();
            popTableView = null;
            popOver = null;
        });
        popOver.add(popTableView);
        popOver.show({view: rowView, animate: true});
    });
    event_obj.add(rowView);
}