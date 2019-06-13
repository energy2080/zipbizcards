// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args,
    preView,
    font = {
	index : 0,
	title : Alloy.Globals.fonts[0].title
},
    fName = Alloy.Globals.fonts[font.index].style[0],
    color = "#fff";

var Draggable = require('ti.draggable');
$.lblFontName.text = font.title;
$.lblFontStyle.text = Alloy.Globals.fontStyle[font.title][0];

function addDetails(dic) {
	Ti.API.info(dic);
	var dview = Draggable.createView({
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE
	});
	var lbl = Ti.UI.createLabel({
		text : dic.text,
		font : dic.font,
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE,
		touchEnabled : false,
		color : dic.color
	});

	dview.add(lbl);
	$.card.add(dview);
}

function action(e) {
	if (preView) {
		preView.backgroundColor = "transparent";
	}
	$.viewBackColor.visible = false;
	$.viewText.visible = false;
	$.viewImages.visible = false;

	switch(e.source.index) {
	case 0:
		$.viewBackColor.visible = true;
		break;
	case 1:
		$.viewText.visible = true;
		break;
	case 2 :
		$.viewImages.visible = true;
		break;
	}
	e.source.backgroundColor = "#B1B1B1";
	preView = e.source;

	$.viewTools.width = "26%";
	$.viewCard.left = "40%";
}

function hideTools() {
	$.viewTools.width = "0";
	$.viewCard.left = "12%";
	if (preView) {
		preView.backgroundColor = "transparent";
	}
}

function add(photo) {
	var img = Ti.UI.createImageView({
		top : 10,
		left : "5%",
		width : "45%",
		height : Ti.UI.SIZE,
		image : photo
	});
	$.scrlImages.add(img);
}

function openGallery() {
	Ti.Media.openPhotoGallery({
		success : function(e) {
			add(e.media);
		},
		cancel : function(e) {

		},
		error : function(e) {
		},
		allowEditing : true
	});
}

function openCamera() {
	Titanium.Media.showCamera({

		success : function(e) {
			// alert(JSON.stringify(e));
			add(e.media);
		},
		cancel : function() {

		},
		error : function(error) {
			// create alert
			var a = Titanium.UI.createAlertDialog({
				title : 'Camera'
			});

			// set message
			if (error.code == Titanium.Media.NO_CAMERA) {
				a.setMessage('Device does not have camera.');
			}
			// show alert
			a.show();
		},
		allowEditing : true
	});
}

function addImage() {
	var dialog = Ti.UI.createOptionDialog({
		cancel : 2,
		options : ['Choose Photo', 'Take Photo', 'Cancel'],
		destructive : 0
	});
	dialog.addEventListener("click", function(e) {
		if (e.index == 0) {
			openGallery();
		} else if (e.index == 1) {
			openCamera();
		}
	});
	dialog.show();
}

function setTextColor(hex) {
	color = hex;
	$.viewFontColor.backgroundColor = color;
	Ti.API.info("Color : " + color);
}

function setBackColor(color) {
	$.win.backgroundColor = color;
}

function addText() {
	addDetails({
		text : $.txtText.value,
		font : {
			fontFamily : fName,
			fontSize : parseInt($.txtFontSize.value)
		},
		color : color
	});
}

var fontView = Alloy.createController("fontTable");

fontView.on('setFont', function(dic) {
	Ti.API.info("Font : " + dic.title);
	$.lblFontName.text = dic.title;
	font = dic;
	fName = Alloy.Globals.fonts[font.index].style[0];
	$.lblFontStyle.text = Alloy.Globals.fontStyle[font.title][0];
});
var dialogFstyles;
function showStyle() {
	Ti.API.info("Font : " + JSON.stringify(font));
	Ti.API.info("Font Style : " + Alloy.Globals.fontStyle[font.title]);
	dialogFstyles = Ti.UI.createOptionDialog({
		options : Alloy.Globals.fontStyle[font.title],
		cancel : Alloy.Globals.fontStyle[font.title].length - 1,
		title : "Select Font Style"
	});
	dialogFstyles.addEventListener('click', function(e) {
		if (e.index != (Alloy.Globals.fontStyle[font.title].length - 1)) {
			fName = Alloy.Globals.fonts[font.index].style[e.index];
			$.lblFontStyle.text = Alloy.Globals.fontStyle[font.title][e.index];
			Ti.API.info("Font Family : " + fName);
		}

	});
	dialogFstyles.show();
}

function showFont() {

	fontView.showFonts();

}

$.backPicker.setCallback({
	success : setBackColor
});

$.textPicker.setCallback({
	success : setTextColor
});
// $.imgCard.image = args.card;
