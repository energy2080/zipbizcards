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

	dir = Ti.Filesystem.getFile(Ti.Filesystem.applicationSupportDirectory, folder);
	f = Ti.Filesystem.getFile(dir.nativePath, folder + ".jpg");

	var img = Ti.UI.createImageView({
		top : 5,
		width : Ti.UI.FILL,
		height : Ti.UI.SIZE,
		image : f.nativePath
	});
	img.addEventListener("click", function(e) {
		Alloy.Globals.db.open();

		Alloy.CFG.nav.openWindow(Alloy.createController("editor", {
			cb : refreshList,
			id : folder,
			details : Alloy.Globals.db.getCard(folder)
		}).getView());
		Alloy.Globals.db.close();
	});
	$.scrlView.add(img);
}

function openEditor(e) {
	// Alloy.Globals.crux.navigator.open("editor");
	Alloy.CFG.nav.openWindow(Alloy.createController("editor", {
		cb : refreshList,		
	}).getView());
}

function refreshList() {

	$.scrlView.removeAllChildren();
	for (var i = 0; i < Alloy.Globals.cards.length; i++) {
		
		addCard(Alloy.Globals.cards[i]);
	}

}

function showalert() {

}

refreshList();
