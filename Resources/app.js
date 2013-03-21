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
        url: 'tab1.js',
        navBarHidden: true
    })
});

// 2番目のタブの定義
var tab2 = Titanium.UI.createTab({
    icon: 'img/icon_search.png',
    title: L('tab_name_search'),
    window: Titanium.UI.createWindow({
        title: L('tab_name_search'),
        backgroundColor: '#fff',
        url: 'tab2.js'
    })
});

// 3番目のタブの定義
var tab3 = Titanium.UI.createTab({
    icon: 'img/icon_star.png',
    title: L('tab_name_save'),
    window: Titanium.UI.createWindow({
        title: L('tab_name_save'),
        backgroundColor: '#fff',
        url: 'tab3.js'
    })
});

// 4番目のタブの定義
var tab4 =  Titanium.UI.createTab({
    icon: 'img/icon_mail.png',
    title: L('tab_name_contact'),
    window: Titanium.UI.createWindow({
        title: L('tab_name_contact'),
        backgroundColor: '#fff',
        url:'win4.js'
    })
});

// 5目のタブの定義
var tab5 =  Titanium.UI.createTab({
    icon: 'img/icon_information.png',
    title: L('tab_name_info'),
    window: Titanium.UI.createWindow({
        title: L('tab_name_info'),
        backgroundColor: '#fff',
        url: 'win0.js',
        barColor: '#000'
    })
});

// タブを追加しTabGroupを表示する
tabGroup.addTab(tab1);
tabGroup.addTab(tab2);
tabGroup.addTab(tab3);
tabGroup.addTab(tab4);
tabGroup.addTab(tab5);
tabGroup.open();