// imageManager.js
var cu = {};
var setting = {
    "section_title_background_color":'#F5F2EC',
    "row_margin_left":10,
    "row_title_width":96,
    "row_title_height":30,
    "row_title_color":'#2f0103',
    "row_title_background_color":'#DCD1BA',
    "row_summary_color":'#222222',
    "row_bg":'img/row_bg.gif',
    "isEn":false,
    };
    
    if(Ti.Platform.locale == 'en'){
        setting.isEn = true;
    }

(function() {
    cu.createWrapImageView = function(image,width,height,top,left) {
        if (top == undefined) top = 0;
        if (left == undefined) left = 0;
        
        var imageWrap = Ti.UI.createView({
            width: width,
            height: height,
            top:top,
            left:left
        });
        //画像配置
        var create_image = Ti.UI.createImageView({
            image: image,
            hires: true
        });
        imageWrap.add(create_image);
        return imageWrap;
    };

    cu.createImageView = function(image,width,height) {
        var create_image = Ti.UI.createImageView({
            image: image,
            width: width,
            height: height,
            top:0,
            left:0,
            hires: true
        });
        return create_image;
    };

    cu.createTitleLabel = function(text,color,width,height,top,left) {
        var label = Ti.UI.createLabel({
            text:text,
            color:color,
            //backgroundColor:'#DCD1BA',
            width:width,
            height:height,
            top:top,
            left:left,
            font:{fontSize:11,fontWeight:'bold', fontFamily:'Arial'},
        });
        return label;
    };

    cu.createSummaryLabel = function(text,color,width,height,top,left) {
        var label = Ti.UI.createLabel({
            text:text,
            color:color,
            backgroundColor:'#ffffff',
            width:width,
            height:height,
            top:top,
            left:left,
            font:{fontSize:11,fontWeight:'normal', fontFamily:'Arial'},
        });
        return label;
    };

    //property_detail
    cu.makePropertySectionRow = function(about_property) {
        var row = Ti.UI.createTableViewRow({
            height:20,
            backgroundColor:setting.section_title_background_color,
            hasChild:false
        });

        var label = Ti.UI.createLabel({
            text:about_property,
            color:'#000000',
            
            font:{fontSize:14,fontWeight:'bold', fontFamily:'Arial'},
        });
        row.add(label);
        return row;
    };

    //property_detail
    cu.makePropertyRow = function(row_title_define,row_data) {
        var row = Ti.UI.createTableViewRow({
            height:'auto',
            backgroundColor:setting.row_title_background_color,
            hasChild:false
        });
        var col_width = setting.row_title_width - setting.row_margin_left;
        var row_title = cu.createTitleLabel(L(row_title_define),setting.row_title_color,col_width,'auto',0,setting.row_margin_left);

        var rowWrap = Ti.UI.createView({
            width: 320 - col_width - 10,
            backgroundColor:'#ffffff',
            height: Ti.UI.SIZE,
            top:0,
            left:setting.row_title_width + 10
        });
        var row_detail = cu.createSummaryLabel(row_data,setting.row_summary_color,320 - col_width - 30,'auto',0,10);
        
        rowWrap.add(row_detail)
        
        row.add(row_title);
        //row.add(row_summary);
        row.add(rowWrap);
        con.UI.tableView.appendRow(row);
    };
})();