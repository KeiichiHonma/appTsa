// container.js
Titanium.include('createUI.js');
Titanium.include('define.js');

var con = {};
//var tsa_url = 'http://tsa.hades.corp.813.co.jp';
var tsa_url = 'http://tsa.813.co.jp';
(function() {
    // UI関連
    con.UI = {};
    // 本体となるTableViewはここで宣言しておく。
    //con.UI.tableView = Titanium.UI.createTableView({separatorColor:'NONE'});
    con.UI.tableView = Titanium.UI.createTableView();

    con.isRetina4Inch = function() {
      return Ti.Platform.displayCaps.platformHeight == 568;
    };

    con.loadBigFaceCampaign = function(page,isFirst,conditions) {
        var url = tsa_url + '/json/type/condition/special/campaign';
        con.callAPI('GET', url, null, function(status, responseText) {
            // 受け取ったJSONデータをパース
            var json = JSON.parse(responseText);
            var makeList = require("include/ui/makeBigFaceList");
            makeList.exec(json,page,isFirst,conditions);
        });
    };

    con.loadCampaign = function(page,isFirst,conditions) {
        var url = tsa_url + '/json/type/condition/special/campaign';
        con.callAPI('GET', url, null, function(status, responseText) {
            // 受け取ったJSONデータをパース
            var json = JSON.parse(responseText);
            var makeList = require("include/ui/makeList");
            makeList.exec(json,page,isFirst,conditions);
        });
    };

    con.loadCondition = function() {
        var loadCondition = require("include/ui/makeCondition");
        loadCondition.exec();
    };

    con.getCondition = function(conditions) {
        var encode_url = [];

        if(conditions.budgets.length > 0){
            encode_url['budgets'] = encodeURIComponent(conditions.budgets);
        }

        if(conditions.maps.length > 0){
            encode_url['maps'] = encodeURIComponent(conditions.maps);
        }
        return setParameter(encode_url);
    }
    
    con.loadSearch = function(page,isFirst,conditions) {
        var query_string = con.getCondition(conditions);
        var url = tsa_url + '/json/search?' + query_string;
        con.callAPI('GET', url, null, function(status, responseText) {
            // 受け取ったJSONデータをパース
            var json = JSON.parse(responseText);
            var makeList = require("include/ui/makeList");
            makeList.exec(json,page,isFirst,conditions);
        });
    };

    //物件詳細
    con.loadProperty = function(tid) {
        var url = tsa_url + '/json/detail/tid/' + tid;
        con.callAPI('GET', url, null, function(status, responseText) {
            // 受け取ったJSONデータをパース
            var json = JSON.parse(responseText);
            var loadProperty = require("include/ui/makeProperty");
            loadProperty.exec(json,tid);
            //similar
            var makeList = require("include/ui/makeList");
            makeList.exec(json,'detail',true,false);

        });
    };

    //slideshow
    con.loadSlideshow = function(tid) {
        var url = tsa_url + '/json/images/tid/' + tid;
        con.callAPI('GET', url, null, function(status, responseText) {
            // 受け取ったJSONデータをパース
            var json = JSON.parse(responseText);
            var loadSlideshow = require("include/ui/makeSlideshow");
            //loadProperty.exec(con,cu,json);
            loadSlideshow.exec(json,tid);
        });
    };

    //保存リストの物件一覧
    con.loadSave = function() {
        //save
        var db = Ti.Database.open(db_setting.table_save);
        db.execute('create table if not exists ' + db_setting.table_save + ' (tid integer)');
        
        var rows = db.execute('select rowid,* from ' + db_setting.table_save);
        if( rows.getRowCount() == 0){
            con.UI.tableView.separatorColor = '#ffffff';
            var makeHelp = require("include/ui/makeHelp");
            makeHelp.exec();
        }else{
            //パラメータ生成
            var tids = '';
            var encode_url = '';
            var toPutComma = false;
            while(rows.isValidRow()){
                if ( toPutComma ) {
                    tids = tids + ',';
                } else {
                    toPutComma = true;
                }
                tids = tids + rows.fieldByName('tid');
                rows.next();
            }
            if(tids != '') encode_url = encode_url + encodeURIComponent(tids);
            
            var save_text = L('save_list_message');
            var url = tsa_url + '/json/save?tids=' + encode_url;
            con.callAPI('GET', url, null, function(status, responseText) {
                // 受け取ったJSONデータをパース
                var json = JSON.parse(responseText);
                if(json.save_list.length > 0){
                    var makeSave = require("include/ui/makeSave");
                    makeSave.exec(json);
                }else{
                    //古いセーブデータのため、物件の停止で有効な物件を取得できなかった。そのため、記録してあったセーブデータを削除
                    var db = Ti.Database.open(db_setting.table_save);
                    db.execute('create table if not exists ' + db_setting.table_save + ' (tid integer)');
                    db.execute('begin transaction');
                    db.execute("delete from " + db_setting.table_save + " where tid > '0' ");
                    db.execute('commit');
                    db.close();
                    var rows = db.execute('select rowid,* from ' + db_setting.table_save);
                    var loadHelp = require("include/ui/makeHelp");
                    loadHelp.exec();
                }

            });
        }
    };

    //コンタクト
    con.loadInquiry = function() {

        //save
        var db = Ti.Database.open(db_setting.table_save);
        db.execute('create table if not exists ' + db_setting.table_save + ' (tid integer)');
        
        var rows = db.execute('select rowid,* from ' + db_setting.table_save);
        if( rows.getRowCount() == 0){
            var loadHelp = require("include/ui/makeHelp");
            loadHelp.exec();
        }else{
            //パラメータ生成
            var tids = '';
            var encode_url = '';
            var toPutComma = false;
            while(rows.isValidRow()){
                if ( toPutComma ) {
                    tids = tids + ',';
                } else {
                    toPutComma = true;
                }
                tids = tids + rows.fieldByName('tid');
                rows.next();
            }
            if(tids != ''){
                //昔のセーブデータの可能性があるため、念のため確認。後nearlyの物件取得
                encode_url = encode_url + encodeURIComponent(tids);
                var url = tsa_url + '/json/save?tids=' + encode_url;
                con.callAPI('GET', url, null, function(status, responseText) {
                    // 受け取ったJSONデータをパース
                    var json = JSON.parse(responseText);
                    if(json.save_list.length > 0){
                        
                        var loadInquiry = require("include/ui/makeInquiry");
                        loadInquiry.exec(tids,json);
                    }else{
                        //古いセーブデータのため、物件の停止で有効な物件を取得できなかった。そのため、記録してあったセーブデータを削除
                        var db = Ti.Database.open(db_setting.table_save);
                        db.execute('create table if not exists ' + db_setting.table_save + ' (tid integer)');
                        db.execute('begin transaction');
                        db.execute("delete from " + db_setting.table_save + " where tid > '0' ");
                        db.execute('commit');
                        db.close();
                        var rows = db.execute('select rowid,* from ' + db_setting.table_save);
                        var loadHelp = require("include/ui/makeHelp");
                        loadHelp.exec();
                    }
                });
            }else{
                var loadHelp = require("include/ui/makeHelp");
                loadHelp.exec();
            }
        }
    };

    con.loadConfirm = function(params) {
        var loadConfirm = require("include/ui/makeConfirm");
        loadConfirm.exec(params);
    };

    //コンタクト結果
    con.loadResult = function(params) {
        var url = tsa_url + '/json/inquiry';
        con.callAPI('POST', url, params, function(status, responseText) {
            if(responseText == "success"){
                
                //if(!setting.isDebug){
                    //save delete
                    var db = Ti.Database.open(db_setting.table_save);
                    db.execute('create table if not exists ' + db_setting.table_save + ' (tid integer)');
                    db.execute('begin transaction');
                    db.execute("delete from " + db_setting.table_save + " where tid > '0' ");
                    db.execute('commit');
                    db.close();
                    var rows = db.execute('select rowid,* from ' + db_setting.table_save);
                //}
                var loadResult = require("include/ui/makeResult");
                loadResult.exec();
            }else{
                
            }
        });

    };

    // プラットフォーム依存部を場合分けで記述する
    con.UI.setRefreshButton = function(callback) {
        // Android環境か否かの判定
        if(Titanium.Platform.osname === 'android') {
            var activity = Titanium.Android.currentActivity;
            if(activity) {
                activity.onCreateOptionsMenu = function(e) {
                    var menu = e.menu;
                    var menuItem = menu.add({
                        title: "再読込"
                    });
                    menuItem.setIcon("dark_refresh.png");
                    menuItem.addEventListener("click", function(e) {
                        callback();
                    });
                };
            }
        } else {
            // (iOS) ウィンドウの右上のボタンを設定します
            
            var rightButton = Titanium.UI.createButton({
                systemButton: Titanium.UI.iPhone.SystemButton.REFRESH
            });
            Titanium.UI.currentWindow.rightNavButton = rightButton;
            rightButton.addEventListener('click', function() {
                callback();
            });
        }
    };
    // TwitterAPIを非同期で呼び出す
    con.callAPI = function(method, url, params, callbackOnLoad) {
        // ネットワークが使用できないときはエラーメッセージを表示する
        if(Titanium.Network.online == false) {
            // エラー表示
            alert('オフラインなのでデータを取得できません。');
            return;
        }
        // HTTPClientオブジェクトを生成します。
        var xhr = Titanium.Network.createHTTPClient();
        xhr.open(method, url, false);
        // レスポンスを受け取るイベント(非同期に実行される)
        xhr.onload = function() {
            callbackOnLoad(xhr.status, xhr.responseText);
        };
        // エラー発生時のイベント
        xhr.onerror = function(error) {
            // errorにはエラー事由の文字列オブジェクトが入ってくる。
            alert(error);
        };
        // リクエスト送信します。
        if(params) {
            xhr.send(params);
        } else {
            xhr.send();
        }
    };

// Query String から 配列を返す
function getParameter(str){
    var dec = decodeURIComponent;
    var par = new Array, itm;
    if(typeof(str) == 'undefined') return par;
    if(str.indexOf('?', 0) > -1) str = str.split('?')[1];
    str = str.split('&');
    for(var i = 0; str.length > i; i++){
        itm = str[i].split("=");
        if(itm[0] != ''){
            par[itm[0]] = typeof(itm[1]) == 'undefined' ? true : dec(itm[1]);
        }
    }
    return par;
}
// 配列 から Query Stringを返す
function setParameter(par){
    var enc = encodeURIComponent;
    var str = '', amp = '';
    if(!par) return '';
    for(var i in par){
        str = str + amp + i + "=" + enc(par[i]);
        amp = '&'
    }
    return str;
}
})();