exports.exec = function(json,isIndex,isFirst){
    // データをクリア
    //if(!isIndex) con.UI.tableView.data = [];
    var index = 0;
    if(isFirst){
        var sp = 0;
        var sp_plus = 10;
        var lastRow = 10;
        add_campaign(json);
    }

    if(!isIndex){
        tv_dynamic(con.UI.tableView);
    }

    //campaign
    function add_campaign(json) {
        for(var i = 0; i< json.length; i++) {
            var row = Ti.UI.createTableViewRow({
                index:index,
                height:60,
                hasDetail:true,
                url: 'detail.js',
                // Extended
                ext : {
                    tid : json[i].col_tid,
                    //"rule-name" : ["hoge", "piyo"]
                }
            });
            Ti.API.info(index);
            index = index + 1;
            //画像配置
            row.add(cu.createImageView(tsa_url + json[i].path,60,60));

            //メインタイトル
            if(setting.isEn){
                var main_text = json[i].col_building_e + ' / ' + json[i].col_type_e + ' / ' + json[i].col_area_e;
                var summary_text = json[i].col_campaign_title_e;
            }else{
                var main_text = json[i].col_building + ' / ' + json[i].col_type + ' / ' + json[i].col_area;
                var summary_text = json[i].col_campaign_title;
            }
            
            var property_title = cu.createTitleLabel(main_text,'#6f5b37','auto',30,0,70);
            row.add(property_title);

            //説明文
            var property_summary = cu.createSummaryLabel(summary_text,'#222222','auto',30,30,70);
            row.add(property_summary);
            con.UI.tableView.appendRow(row);
        }
        if(!isIndex){
            var loadingRow = Ti.UI.createTableViewRow({title:L('loading_title')});
            con.UI.tableView.appendRow(loadingRow);
        }
    }

    function tv_dynamic(tableView) {
        var navActInd = Titanium.UI.createActivityIndicator();
        win.setRightNavButton(navActInd);
        
        var updating = false;
        //var loadingRow = Ti.UI.createTableViewRow({title:L('loading_title')});
        
        function beginUpdate()
        {
            updating = true;
            navActInd.show();
        
            //tableView.appendRow(loadingRow);
        
            // just mock out the reload
            setTimeout(endUpdate,2000);
        };
        
        function endUpdate()
        {
            updating = false;
        
            tableView.deleteRow(lastRow,{animationStyle:Titanium.UI.iPhone.RowAnimationStyle.NONE});
            sp = sp + sp_plus;
            //Ti.API.info(sp);
            
            var url = tsa_url + '/json/type/condition/special/campaign/sp/' + sp;
            con.callAPI('GET', url, null, function(status, responseText) {
                // 受け取ったJSONデータをパース
                var json = JSON.parse(responseText);
                add_campaign(json);
                //var loadCampaign = require("include/loadCampaign");
                //loadCampaign.exec(json,false,false);
            });

            // simulate loading
            //for (var c=lastRow;c<lastRow+10;c++)
            //{
                //tableView.appendRow({title:"Row "+(c+1)},{animationStyle:Titanium.UI.iPhone.RowAnimationStyle.NONE});
            //}
            lastRow += 10;
        
            // just scroll down a bit to the new rows to bring them into view
/*
            //動作しない
            //http://dokuwiki.eniblo.org/doku.php/titanium/ui_controls/table_view#scrolltoindex%E3%81%AF%E8%BF%BD%E5%8A%A0%E7%9B%B4%E5%BE%8C%E3%81%AB%E3%81%AF%E4%BD%BF%E3%81%88%E3%81%AA%E3%81%84_ios
            tableView.scrollToIndex(lastRow-5,{animated:true,position:Ti.UI.iPhone.TableViewScrollPosition.BOTTOM});
*/
            //Ti.API.info(lastRow);
            navActInd.hide();
        }
        
        var lastDistance = 0; // calculate location to determine direction
        
        tableView.addEventListener('scroll',function(e)
        {
            var offset = e.contentOffset.y;
            var height = e.size.height;
            var total = offset + height;
            var theEnd = e.contentSize.height;
            var distance = theEnd - total;
        
            // going down is the only time we dynamically load,
            // going up we can safely ignore -- note here that
            // the values will be negative so we do the opposite
            if (distance < lastDistance)
            {
                // adjust the % of rows scrolled before we decide to start fetching
                var nearEnd = theEnd * .75;
                //var nearEnd = theEnd;
        
                if (!updating && (total >= nearEnd))
                {
                    beginUpdate();
                }
            }
            lastDistance = distance;
        });
        return win;
    };
};