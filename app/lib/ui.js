var menu;


exports.createLeftView = function(args) {
	menu.leftView = Alloy.createController(args.src);
	return menu.leftView.getView();
};

exports.createCenterView = function(args) {
	menu.centerView = Alloy.createController(args.src);
	return menu.centerView.getView();
};

exports.createRightView = function(args) {
	menu.rightView = Alloy.createController(args.src);
	return menu.rightView.getView();
};

exports.createSlideMenu = function(args) {

	menu = Ti.UI.createWindow(args);

	menu.applyProperties({
		visible : false,
		width : Ti.Platform.displayCaps.platformWidth,
		backgroundColor : "#555",
	});

	if (args.position == "right") {
		menu.left = null;
		menu.right = 0;

	} else {
		menu.left = 0;
		menu.right = null;

	}

	menu.addEventListener("postlayout", postlayout = function() {

		menu.removeEventListener("postlayout", postlayout);

		var button = Ti.UI.createButton({
			title : "Menu"
		});

		button.addEventListener("click", function(e) {
			menu.toggleMenu();
		});

		menu.centerView.getView().open();

		menu.show();

	});

	//

	function showRightMenu() {

		menu.leftView.getView().hide();
		menu.rightView.getView().show();

		menu.centerView.getView().right = 1;
		menu.centerView.getView().animate({
			left : (menu.width - 50) * -1,
			width : Ti.Platform.displayCaps.platformWidth,
			duration : 300
		});

		menu.menuOpen = true;
		menu.openedMenu = "right";
	}

	function showLeftMenu() {

		menu.rightView.getView().hide();
		menu.leftView.getView().show();

		menu.centerView.getView().animate({
			left : menu.width - 50,
			width : Ti.Platform.displayCaps.platformWidth,
			duration : 300
		});

		menu.menuOpen = true;
		menu.openedMenu = "left";
	}

	function hideMenu() {

		menu.centerView.getView().animate({
			left : 0,
			duration : 300
		});

		menu.menuOpen = false;
		menu.openedMenu = null;

	}


	menu.addEventListener("click", function(e) {
		if (menu.openedMenu == "left") {
			hideMenu();
		}

	});

	menu.toggleLeftMenu = function(i) {
		if (!menu.menuOpen) {
			showLeftMenu();
		} else {
			hideMenu();
		}
	};

	menu.toggleRightMenu = function() {

		if (!menu.menuOpen) {
			showRightMenu();
		} else {
			hideMenu();
		}
	};

	menu.hideMenu = function(i) {
		hideMenu();
	};

	menu.showLeftMenu = function(i) {
		showLeftMenu();
	};

	menu.showRightMenu = function() {
		showRightMenu();
	};

	return menu;
};
