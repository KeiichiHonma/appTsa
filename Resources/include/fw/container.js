// container.js
Titanium.include('createUI.js');
Titanium.include('define.js');

var con = {};
var tsa_url = 'http://tsa.hades.corp.813.co.jp';
//var tsa_url = 'http://tsa.813.co.jp';
(function() {
    // UI関連
    con.UI = {};
    // 本体となるTableViewはここで宣言しておく。
    //con.UI.tableView = Titanium.UI.createTableView({separatorColor:'NONE'});
    con.UI.tableView = Titanium.UI.createTableView();

    con.isRetina4Inch = function() {
      return Ti.Platform.displayCaps.platformHeight == 568;
    };

    con.loadList = function(isIndex,isCampaign,isFirst,conditions) {
        var url = tsa_url + '/json/type/condition/special/campaign';
        con.callAPI('GET', url, null, function(status, responseText) {
            // 受け取ったJSONデータをパース
            var json = JSON.parse(responseText);
            var loadList = require("include/ui/makeList");
            loadList.exec(json,isIndex,isCampaign,isFirst,conditions);
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
        
        //if(conditions.dimensions != '') encode_url['dimensions'] = encodeURIComponent(conditions.dimensions);
        //if(conditions.features != '') encode_url['features'] = encodeURIComponent(conditions.features);
        return setParameter(encode_url);
    }
    
    con.loadSearch = function(isIndex,isCampaign,isFirst,conditions) {
        var query_string = con.getCondition(conditions);
        var url = tsa_url + '/json/search?' + query_string;
        con.callAPI('GET', url, null, function(status, responseText) {
            // 受け取ったJSONデータをパース
            var json = JSON.parse(responseText);
            var loadList = require("include/ui/makeList");
            loadList.exec(json,isIndex,isCampaign,isFirst,conditions);
        });
    };

    //保存リストの物件一覧
    con.loadSave = function() {
        //save
        var db = Ti.Database.open(db_setting.table_save);
        db.execute('create table if not exists ' + db_setting.table_save + ' (tid integer)');
        
        var rows = db.execute('select rowid,* from ' + db_setting.table_save);
        if( rows.getRowCount() == 0){
            //var save_text = L('save_list_not_message');
            con.UI.tableView.separatorColor = '#ffffff';
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
            if(tids != '') encode_url = encode_url + encodeURIComponent(tids);
            
            var save_text = L('save_list_message');
            var url = tsa_url + '/json/save?tids=' + encode_url;
            con.callAPI('GET', url, null, function(status, responseText) {
                // 受け取ったJSONデータをパース
                var json = JSON.parse(responseText);
                var loadSave = require("include/ui/makeSave");
                loadSave.exec(json);
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
/*
            var loadResult = require("include/ui/makeResult");
            loadResult.exec();
*/
            //Ti.API.info(3);

            var loadHelp = require("include/ui/makeHelp");
            loadHelp.exec();

        }else{
            //パラメータ生成
            var tids = '';
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
                var loadInquiry = require("include/ui/makeInquiry");
                loadInquiry.exec(tids);
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
/*
                //save delete
                var db = Ti.Database.open(db_setting.table_save);
                db.execute('create table if not exists ' + db_setting.table_save + ' (tid integer)');
                var rows = db.execute('select rowid,* from ' + db_setting.table_save);
*/
                var loadResult = require("include/ui/makeResult");
                loadResult.exec(params);
            }else{
                
            }
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

    // 単独Tweet表示Windowを生成する。
/*    con.UI.createTweetWindow = function(thisTweet) {
        // 新しいWindowを生成し、現在のTabにぶら下げて表示
        var newWindow = Ti.UI.createWindow({
            title: 'Tweet',
            backgroundColor: '#fff'
        });
        // 上部のUser情報表示
        newWindow.add((function() {
            var view = Titanium.UI.createView({
                top:0,
                height:80,
                backgroundColor: '#ccc'
            });
            view.add(Titanium.UI.createImageView({
                image: thisTweet.user.profile_image_url,
                top:8,
                left:8,
                width:64,
                height:64,
                hires: true
            }));
            view.add(Titanium.UI.createLabel({
                top:8,
                left:80,
                right:8,
                height:'auto',
                text: thisTweet.user.name
            }));
            view.add(Titanium.UI.createLabel({
                top:30,
                left:80,
                height:'auto',
                text: '@' + thisTweet.user.screen_name,
                font: {
                    fontSize:12
                }
            }));
            view.add(Titanium.UI.createLabel({
                bottom:8,
                left:80,
                height:'auto',
                text: thisTweet.user.url,
                font: {
                    fontSize:11
                }
            }));
            return view;
        })());
        // 下段のTweet表示
        newWindow.add((function() {
            var webView = Titanium.UI.createWebView({
                top:80
            });
            webView.html = '<html><body style="padding:8px"><div>' + thisTweet.text + '</div>' +
            ' <div>' + String.formatDate(new Date(thisTweet.created_at), "long") + " " +
            String.formatTime(new Date(thisTweet.created_at)) + '</div></body></html>' ;
            return webView;
        })());
        // 右Navigationもしくはメニューとしてアクション表示
        var url = 'http://twitter.com/' + thisTweet.user.screen_name + '/status/' + thisTweet.id_str;
        if(Titanium.Platform.osname === 'android') {
            newWindow.addEventListener('open', function() {
                var intent = Titanium.Android.createIntent({
                    action: Titanium.Android.ACTION_SEND,
                    type: "text/plain"
                });
                intent.putExtra(Titanium.Android.EXTRA_TEXT, url);
                Titanium.Android.currentActivity.startActivity(Titanium.Android.createIntentChooser(intent, "Choose App"));
            });
        } else {
            newWindow.rightNavButton = (function() {
                var button = Titanium.UI.createButton({
                    systemButton: Titanium.UI.iPhone.SystemButton.ACTION
                });
                button.addEventListener('click', function() {
                    con.UI.showOptionDialog(thisTweet, url);
                });
                return button;
            })();
        }
        return newWindow;
    };*/

/*    // iPhone向けオプションダイアログの表示を行う。
    con.UI.showOptionDialog = function(tweet, url) {
        // 選択ダイアログの生成
        var dialog = Titanium.UI.createOptionDialog({
            // タイトル（プロンプト）
            title: '処理を選択してください。',
            // ボタンの配置（ちなみに配列なので0オリジンでindexをもつ）
            // ボタンの配置
            options: ["Safari","Twitter for iPhone","E-mail","Read it Later","キャンセル"],
            // キャンセルボタンは見た目を変えることができます。
            cancel: 4
        });

        // ボタン選択時の処理はイベントハンドラを記述します。
        dialog.addEventListener('click', function(e) {
            // キャンセル時はe.cancel === trueとなる
            if(e.cancel === true) {
                return;
            }
            // ボタン選択時挙動
            if(e.index == 0) {
                Titanium.Platform.openURL(url);
            } else if(e.index == 1) {
                Titanium.Platform.openURL('twitter:' + url);
            } else if(e.index === 2) {
                (function() {
                    var emailDialog = Titanium.UI.createEmailDialog();
                    // 題名の初期値をセットします
                    emailDialog.subject = 'Twitter';
                    // 本文の初期値をセットします。
                    emailDialog.messageBody = tweet.text + "\n" + url;
                    // ダイアログを開く
                    emailDialog.open();
                })();
            } else if(e.index === 3) {
                var apiUrl = 'https://readitlaterlist.com/v2/add';
                var ril_username = Titanium.App.Properties.getString('ril_username', null);
                var ril_password = Titanium.App.Properties.getString('ril_password', null);
                if(ril_username == null || ril_password == null) {
                    // 未設定時の入力を促す。
                    alert('Read It Laterのアカウント設定をしてください。');
                    Titanium.UI.currentTabGroup.setActiveTab(3);
                    return;
                }
                var apiParams = {
                    apikey:   '【Reat it LaterのAPIキー】',
                    username: ril_username,
                    password: ril_password,
                    url:      url
                };
                con.callAPI('GET', apiUrl, apiParams, function(status, responseText) {
                    if(status == 200) {
                        alert("登録しました。");
                    }
                });
            }
        });
        dialog.show();
    };*/
    // 個々のTableViewRowを生成する
/*    con.UI.createTableViewRow = function(tweet) {
        var row = Titanium.UI.createTableViewRow();
        row.height = 180;
        //alert(tweet.col_building);
        //Ti.API.info(tweet.col_building);
        row.add(Titanium.UI.createLabel({
            //text: tweet.user.screen_name,
            text: tweet.col_building,
            top: 8,
            left: 64,
            height: 16
        }));
        row.add(Titanium.UI.createLabel({
            //text: tweet.text,
            text: tweet.col_catch_phrase,
            top: 32,
            left: 64,
            width: 256,
            height: 'auto'
        }));
        row.add(Titanium.UI.createImageView({
            //image: tweet.user.profile_image_url,
            image: tsa_url + tweet.path,
            top:8,
            left:8,
            width:48,
            height:48,
            hires: true
        }));
        row.tweet = tweet;
        row.addEventListener('click', function(e) {
            // 新しいWindowを生成し、現在のTabにぶら下げて表示
            var thisTweet = e.rowData.tweet;
            Titanium.UI.currentTab.open(
            con.UI.createTweetWindow(thisTweet)
            );
        });
        return row;
    };*/
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