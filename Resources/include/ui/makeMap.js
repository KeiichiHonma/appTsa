var win = Titanium.UI.currentWindow;
win.title = "Map";
//win.backgroundColor = "#000000";

//map
geocoding = require('include/fw/geocoding').Geocoding();
geocoding.forward({
    address: win.ext.address,
    language: Ti.Platform.locale,
    success: function(e){
        e.results.forEach(function(result){
            //Ti.API.info(result.latitude + ', ' + result.longitude);

            // ピンの作成
            var pin = Ti.Map.createAnnotation({
                latitude: result.latitude,
                longitude: result.longitude,
                title: win.ext.property_name,
                animate: true
            });

            var map = Ti.Map.createView({
                // map形式の指定
                mapType: Ti.Map.STANDARD_TYPE,
                // 初期表示場所設定（緯度／経度）
                region: {latitude:result.latitude, // 緯度
                        longitude:result.longitude, // 経度
                        latitudeDelta:0.01,// 表示範囲
                        longitudeDelta:0.01},// 表示範囲
                        
                animate: true,
                regionFit: true, // 画面にFitさせるか
/*                width: 320,
                height: 200,*/
                // ピンの設定
                annotations: [pin]
            });
            //map.selectAnnotation(pin);//pinの選択状態。見難いので非表示
            map.zoom(1);
            win.add(map);
            //var mapRow = Ti.UI.createTableViewRow({
                //hasChild:false
            //});
            //mapRow.add(map);
            //con.UI.tableView.appendRow(mapRow);

        });
    },
    error: function(e){
        //Ti.API.info(e);
    }
});