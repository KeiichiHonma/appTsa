var win = Titanium.UI.currentWindow;
win.orientationModes = [Ti.UI.PORTRAIT];
Titanium.include('include/fw/container.js');
con.loadSlideshow(win.ext.tid);