exports.exec = function(json,page,isFirst,conditions){
    if(page == 'detail'){
        var type_list = json.similar;
    }else{
        var type_list = json.type;
        if(setting.os == 'ipad'){
            setting.list_row_height = 150;
            setting.list_property_height = 30;
            setting.list_area_height = 30;
            setting.list_summety_height = 90;
        }
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
        if(page == 'detail'){
            //title////////////////////////////////////////////////////////////////////////////
            var titleRow = Ti.UI.createTableViewRow({
                height:30,
                touchEnabled : false,
                backgroundColor:setting.row_title_background_color,
                selectionStyle : Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
                hasChild:false
            });

            var label = Ti.UI.createLabel({
                text:L('property_similar_title'),
                color:setting.row_title_color,
                font:{fontSize:14,fontWeight:'bold'},
                top:5,
                bottom:5
            });
            titleRow.add(label);
            con.UI.tableView.appendRow(titleRow);
        }
        
        for(var i = 0; i< type_list.length; i++) {
            var num = i;
            if(page != 'detail') {
                var row_height = setting.list_row_height;
                var row = Ti.UI.createTableViewRow({
                    height:row_height,
                    hasDetail:true,
                    url: 'detail.js',
                    // Extended
                    ext : {
                        tid : type_list[i].col_tid
                    }
                });
            }else{
                var row_height = setting.similar_face_height;
                var row = Ti.UI.createTableViewRow({
                    height:row_height,
                    hasDetail:false
                });
            }

            //画像配置
            row.add(cu.createImageView(tsa_url + type_list[i].path,row_height,row_height));

            //メインタイトル
            if(setting.isEn){
                var property_name_text = type_list[i].col_type_e + ' - ' + type_list[i].col_building_e;
                if(page != 'detail') var area_name_text = type_list[i].col_area_e;
                if(page == 'campaign'){
                    var summary_text = type_list[i].col_rent_cost_e;
                }else{
                    var summary_text = type_list[i].col_rent_cost_e + ' / ' + type_list[i].col_size + '㎡';
                }
                
            }else{
                var property_name_text =  type_list[i].col_type + ' - ' + type_list[i].col_building;
                if(page != 'detail') var area_name_text =type_list[i].col_area;
                if(page == 'campaign'){
                    var summary_text = type_list[i].col_rent_cost;
                }else{
                    var summary_text = type_list[i].col_rent_cost + ' / ' + type_list[i].col_size + '㎡';
                }
            }
            var property_name = cu.createTitleBoldLabel(property_name_text,setting.row_summary_color,'auto',setting.list_property_height,0,row_height + 5);
            row.add(property_name);

            if(page != 'detail') {
                var area_name = cu.createTitleBoldLabel(area_name_text,setting.row_summary_color,'auto',setting.list_area_height,setting.list_property_height,row_height + 5);
                row.add(area_name);
            }

            //説明文
            if(page != 'detail') {
                var property_summary_position = setting.list_property_height + setting.list_area_height;
            }else{
                var property_summary_position = setting.list_property_height;
            }
            var property_summary = cu.createSummaryBoldLabel(summary_text,setting.row_summary_bold_color,'auto',setting.list_summety_height,property_summary_position,row_height + 5);
            
            //osでフォント変更
            if(page != 'detail' && setting.os == 'ipad'){
                property_name.font = {fontSize:22};
                property_summary.font = {fontSize:18,fontWeight:'bold'};
                if(page != 'detail') {
                    area_name.font = {fontSize:18};
                }
                
            }else{
                property_summary.font = {fontSize:12,fontWeight:'bold'};
            }
            
            
            row.add(property_summary);
            if(page == 'detail'){
                row.add(cu.makeSaveProperty(type_list[i].col_tid,'similar'));
                
                var detail_button = Ti.UI.createButton({
                  backgroundImage:'img/detail_btn_' + setting.lang_string + '.png',
                  color:'#ffffff',
                  width:100,
                  height:35,
                  top:45,
                  right:10
                  });

                detail_button.addEventListener('click', function(e){
                    Ti.UI.currentTab.open(
                        Ti.UI.createWindow({
                            title: L('tab_name_info'),
                            url: "detail.js",
                            navBarHidden: false,
                            barColor: setting.bar_color,
                            // Extended
                            ext : {
                                tid : type_list[num].col_tid
                            }
                        })
                    );
                });
                row.add(detail_button);
            }
            
            
            con.UI.tableView.appendRow(row);
            if(page != 'detail') {
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
        }
        
        //ボタンビューの高さ分を上に上げる
        if(page == 'detail') {
            var row = Ti.UI.createTableViewRow({
                height:setting.btn_view_height,
                hasDetail:false
            });
            con.UI.tableView.appendRow(row);
        }
        
        if(page == 'index'){
            //もっと見る////////////////////////////////////////
            var row = Ti.UI.createTableViewRow({
                title:L('campaign_more_title'),
                backgroundColor:setting.row_title_background_color,
                url: 'campaign.js',
                height:40,
                hasChild:true,
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
                hasChild:false,
                backgroundColor:setting.row_title_background_color,
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