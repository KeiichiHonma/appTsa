var win = Titanium.UI.currentWindow;
win.orientationModes = [Ti.UI.PORTRAIT];
// ライブラリの読み込み
Titanium.include('include/fw/container.js');
privacy_url = 'http://www.serviced-apartments-tokyo.com/' + setting.lang_string + '/privacypolicy';
company_url = 'http://www.serviced-apartments-tokyo.com/' + setting.lang_string + '/corp';

var inputData = [
    //{title:L('info_request_title'),hasChild:true},
    //{title:'row 1', header:'Header 1'},
    {title:L('info_privacy_policy_title'),url:privacy_url,hasChild:true, header:' '},
    {title:L('info_company_title'),url:company_url,hasChild:true},
    {title:L('info_version_title'),hasChild:false,selectionStyle : Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE}
];
//con.UI.tableView = Titanium.UI.createTableView();
con.UI.tableView.scrollable = false;
if (Ti.Platform.osname !== 'mobileweb') {
    con.UI.tableView.style = Titanium.UI.iPhone.TableViewStyle.GROUPED;
}

con.UI.tableView.data = inputData;

win.add(con.UI.tableView);

con.UI.tableView.addEventListener('click', function(e) {
    if(e.rowData.hasChild){
        var confirm = Titanium.UI.createAlertDialog({
            title: e.rowData.url,
            message: L('open_browser_title'),
            buttonNames: [L('no'),L('yes')]
        });

        confirm.addEventListener('click', function(conEvt) {
            if(conEvt.index === 1){
                //open our uploaded image in safari
                Ti.Platform.openURL(e.rowData.url);
            }
        });
        confirm.show();
    }
});