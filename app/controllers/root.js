// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

// Alloy.CFG.drawer = $.drawer;
Alloy.CFG.nav = $.nav;
Alloy.CFG.drawer = $.drawer;

function showLeftMenu(e) {
	Alloy.CFG.drawer['toggleLeftWindow']();
}

function deleteRow(e) {

	var row = e.row;
	var rowIndex = e.index;
	var alertYesNo = Titanium.UI.createAlertDialog({
		message : 'Are you sure?',
		buttonNames : ['Yes', 'No']
	});

	alertYesNo.addEventListener('click', function(evt) {
		if (evt.index == 0) {
			Ti.API.info("Card Id : " + row.card_id);
			Alloy.Globals.db.open();
			Alloy.Globals.db.deleteCard(row.card_id);
			Alloy.Globals.db.close();
			Alloy.Globals.cards.splice(rowIndex, 1);
			Ti.App.Properties.setList("cards", Alloy.Globals.cards);
			refreshList();
		} else if (evt.index == 1) {
			/*
			 * Put the row back since it will be removed from the view even if NO is clicked.
			 */
			$.tblView.insertRowBefore(rowIndex, row, {
				animated : true
			});

		}
	});

	alertYesNo.show();

}

var f,
    dir;
function addCard(folder) {

	dir = Ti.Filesystem.getFile(Ti.Filesystem.applicationSupportDirectory, folder);
	f = Ti.Filesystem.getFile(dir.nativePath, folder + ".jpg");
	var row = Ti.UI.createTableViewRow({
		selectedBackgroundColor : "transparent",
		card_id : folder
	});
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
	row.add(img);
	$.tblView.appendRow(row);
	// $.scrlView.add(img);
}

function openEditor(e) {
	// Alloy.Globals.crux.navigator.open("editor");
	Alloy.CFG.nav.openWindow(Alloy.createController("editor", {
		cb : refreshList,
	}).getView());
}

function refreshList() {
	$.tblView.setData([]);
	// $.scrlView.removeAllChildren();
	for (var i = 0; i < Alloy.Globals.cards.length; i++) {

		addCard(Alloy.Globals.cards[i]);
	}

}

function showalert() {

}

refreshList();
