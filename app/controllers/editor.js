// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args,
    preView,
    details,
    baseHeight,
    baseWidth,
    isSaved = false,
    font = {
	index : 0,
	title : Alloy.Globals.fonts[0].title,
	styleIndex : 0
},
    fName = Alloy.Globals.fonts[font.index].style[0],
    color = "#fff",
    folder,
    dir,
    subDir,
    selectedLbl,
    dialogSize,
    size = [],
    rotate = 90;

var Draggable = require('ti.draggable');
$.lblFontName.text = font.title;
$.lblFontStyle.text = Alloy.Globals.fontStyle[font.title][0];

function showFontSize(e) {
	if (!dialogSize) {
		for (var i = 1; i < 51; i++) {
			size[i] = i;
		}
		size.push("Cancel");
		dialogSize = Ti.UI.createOptionDialog({
			options : size,
			cancel : size.length - 1,
			title : "Select Font Size"
		});
		dialogSize.addEventListener('click', function(e) {
			if (e.index != (size.length - 1)) {
				$.lblFontSize.text = size[e.index + 1];
			}

		});
	}

	dialogSize.show();
}

function addDetails(dic) {
	Ti.API.info(dic);
	var dview = Draggable.createView({
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE
	});
	dview.addEventListener("move", function(e) {

		dview.top = e.top;
		dview.left = e.left;
	});
	if (dic.top && dic.left) {
		dview.top = dic.top;
		dview.left = dic.left;
	}
	if (dic.text) {
		var lbl = Ti.UI.createLabel({
			text : dic.text,
			font : dic.font,
			width : Ti.UI.SIZE,
			height : Ti.UI.SIZE,
			// touchEnabled : false,
			color : dic.color,
			_param : dic._param
		});
		lbl.addEventListener("singletap", function(e) {

			if (btnDelete.visible) {
				btnDelete.visible = false;
				$.btnAdd.title = "ADD";
				selectedLbl = null;
				$.txtText.value = "";
			} else {
				$.txtText.value = e.source.text;
				$.lblFontSize.text = e.source.font.fontSize;
				$.textPicker.setColor = e.source.color;

				font = {
					index : e.source._param.fontIndex,
					title : Alloy.Globals.fonts[e.source._param.fontIndex].title,
					styleIndex : e.source._param.styleIndex
				};

				fName = Alloy.Globals.fonts[font.index].style[font.styleIndex];
				color = e.source.color;
				$.viewFontColor.backgroundColor = color;
				$.textPicker.setBackColor(color);

				$.lblFontName.text = Alloy.Globals.fonts[e.source._param.fontIndex].title;
				$.lblFontStyle.text = Alloy.Globals.fontStyle[$.lblFontName.text][e.source._param.styleIndex];

				btnDelete.visible = true;
				$.btnAdd.title = "UPDATE";
				selectedLbl = e.source;
				action({
					source : $.txtTool
				});
			}
		});
		dview.add(lbl);
		var btnDelete = Ti.UI.createButton({
			top : 0,
			right : 0,
			width : 15,
			height : 15,
			backgroundImage : "/images/close.png",
			visible : false
		});
		btnDelete.addEventListener('click', function(e) {
			var dialog = Ti.UI.createAlertDialog({
				title : "Remove",
				message : "Sure to remove this detail?",
				buttonNames : ["No", "Yes"]
			});
			dialog.addEventListener('click', function(e) {
				if (e.index) {
					$.card.remove(dview);
					$.txtText.value = "";
					$.btnAdd.title = "ADD";
					isSaved = false;
				}
			});
			dialog.show();

		});

		dview.add(btnDelete);
	} else {
		var scrlView = Ti.UI.createScrollView({
			width : Ti.UI.SIZE,
			height : Ti.UI.SIZE,
			contentWidth : Ti.UI.SIZE,
			contentHeight : Ti.UI.SIZE,
			minZoomScale : 0.1,
			maxZoomScale : 50,
			zoomScale : dic.zoomScale
		});
		var img = Ti.UI.createImageView({
			width : Ti.UI.SIZE,
			height : Ti.UI.SIZE,
			bubbleParent : false,
			imgIndex : dic.imgIndex ? dic.imgIndex : $.scrlImages.children.length - 1
		});
		// if (args.details) {
		// img.image = Ti.Filesystem.getFile(dic.image).read();
		// } else {
		img.image = dic.image;
		// }
		// img.addEventListener('pinch', function(e) {
		//
		// img.height = baseHeight * e.scale;
		//
		// img.width = baseWidth * e.scale;
		//
		// });
		// img.addEventListener('touchstart', function(e) {
		//
		// // Ti.API.info("Rect :: " + JSON.stringify(img.rect) + " >> " + "Center :: " + JSON.stringify(img.center) + " >> " + "Size :: " + JSON.stringify(img.size) + " >> " + "toImage :: " + JSON.stringify(img.toImage()));
		// Ti.API.info("toImage :: " + img.toImage().height + " , " + img.toImage().width);
		// baseHeight = img.toImage().height;
		//
		// baseWidth = img.toImage().width;
		//
		// });
		img.addEventListener("click", function() {
			Ti.API.info("img : " + imgDelete.visible);
			if (imgDelete.visible) {
				imgDelete.visible = false;
				imgRotate.visible = false;
			} else {
				imgDelete.visible = true;
				imgRotate.visible = true;
			}
			// var dialog = Ti.UI.createAlertDialog({
			// title : "Remove",
			// message : "Sure to remove this detail?",
			// buttonNames : ["No", "Yes"]
			// });
			// dialog.addEventListener('click', function(e) {
			// if (e.index) {
			// dview.remove(scrlView);
			// }
			// });
			// dialog.show();
		});
		// scrlView.addEventListener("pinch", function(e) {
		// Ti.API.info("scale : " + e.scale + " , velocity : " + e.velocity + " , time : " + e.time + " , timeDelta : " + e.timeDelta + " , currentSpan : " + e.currentSpan + " , currentSpanX : " + e.currentSpanX + " , currentSpanY : " + e.currentSpanY + " , previousSpan : " + e.previousSpan + " , previousSpanX : " + e.previousSpanX + " , previousSpanY : " + e.previousSpanY + " , focusX : " + e.focusX + " , focusY : " + e.focusY);
		// });
		scrlView.add(img);

		if (dic.rotate) {
			var matrix = Ti.UI.create2DMatrix({
				rotate : dic.rotate
			});
			var a1 = Ti.UI.createAnimation();
			a1.transform = matrix;
			a1.duration = 100;
			scrlView.animate(a1, function() {

				rotate = dic.rotate;
			});
		}
		dview.add(scrlView);
		var imgDelete = Ti.UI.createImageView({
			top : 5,
			right : 5,
			width : "12%",
			height : Ti.UI.SIZE,
			image : "/images/close.png",
			visible : false
		});
		imgDelete.addEventListener("click", function(e) {
			var dialog = Ti.UI.createAlertDialog({
				title : "Remove",
				message : "Sure to remove this detail?",
				buttonNames : ["No", "Yes"]
			});
			dialog.addEventListener('click', function(e) {
				if (e.index) {
					$.card.remove(dview);
					isSaved = false;
				}
			});
			dialog.show();
		});
		scrlView.add(imgDelete);

		var imgRotate = Ti.UI.createImageView({
			top : 5,
			right : "13%",
			width : "12%",
			height : Ti.UI.SIZE,
			image : "/images/rotate.png",
			visible : false
		});
		imgRotate.addEventListener("click", function(e) {
			var matrix = Ti.UI.create2DMatrix({
				rotate : rotate
			});
			var a1 = Ti.UI.createAnimation();
			a1.transform = matrix;
			a1.duration = 100;
			scrlView.animate(a1, function() {
				scrlView.width = Ti.UI.FILL;
				scrlView.height = Ti.UI.FILL;
				scrlView.rotate = rotate;
				rotate += 90;
				isSaved = false;
			});
		});
		scrlView.add(imgRotate);

		// scrlView.addEventListener("click", function(e) {
		// Ti.API.info("scrollview");
		// if (imgDelete.visible) {
		// imgDelete.visible = false;
		// imgRotate.visible = false;
		// } else {
		// imgDelete.visible = true;
		// imgRotate.visible = true;
		// }
		// });
		//
		// dview.addEventListener("click", function(e) {
		// Ti.API.info("dview");
		// imgDelete.visible = false;
		// imgRotate.visible = false;
		// });

		dview.zIndex = -5555;

	}

	$.card.add(dview);
	isSaved = false;
}

