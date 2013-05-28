exports.exec = function(conditions,picker_title,event_obj){

// PopOver自体は普通のViewと同じイメージでコンテナとして使っていけばいい。
var popOver = Ti.UI.iPad.createPopover({
    // Popoverのタイトルバー
    title: 'Popover title',
    // 残念ながら動作的に対応していない(1.4.2時点)
    barColor: '#060',     
    // 縦横指定はデバイスの向きのどちらにも合うようにしておく
    width: 240,
    height:140
});

// コンテナに載せるTableView
var popTableView = Ti.UI.createTableView({
    data : [
         {title: '0'},
         {title: '1'},
         {title: '2'}
    ]
});
// TableViewが選択されれば即座に閉じる。
// ガイドライン上「DONE」ボタンを必須にしないことが望ましいとされているため、
// あまり複雑なUI構成のPopoverは設計しないほうがよい。
// DONEボタンが必要であれば   rightNavButton プロパティを使う。
popTableView.addEventListener('click', function(e){
      /*
       *  呼び出し元へのフィードバックなど（値の下記もどしとか）
       */

      // Popoverを非表示にする
      popOver.hide();
});
// PopoverにTableViewを追加して、表示する。
popOver.add(popTableView);
popOver.show({
    // このviewプロパティに対して矢印表示される(TextFieldとかButtonでも可)
    view: picker_title,
    animate: true
});









/*
    var is_budget_view = false;

    var childWin = Ti.UI.createWindow();
    childWin.bottom = -300; //最初は右にずらして画面からはみ出した状態にしておく

    var open_animation = Ti.UI.createAnimation();
    open_animation.bottom = 0;
    open_animation.duration = 300; //0.5秒間のアニメーションにする

    var hide_animation = Ti.UI.createAnimation();
    hide_animation.bottom = -300;
    hide_animation.duration = 300; //0.5秒間のアニメーションにする

    var picker_budget_name = '';
    var picker_budget_value = '';

    var btn_view = Titanium.UI.createView({
        //top:50,
        bottom:0,
        height:50,
        width:'auto',
        backgroundColor:'#666666'
    });

    var budget_picker = Ti.UI.createPicker({bottom:50});
    var data = [];
    data[0]=Ti.UI.createPickerRow({title:L('search_budget_0'),value:0});
    data[1]=Ti.UI.createPickerRow({title:L('search_budget_1'),value:1});
    data[2]=Ti.UI.createPickerRow({title:L('search_budget_2'),value:2});
    data[3]=Ti.UI.createPickerRow({title:L('search_budget_3'),value:3});
    data[4]=Ti.UI.createPickerRow({title:L('search_budget_4'),value:4});
    budget_picker.add(data);
    budget_picker.setSelectedRow(0, 0);

    // 選択表示を有効にします（標準は無効）
    budget_picker.selectionIndicator = true;
    budget_picker.addEventListener('change',function(e){
        // e.row, e.columnとして選択項目が取得できます
        // e.row.custom_itemとして各列のカスタムデータが帰ります
        picker_budget_name = e.row.title;
        picker_budget_value = e.row.value;
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
      
    childWin.add(budget_picker);
    childWin.add(btn_view);
    childWin.add(submit_button);
    childWin.add(cancel_button);

    submit_button.addEventListener('click', function(e){
        picker_title.text = picker_budget_name;
        conditions.budgets.push(picker_budget_value);
        is_budget_view = false;
        childWin.close(hide_animation);
    });

    cancel_button.addEventListener('click', function(e){
        is_budget_view = false;
        childWin.close(hide_animation);
    });
    event_obj.addEventListener('click', function(e) {
        if(!is_budget_view){
            childWin.open(open_animation);
        }
        is_budget_view = true;
    });
*/
}