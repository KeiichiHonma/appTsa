exports.exec = function(){
    var form_title_height = 20;
    var form_tf_height = 20;
    var form_margin_left = 5;
    
    // データをクリア
    con.UI.tableView.data = [];

    //var row = cu.makeTitleRow( L('help_title'),form_title_height,form_margin_left );
    //con.UI.tableView.appendRow(row);
    con.UI.tableView.appendRow( cu.createSearchTitleRow( L('help_inquiry_title') ) );

    var row = cu.makeTitleRow( L('help_press_message'),30,form_margin_left );
    con.UI.tableView.appendRow(row);

    var row = Ti.UI.createTableViewRow({
        height:'auto',
        touchEnabled : false,
        selectionStyle : Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
        hasChild:false
    });

    var save_button = Ti.UI.createButton({
      backgroundImage:'img/save_btn_' + setting.lang_string + '.png',
      color:'#ffffff',
      width:320,
      height:60,
      top:5,
      bottom:10,
      left:0
    });
    row.add(save_button);
    con.UI.tableView.appendRow(row);
    
    //about
    con.UI.tableView.appendRow( cu.createSearchTitleRow( L('help_about_title') ) );
    var row = cu.makeTitleRow( L('help_about_message'),"auto",form_margin_left );
    con.UI.tableView.appendRow(row);
};