function add(photo) {
	var img = Ti.UI.createImageView({
		top : 10,
		left : "5%",
		width : "45%",
		height : Ti.UI.SIZE,
		image : photo
	});
	img.addEventListener("click", function(e) {
		addDetails({
			image : img.image,
			zoomScale : 0
		});
	});
	$.scrlImages.add(img);
	isSaved = false;
}

if (args.details) {
	Ti.API.info(args.details);
	folder = args.id;
	details = JSON.parse(args.details);
	color = details.parent.backgroundColor;

	$.card.backgroundColor = color;
	$.backPicker.setBackColor(color);

	for (var key in details) {
		if (key != "parent") {
			if (details[key]) {
				addDetails(details[key]);
			}
		}
	}
	dir = Ti.Filesystem.getFile(Ti.Filesystem.applicationSupportDirectory, args.id);
	subDir = Ti.Filesystem.getFile(dir.nativePath, "images");

	var imgs = subDir.getDirectoryListing();

	for (var i = 0; i < imgs.length; i++) {
		add(Ti.Filesystem.getFile(subDir.nativePath, imgs[i]).read());
	}
	isSaved = true;
}

function action(e) {
	if (preView) {
		preView.backgroundColor = "transparent";
	}
	$.viewBackColor.visible = false;
	$.viewText.visible = false;
	$.viewImages.visible = false;
	$.viewPrint.visible = false;

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
	case 3 :
		hideButtons();
		$.imgPreview.image = $.card.toImage();
		$.viewPrint.visible = true;
		break;
	}
	e.source.backgroundColor = "#B1B1B1";
	preView = e.source;
	$.viewTools.visible = true;
}

