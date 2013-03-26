exports.exec = function(json,tid){
    var platform_width = Ti.Platform.displayCaps.platformWidth;
    var platform_height = Ti.Platform.displayCaps.platformHeight;
    
    var win = Titanium.UI.currentWindow;
    //win.title = L('property_slideshow_title');
    var images = new Array();
    for(var i = 0; i< json['images'].length; i++) {
        if(json['images'][i]['col_width'] > 320){
            var width = 320;
        }else{
            var width = json['images'][i]['col_width'];
        }
        var create_image = Ti.UI.createImageView({
            image: tsa_url + json['images'][i]['path'],
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