Alloy.CFG.drawer = $.drawer;
Alloy.CFG.nav = $.getView();

function showLeftMenu(e) {
	Alloy.Globals.crux.navigator.toggleLeftMenu();
}

function addCard(e) {
	Alloy.Globals.crux.navigator.open("editor");
}

if (Alloy.Globals.cards.length) {
	var f,
	    dir;
	for (var i = 0; i < Alloy.Globals.cards.length; i++) {
		dir = Ti.Filesystem.getFile(Ti.Filesystem.applicationSupportDirectory, Alloy.Globals.cards[i]);
		f = Ti.Filesystem.getFile(dir.nativePath, Alloy.Globals.cards[i] + ".jpg");
		var img = Ti.UI.createImageView({
			width : Ti.UI.FILL,
			height : Ti.UI.SIZE,
			image : f.nativePath
		});
		$.scrlView.add(img);
	}
}
Alloy.CFG.nav.open();