function hideTools() {
	$.viewTools.visible = false;

	if (preView) {
		preView.backgroundColor = "transparent";
	}
	$.btnAdd.title = "ADD";
	selectedLbl = null;
	$.txtText.value = "";

	// Ti.API.info("Scale : " + $.card.children[0].children[0].zoomScale + " , contentOffset : " + $.card.children[0].children[0].children[0].left + " , " + $.card.children[0].children[0].children[0].top);
}

function hideButtons() {
	Ti.API.info("##################");
	for (var i = 0; i < $.card.children.length; i++) {
		var v = $.card.children[i];
		if (v.children[0].text) {
			v.children[1].visible = false;
		} else {
			v.children[0].children[1].visible = false;
			v.children[0].children[2].visible = false;
		}
	}
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

function addImage() {
	var dialog = Ti.UI.createOptionDialog({
		cancel : 1,
		options : ['Choose Photo', 'Cancel'],
		destructive : 0
	});
	dialog.addEventListener("click", function(e) {
		if (e.index == 0) {
			openGallery();
		}
	});
	dialog.show();
}

function setTextColor(hex) {
	color = hex;
	$.viewFontColor.backgroundColor = color;
	isSaved = false;
	Ti.API.info("Color : " + color);
}

function setBackColor(color) {
	$.card.backgroundColor = color;
	isSaved = false;
}

function addText() {
	if ($.btnAdd.title == "ADD") {
		addDetails({
			text : $.txtText.value,
			font : {
				fontFamily : fName,
				fontSize : parseInt($.lblFontSize.text)
			},
			color : color,
			_param : {
				fontIndex : font.index,
				styleIndex : font.styleIndex
			}
		});
		$.txtText.value = "";
	} else {
		selectedLbl.text = $.txtText.value;
		selectedLbl.font = {
			fontFamily : fName,
			fontSize : parseInt($.lblFontSize.text)
		};
		selectedLbl.color = color;

		selectedLbl._param = {
			fontIndex : font.index,
			styleIndex : font.styleIndex
		};

	}
	hideTools();

}

var fontView = Alloy.createController("fontTable");

fontView.on('setFont', function(dic) {
	Ti.API.info("Font : " + dic.title);
	$.lblFontName.text = dic.title;
	font = dic;
	font.styleIndex = 0;
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
			font.styleIndex = e.index;
			Ti.API.info("Font Family : " + fName);
		}

	});
	dialogFstyles.show();
}

