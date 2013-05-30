var win = Titanium.UI.currentWindow;
win.orientationModes = [Ti.UI.PORTRAIT];
// ライブラリの読み込み
Titanium.include('include/fw/container.js');

win.addEventListener('focus', function(e){
    con.loadSave();
});
win.add(con.UI.tableView);