// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
// Alloy.CFG.drawer = $.drawer;
Alloy.CFG.nav = $.nav;
Alloy.CFG.drawer = $.drawer;

function showLeftMenu(e) {
	Alloy.CFG.drawer['toggleLeftWindow']();
}

var f,
    dir;
function addCard(folder) {
	Ti.API.info("$$ " + folder);
	dir = Ti.Filesystem.getFile(Ti.Filesystem.applicationSupportDirectory, folder);
	f = Ti.Filesystem.getFile(dir.nativePath, folder + ".jpg");
	Ti.API.info("** " + f.nativePath);
	var img = Ti.UI.createImageView({
		top : 5,
		width : Ti.UI.FILL,
		height : Ti.UI.SIZE,
		image : f.nativePath
	});
	Ti.API.info(folder);
	$.scrlView.add(img);
}

function openEditor(e) {
	// Alloy.Globals.crux.navigator.open("editor");
	Alloy.CFG.nav.openWindow(Alloy.createController("editor", {
		cb : refreshList
	}).getView());
}

function refreshList() {
	
	$.scrlView.removeAllChildren();
	for (var i = 0; i < Alloy.Globals.cards.length; i++) {
		Ti.API.info(">> " + Alloy.Globals.cards[i]);
		addCard(Alloy.Globals.cards[i]);
	}

}

function showalert() {

}

refreshList();