function showFont() {

	fontView.showFonts();

}

function saveCard(cb) {
	hideButtons();
	if (!folder) {
		folder = new Date().getTime();
		dir = Ti.Filesystem.getFile(Ti.Filesystem.applicationSupportDirectory, folder);
		dir.createDirectory();

		Alloy.Globals.cards.push(folder);
		Ti.App.Properties.setList("cards", Alloy.Globals.cards);
		Ti.API.info(Alloy.Globals.cards.push);
		subDir = Ti.Filesystem.getFile(dir.nativePath, "images");
		subDir.createDirectory();
	}
	var f = Ti.Filesystem.getFile(dir.nativePath, folder + ".jpg");
	Ti.API.info(f.write($.card.toImage()));

	var dic = {
		parent : {
			backgroundColor : $.card.backgroundColor
		}
	};
	for (var i = 0; i < $.card.children.length; i++) {
		var v = $.card.children[i];
		// Ti.API.info("Top >> " + v.top + " , Left >> " + v.left);
		dic[i.toString()] = {
			top : v.top,
			left : v.left
		};
		if (v.children[0].text) {
			dic[i.toString()].text = v.children[0].text;
			dic[i.toString()].color = v.children[0].color;
			dic[i.toString()].font = v.children[0].font;
			dic[i.toString()]._param = v.children[0]._param;
		} else {
			dic[i.toString()].rotate = v.children[0].rotate;
			dic[i.toString()].zoomScale = v.children[0].zoomScale;
			dic[i.toString()].imgIndex = v.children[0].children[0].imgIndex.toString();
			dic[i.toString()].image = Ti.Filesystem.getFile(subDir.nativePath, v.children[0].children[0].imgIndex.toString() + ".jpg").nativePath;
		}
	}
	// Ti.API.info(JSON.stringify(dic));
	Alloy.Globals.db.open();
	Alloy.Globals.db.addCard(folder, JSON.stringify(dic));
	Alloy.Globals.db.close();

	args.cb && args.cb();

	var f1;
	if ($.scrlImages.children.length) {
		for (var i = 0; i < $.scrlImages.children.length; i++) {
			f1 = Ti.Filesystem.getFile(subDir.nativePath, i.toString() + ".jpg");
			f1.write($.scrlImages.children[i].image);
			// Ti.API.info("Top >> " + $.scrlImages.children[i].top + " , Left >> " + $.scrlImages.children[i].left);
		}
	}

	isSaved = true;
	cb instanceof Function && cb();
}

$.backPicker.setCallback({
	success : setBackColor
});

$.textPicker.setCallback({
	success : setTextColor
});
function close() {
	// Alloy.Globals.crux.close();
	if (!isSaved) {
		var dialog = Ti.UI.createAlertDialog({
			title : "Save Changes",
			message : "Do you want to save changes?",
			buttonNames : ["Save", "Cancel"]
		});
		dialog.addEventListener('click', function(e) {
			if (e.index == 0) {
				saveCard(function() {
					$.win.close();
				});
			} else {
				$.win.close();
			}
		});
		dialog.show();
		return;
	}
	$.win.close();
}

// $.imgCard.image = args.card;
