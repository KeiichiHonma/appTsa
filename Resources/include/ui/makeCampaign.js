exports.exec = function(json,isIndex,isFirst){
    // データをクリア
    //if(!isIndex) con.UI.tableView.data = [];
    //var index = 0;
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
        for(var i = 0; i< json.type.length; i++) {
            var row = Ti.UI.createTableViewRow({
                //index:index,
                height:60,
                hasDetail:true,
                url: 'detail.js',
                // Extended
                ext : {
                    tid : json.type[i].col_tid,
                    //"rule-name" : ["hoge", "piyo"]
                }
            });
            //Ti.API.info(index);
            //index = index + 1;
            //画像配置
            row.add(cu.createImageView(setting.tsa_url + json.type[i].path,60,60));

            //メインタイトル
            if(setting.isEn){
                var main_text = json.type[i].col_building_e + ' / ' + json.type[i].col_type_e + ' / ' + json.type[i].col_area_e;
                var summary_text = json.type[i].col_campaign_title_e;
            }else{
                var main_text = json.type[i].col_building + ' / ' + json.type[i].col_type + ' / ' + json.type[i].col_area;
                var summary_text = json.type[i].col_campaign_title;
            }
            
            var property_title = cu.createTitleLabel(main_text,'#6f5b37','auto',30,0,70);
            row.add(property_title);

            //説明文
            var property_summary = cu.createSummaryLabel(summary_text,'#222222','auto',30,30,70);
            row.add(property_summary);
            con.UI.tableView.appendRow(row);
        }

    }

    function tv_dynamic(tableView) {

        var actInd = Titanium.UI.createActivityIndicator({
          //top:50,
          top:'50%',
          height:55,
          //width:'auto',
          width:200,
          opacity:0.6,
          color:'#FFFFFF',
          backgroundColor:'#000',
          borderRadius:5,
          borderColor:'#000',
          font:{sfontSize:13},
          message:L('loading_title'),
          style:Titanium.UI.iPhone.ActivityIndicatorStyle.PLAIN
        });

        //var navActInd = Titanium.UI.createActivityIndicator();
        //win.setRightNavButton(navActInd);
        win.add(actInd);
        
        var updating = false;
        var stop = false;
        //var loadingRow = Ti.UI.createTableViewRow({title:L('loading_title')});
        
        function beginUpdate()
        {
            updating = true;
            actInd.show();
        
            //tableView.appendRow(loadingRow);
        
            // just mock out the reload
            setTimeout(endUpdate,2000);
        };
        
        function endUpdate()
        {
            updating = false;
        
            //tableView.deleteRow(lastRow,{animationStyle:Titanium.UI.iPhone.RowAnimationStyle.NONE});
            sp = sp + sp_plus;
            //Ti.API.info(sp);
 
            if(json.count >= sp){
                //Ti.API.info(sp);
                //Ti.API.info(json.count);

                var url = setting.tsa_url + '/json/type/condition/special/campaign/sp/' + sp;
                con.callAPI('GET', url, null, function(status, responseText) {
                    stop = true;
                    
                    // 受け取ったJSONデータをパース
                    var json = JSON.parse(responseText);
                    add_campaign(json);
                    
                    lastRow += 10;
                    con.UI.tableView.scrollToIndex(lastRow-9,{animated:true,position:Ti.UI.iPhone.TableViewScrollPosition.BOTTOM});
                    stop = false;
                });
                actInd.hide();
            }else{
                stop = true;
                actInd.hide();
            }
        }
        
        var lastDistance = 0; // calculate location to determine direction
        
        tableView.addEventListener('scroll',function(e)
        {
            if(!stop){
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
                    //var nearEnd = theEnd * .75;
                    var nearEnd = theEnd;
            
                    if (!updating && (total >= nearEnd))
                    {
                        beginUpdate();
                    }
                }
                lastDistance = distance;
            }
        });
        return win;
    };
};