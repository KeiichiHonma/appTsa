// ベース色は黒
Titanium.UI.setBackgroundColor('#000');

// TabGroupを作成する
var tabGroup = Titanium.UI.createTabGroup();

// １番目のタブの定義
var tab1 = Titanium.UI.createTab({
    icon: 'img/icon_home.png',
    title: L('tab_name_home'),
    window: Titanium.UI.createWindow({
        title: L('tab_name_home'),
        backgroundColor: '#fff',
        url: 'tab_home.js',
        navBarHidden: true,
        barColor: '#7D715B'
    })
});

// 2番目のタブの定義
var tab2 =  Titanium.UI.createTab({
    icon: 'img/icon_campaign.png',
    title: L('tab_name_campaign'),
    window: Titanium.UI.createWindow({
        title: L('tab_name_campaign'),
        backgroundColor: '#fff',
        url: 'campaign.js',
        barColor: '#7D715B'
    })
});


// 3番目のタブの定義
var tab3 = Titanium.UI.createTab({
    icon: 'img/icon_search.png',
    title: L('tab_name_search'),
    window: Titanium.UI.createWindow({
        title: L('tab_name_search'),
        backgroundColor: '#fff',
        url: 'tab_search.js',
        barColor: '#7D715B'
    })
});

// 4番目のタブの定義
var tab4 = Titanium.UI.createTab({
    icon: 'img/icon_star.png',
    title: L('tab_name_save'),
    window: Titanium.UI.createWindow({
        title: L('tab_name_save'),
        backgroundColor: '#fff',
        url: 'tab_save.js',
        barColor: '#7D715B'
    })
});

// 5番目のタブの定義
var tab5 =  Titanium.UI.createTab({
    icon: 'img/icon_mail.png',
    title: L('tab_name_inquiry'),
    window: Titanium.UI.createWindow({
        title: L('tab_name_inquiry'),
        backgroundColor: '#fff',
        url:'tab_inquiry.js',
        barColor: '#7D715B'
    })
});

Ti.App.addEventListener('button_click', function(e){
    alert('click detected: value = ' + e.arg1)
});
// タブを追加しTabGroupを表示する
tabGroup.addTab(tab1);
tabGroup.addTab(tab2);
tabGroup.addTab(tab3);
tabGroup.addTab(tab4);
tabGroup.addTab(tab5);
tabGroup.open();