exports.exec = function(){
    // データをクリア
    con.UI.tableView.data = [];
    
    con.UI.tableView.scrollable = false;
    con.UI.tableView.backgroundColor = '#ffffff';
    //win.backgroundColor = setting.row_title_background_color;
    var form_title_height = 20;
    var form_tf_height = 20;
    var form_margin_left = 5;
    
    var help_title_row = cu.createSearchTitleRow( L('help_inquiry_title') );
    help_title_row.height = Ti.UI.SIZE;
    con.UI.tableView.appendRow( help_title_row );
    
    var row = cu.makeInquiryTitleRow( L('help_press_message'),Ti.UI.SIZE,form_margin_left );
    con.UI.tableView.appendRow( row );

    var row = Ti.UI.createTableViewRow({
        height:'auto',
        touchEnabled : false,
        selectionStyle : Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
        hasChild:false
        });

    var save_button = Ti.UI.createImageView({
      image:'img/save_btn_' + setting.lang_string + '.png',
      width:setting.save_btn_width,
      height:setting.save_btn_height,
      top:5,
      bottom:10,
      left:10
    });
    var save_s_button = Ti.UI.createImageView({
      image:'img/save_btn_s_' + setting.lang_string + '.png',
      width:setting.save_btn_s_width,
      height:setting.save_btn_s_height,
      top:5,
      bottom:10,
      left:setting.save_btn_width + 20
    });
    row.add(save_button);
    row.add(save_s_button);
    con.UI.tableView.appendRow(row);
    
    //about
    var help_about_row = cu.createSearchTitleRow( L('help_about_title') );
    con.UI.tableView.appendRow( help_about_row );
    var row = cu.makeInquiryTitleRow( L('help_about_message'),"auto",form_margin_left );
    con.UI.tableView.appendRow(row);
};