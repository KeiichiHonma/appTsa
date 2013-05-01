exports.exec = function(){
    //con.UI.tableView.data = [];
    //ヘッダ画像////////////////////////////////////////
    var row = Ti.UI.createTableViewRow({
        height:130,
        touchEnabled : false,
        selectionStyle : Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
        hasChild:false,
        ext : {
            rowTitle : 'home'
        }
        });
    row.add(cu.createWrapImageView('img/header_' + setting.lang_string + '.jpg',320,130));
    con.UI.tableView.appendRow(row);

    //title////////////////////////////////////////////////////////////////////////////
    var titleRow = Ti.UI.createTableViewRow({
        height:60,
        touchEnabled : false,
        selectionStyle : Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
        hasChild:false
    });

    var label = Ti.UI.createLabel({
        text:L('form_thank_message'),
        color:setting.row_title_color,
        font:{fontSize:20,fontWeight:'bold'},
        top:10,
        bottom:10
    });
    titleRow.add(label);
    con.UI.tableView.appendRow(titleRow);

    //message////////////////////////////////////////////////////////////////////////////
    var messageRow = Ti.UI.createTableViewRow({
        height:80,
        touchEnabled : false,
        selectionStyle : Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
        hasChild:false
    });

    var label = Ti.UI.createLabel({
        text:L('form_result_message'),
        color:setting.row_title_color,
        font:{fontSize:14,fontWeight:'bold'},
        top:10,
        bottom:10
    });
    messageRow.add(label);
    con.UI.tableView.appendRow(messageRow);

    //resultだけフォーカスしたら戻る
    win.addEventListener('focus', function(e){
        win.showNavBar();
        win.title = L('tab_name_inquiry');
        con.loadInquiry();
    });
};