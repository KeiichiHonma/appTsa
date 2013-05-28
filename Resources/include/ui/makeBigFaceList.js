exports.exec = function(json,page,isFirst,conditions){
    if(page == 'detail'){
        var type_list = json.similar;
    }else{
        var type_list = json.type;
    }
    if(isFirst){
        var sp = 0;
        var sp_plus = 10;
        var lastRow = 10;
        add_property(type_list);
    }

    if(page != 'index' && page != 'detail'){
        tv_dynamic(con.UI.tableView);
    }

    function add_property(type_list) {
        for(var i = 0; i< type_list.length; i++) {
            var row = Ti.UI.createTableViewRow({
                hasDetail:false,
                url: 'detail.js',
                // Extended
                ext : {
                    tid : type_list[i].col_tid
                }
            });
            //画像配置
            var create_image = Ti.UI.createImageView({
                image: tsa_url + type_list[i].path,
                width: 320,
                top:0,
                left:0,
                hires: false
            });
            row.add(create_image);
            var campaign_view = Titanium.UI.createView({
                bottom:0,
                height:80,
                width:'auto',
                opacity:0.6,
                backgroundColor:'#666666',
            });

            //メインタイトル
            if(setting.isEn){
                var property_name_text = type_list[i].col_building_e;
                var property_info_text = type_list[i].col_type_e + ' / ' + type_list[i].col_size + '㎡' + ' / ' +  type_list[i].col_area_e;
                var summary_text = type_list[i].col_rent_cost_e;
            }else{
                var property_name_text = type_list[i].col_building;
                var property_info_text = type_list[i].col_type + ' / ' + type_list[i].col_size + '㎡' + ' / ' +  type_list[i].col_area;
                var summary_text = type_list[i].col_rent_cost;
            }
            var property_name = Ti.UI.createLabel({
                text:property_name_text,
                color:'#ffffff',
                height:20,
                bottom:55,
                left:10,
                font:{fontSize:16,fontWeight:'normal'}
            });

            var property_info = Ti.UI.createLabel({
                text:property_info_text,
                color:'#ffffff',
                height:20,
                bottom:35,
                left:10,
                //font:{fontSize:17,fontWeight:'normal',fontFamily:'Arial'}
                font:{fontSize:16,fontWeight:'normal'}
            });

            var property_summary = Ti.UI.createLabel({
                text:summary_text,
                //color:'#CC9900',
                color:'#ffffff',
                height:40,
                //bottom:5,
                bottom:0,
                left:10,
                //opacity:1,
                //font:{fontSize:14,fontWeight:'bold',fontFamily:'Helvetica Neue'},
                font:{fontSize:15,fontWeight:'bold'}
            });
            
            row.add(campaign_view);
            row.add(property_name);
            row.add(property_info);
            
            //row.add(campaign_view_second);
            //campaign_view_second.add(property_summary);
            row.add(property_summary);
            
            
            
            con.UI.tableView.appendRow(row);
            row.addEventListener('click', function(e) {
                var newWindow = Titanium.UI.createWindow({
                    title: e.rowData.ext.rowTitle,
                    backgroundColor: '#fff',
                    url: e.rowData.url,
                    navBarHidden: false,
                    barColor: setting.bar_color,
                    // Extended
                    ext : {
                        tid : e.rowData.ext.tid,
                        //"rule-name" : ["hoge", "piyo"]
                    }
                });
                Titanium.UI.currentTab.open(newWindow);
            });
        }
        if(page == 'index'){
            //もっと見る////////////////////////////////////////
            var row = Ti.UI.createTableViewRow({
                title:L('campaign_more_title'),
                url: 'campaign.js',
                height:40,
                hasChild:true,
                backgroundColor:setting.row_title_background_color,
                // Extended
                ext : {
                    rowTitle : L('campaign_spring')
                }
            });
            con.UI.tableView.appendRow(row);
            row.addEventListener('click', function(e) {
                var newWindow = Titanium.UI.createWindow({
                    title: e.rowData.ext.rowTitle,
                    backgroundColor: '#fff',
                    url: e.rowData.url,
                    navBarHidden: false,
                    barColor: setting.bar_color
                });
                Titanium.UI.currentTab.open(newWindow);
            });

            var row = Ti.UI.createTableViewRow({
                backgroundColor:setting.row_title_background_color,
                hasChild:false
            });

            var about_button = Ti.UI.createButton({
              title:L('tsa_about_title'),
              color:'#330000',
              width:300,
              height:35,
              top:10,
              bottom:10,
              opacity:1,
            });
            row.add(about_button);
            con.UI.tableView.appendRow(row);

            about_button.addEventListener('click', function(e) {
                Ti.UI.currentTab.open(
                    Ti.UI.createWindow({
                        title: L('tab_name_info'),
                        url: "tab_info.js",
                        navBarHidden: false,
                        barColor: setting.bar_color
                    })
                );
            });

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
          font:{fontSize:13},
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
            if(json.count >= sp){
                if(page == 'campaign'){
                    var url = tsa_url + '/json/type/condition/special/campaign/sp/' + sp;
                }else{
                    var query_string = con.getCondition(conditions);
                    var url = tsa_url + '/json/search/sp/' + sp + '?' + query_string;
                }
                
                con.callAPI('GET', url, null, function(status, responseText) {
                    stop = true;
                    
                    // 受け取ったJSONデータをパース
                    var json = JSON.parse(responseText);
                    add_property(json.type);
                    
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