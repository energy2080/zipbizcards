Alloy.CFG.drawer = $.drawer;
Alloy.CFG.nav = $.getView();

function showLeftMenu(e) {
	Alloy.Globals.crux.navigator.toggleLeftMenu();
}

function addCard(e) {

	Titanium.Media.openPhotoGallery({
		success : function(e) {
			if (e.mediaType === Titanium.Media.MEDIA_TYPE_PHOTO) {		
				Alloy.Globals.crux.navigator.open("editor", {
					card : e.media
				});
			}
		},
		error : function(e) {
			alert("Error. Try again");
		},
		cancel : function(e) {

		},
		mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO]

	});

}

Alloy.CFG.nav.open();
