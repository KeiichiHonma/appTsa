exports.exec = function(){
    con.UI.tableView.separatorStyle = Titanium.UI.iPhone.TableViewSeparatorStyle.NONE;
    con.UI.tableView.backgroundColor = setting.row_title_background_color;
    var row = Ti.UI.createTableViewRow({
        height:setting.header_img_height,
        touchEnabled : false,
        selectionStyle : Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
        hasChild:false,
        ext : {
            rowTitle : 'home'
        }
        });
    row.add(cu.createWrapImageView('img/header_' + setting.lang_string + setting.os_width + '.jpg',setting.os_width,setting.header_img_height));
    con.UI.tableView.appendRow(row);

    //title////////////////////////////////////////////////////////////////////////////
    var titleRow = Ti.UI.createTableViewRow({
        height:Ti.UI.SIZE,
        touchEnabled : false,
        selectionStyle : Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
        hasChild:false
    });

    var label = Ti.UI.createLabel({
        text:L('form_thank_message'),
        color:setting.row_title_color,
        font:{fontSize:16,fontWeight:'bold'},
        top:10,
        left:10,
        right:10,
    });
    titleRow.add(label);
    con.UI.tableView.appendRow(titleRow);

    //message////////////////////////////////////////////////////////////////////////////
    var messageRow = Ti.UI.createTableViewRow({
        height:Ti.UI.SIZE,
        touchEnabled : false,
        selectionStyle : Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
        hasChild:false
    });

    var label = Ti.UI.createLabel({
        text:L('form_result_message'),
        color:setting.row_title_color,
        font:{fontSize:14,fontWeight:'bold'},
        top:10,
        left:10,
        right:10,
    });
    messageRow.add(label);
    con.UI.tableView.appendRow(messageRow);
    win.addEventListener('blur', function(e){
        win._caller.close();
        win.close();
    });
};