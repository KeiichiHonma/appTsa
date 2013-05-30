exports.exec = function(json,tid){
    var platform_width = Ti.Platform.displayCaps.platformWidth;
    var platform_height = Ti.Platform.displayCaps.platformHeight;
    
    var win = Titanium.UI.currentWindow;
    win.orientationModes = [Ti.UI.PORTRAIT];
    win.backgroundColor = '#000000';
    var images = new Array();
    for(var i = 0; i< json['images'].length; i++) {
        if(setting.os == 'ipad'){
            var judge_width = 768;
            var slash_int = 1;
        }else{
            if(con.isRetina4Inch()){
                var judge_width = 640;
                var slash_int = 2;
            }else{
                var judge_width = 320;
                var slash_int = 1;
            }
        }

        
        if(json['images'][i]['col_width'] > judge_width){
            //var width = 320;
            var width = judge_width;
        }else{
            var width = json['images'][i]['col_width'] / slash_int;
        }
        var create_image = Ti.UI.createImageView({
            image: setting.tsa_url + json['images'][i]['path'],
            width : width,
            hires: true
        });
        images[i] = create_image;
    }



    // 上記のviewを配列としてviewsプロパティに引き渡します。
    var scrollView = Titanium.UI.createScrollableView({
        views: images,
        showPagingControl: true,
        pagingControlHeight: 30,
        maxZoomScale: 2.0
    });
    // スクロールビューを配置する
    Titanium.UI.currentWindow.add(scrollView);
};