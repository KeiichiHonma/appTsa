exports.exec = function(){
    /*
        var newwin = Titanium.UI.createWindow({
            title: 'result',
            backgroundColor: '#fff',
            navBarHidden: false
        });
        con.UI.tableView.separatorColor = '#ffffff';
        // TableViewの追加
        newwin.add(con.UI.tableView);
        newwin.open();
    */

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
        text:L('form_result_message'),
        color:setting.row_title_color,
        font:{fontSize:14,fontWeight:'bold'},
        top:5,
        bottom:5
    });
    titleRow.add(label);
    con.UI.tableView.appendRow(titleRow);

    //resultだけフォーカスしたら戻る
    win.addEventListener('focus', function(e){
        win.showNavBar();
        win.title = L('tab_name_inquiry');
        con.loadInquiry();
    });
};