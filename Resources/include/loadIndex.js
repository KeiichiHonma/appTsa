exports.exec = function(json,isHeader){
    // データをクリア
    con.UI.tableView.data = [];
    
    if(isHeader){
        var campaign_title = L('campaign_spring');
        var campaign_header = L('campaign_spring') + L('campaign_end_string');

        //ヘッダ画像////////////////////////////////////////
        var row = Ti.UI.createTableViewRow({
            height:130,
            hasChild:false
        });
        row.add(cu.createWrapImageView('img/header.jpg',320,130));
        con.UI.tableView.appendRow(row);
        
        //キャンペーン画像////////////////////////////////////////
        var row = Ti.UI.createTableViewRow({
            url: 'campaign.js',
            height:30,
            hasChild:true,
            // Extended
            ext : {
                rowTitle : campaign_title,
                //"rule-name" : ["hoge", "piyo"]
            }
        });
        row.add(cu.createWrapImageView('img/campaign.jpg',320,30));
        row.add( cu.createTitleLabel(campaign_header,'#990000','auto','auto',5,80) );
        con.UI.tableView.appendRow(row);
    }
    //campaign
    for(var i = 0; i< json.length; i++) {
        var row = Ti.UI.createTableViewRow({
            height:60,
            hasDetail:true,
            url: 'detail.js',
            // Extended
            ext : {
                tid : json[i].col_tid,
                //"rule-name" : ["hoge", "piyo"]
            }
        });

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

    if(!isHeader){
        //var tv_dynamic = require('include/table_view_dynamic_scroll.js');

        function tv_dynamic(tableView) {
        /*    var win = Ti.UI.createWindow();
            
            var data = [];
            var lastRow = 10;
            for (var c=0;c<lastRow;c++)
            {
                data[c] = {title:"Row "+(c+1)};
            }
            
            var tableView = Ti.UI.createTableView({
                data: data
            });
            
            win.add(tableView);*/
            
            var navActInd = Titanium.UI.createActivityIndicator();
            win.setRightNavButton(navActInd);
            
            var updating = false;
            var loadingRow = Ti.UI.createTableViewRow({title:"Loading..."});
            
            function beginUpdate()
            {
                updating = true;
                navActInd.show();
            
                tableView.appendRow(loadingRow);
            
                // just mock out the reload
                setTimeout(endUpdate,2000);
            }
            
            function endUpdate()
            {
                updating = false;
            
                tableView.deleteRow(lastRow,{animationStyle:Titanium.UI.iPhone.RowAnimationStyle.NONE});

        var url = tsa_url + '/json/type/condition/special/campaign';
        con.callAPI('GET', url, null, function(status, responseText) {
            // 受け取ったJSONデータをパース
            var json = JSON.parse(responseText);
            var loadIndex = require("include/loadIndex");
            loadIndex.exec(json,isHeader);
        });

                // simulate loading
                for (var c=lastRow;c<lastRow+10;c++)
                {
                    tableView.appendRow({title:"Row "+(c+1)},{animationStyle:Titanium.UI.iPhone.RowAnimationStyle.NONE});
                }
                lastRow += 10;
            
                // just scroll down a bit to the new rows to bring them into view
                tableView.scrollToIndex(lastRow-9,{animated:true,position:Ti.UI.iPhone.TableViewScrollPosition.BOTTOM});
            
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
            
                    if (!updating && (total >= nearEnd))
                    {
                        beginUpdate();
                    }
                }
                lastDistance = distance;
            });
            return win;
        };
        tv_dynamic(con.UI.tableView);
    }
};