// add once support;
exports.once = function(event, callback) {
	exports.on(event, c = function(e) {
		exports.off(event, c);
		callback(e);
	});
};

// get some events in there - experimental
_.extend(exports, Backbone.Events);

// export main objects
exports.navigator = {};
// navigator object

// constants
exports.SLIDEMENU_PUSH = 1;
exports.SLIDEMENU_COVER = 2;

// save to globals
if (!Alloy.Globals.crux) {
	Alloy.Globals.crux = exports;
}

// setup vars
var menu,
    currentController,
    slideMenuStyle = exports.SLIDEMENU_COVER,
    slideMenuSpeed = 400,
    defaultMenuWidth = 225,
    defaultWindow,
    rootWindow,
    rootView,
    menuWindow,
    resets = {},
    device = {
	height : OS_IOS ? Ti.Platform.displayCaps.getPlatformHeight() : (Ti.Platform.displayCaps.getPlatformHeight() / (Ti.Platform.displayCaps.dpi / 160)),
	width : OS_IOS ? Ti.Platform.displayCaps.getPlatformWidth() : (Ti.Platform.displayCaps.getPlatformWidth() / (Ti.Platform.displayCaps.dpi / 160))
};

exports.device = device;
// device info

Alloy.Globals.device = device;
Alloy.Globals.jobBoxWidth = OS_IOS ? 290 : device.width - 30;

// helpers
var util = {
	log : function(message) {
		console.log("::CRUX:: " + message);
	},
	isString : function(object) {
		return typeof object == "string";
	},
	isView : function(object) {
		return object.getApiName() == "Ti.UI.View" || object.getApiName() == "Ti.UI.ScrollView";
	},
	isWindow : function(object) {
		return object.getApiName() == "Ti.UI.Window";
	},
	isTabGroup : function(object) {
		return object.getApiName() == "Ti.UI.TabGroup";
	},
	isNavWindow : function(object) {
		return object.getApiName() == "Ti.UI.iOS.NavigationWindow";
	}
};

// loads a controller, either takes a string e.g. "home" or an object
// if you want to pass additional arguments to the controller
function getController(nameOrController, args) {
	Ti.API.info("getController @@@ " + nameOrController);
	// if it's a controller, return it
	try {
		if (nameOrController.__iamalloy) {
			return nameOrController;
		};
	} catch(e) {

	}

	// otherwise create the controller instance
	var c = Alloy.createController(nameOrController, args);

	// if it's a required view we need to get the subView.
	if (c.getView().UI) {
		c = c.getView();
	}

	return c;
}

exports.navigator.openWindow = function(nameOrControllerOrView, args) {

	currentController = getController(nameOrControllerOrView, args);
	currentController.getView().open();

	return currentController;
}
// intercept Tab Group creation
exports.createTabGroup = function(args) {
	rootWindow = Ti.UI.createTabGroup(args);

	// rewrite the navigator.open function to use the TabGroup
	exports.navigator.openWindow = function(nameOrControllerOrView, args) {
		if (exports.hideOpenMenu) {
			exports.hideOpenMenu();
		}

		util.log("Opening in a Tab");

		if (OS_IOS) {
			if (util.isWindow(nameOrControllerOrView)) {
				rootWindow.activeTab.openWindow(nameOrControllerOrView)
			} else {
				rootWindow.activeTab.openWindow(getController(nameOrControllerOrView, args).getView());
			}
		} else {
			getController(nameOrControllerOrView, args).getView().open();
		}

	}

	return rootWindow;
};

// intercept Navigation Window creation
exports.createNavigationWindow = function(args) {

	if (OS_IOS) {
		rootWindow = Ti.UI.iOS.createNavigationWindow(args);
		rootWindow.clipMode = Ti.UI.iOS.CLIP_MODE_DISABLED;
	} else {
		rootWindow = Ti.UI.createWindow(args.window);
	}

	exports.navigator.openWindow = function(nameOrControllerOrView, args) {
		if (exports.hideOpenMenu) {
			exports.hideOpenMenu();
		}

		util.log("Opening in a Nav Window");
		rootWindow.openWindow(getController(nameOrControllerOrView, args).getView());
	}

	return rootWindow;
};

// Button override allowing for a "padding" option
exports.createButton = function(args) {

	if (args.padding) {
		// hacktastic ;)
		args.title = "   " + args.title + "   ";
	}

	return Ti.UI.createButton(args);
};

// change the animationType
exports.setSlideMenuStyle = function(value) {
	value == (exports.SLIDEMENU_PUSH || exports.SLIDEMENU_COVER) ? slideMenuStyle = value : slideMenuStyle = exports.SLIDEMENU_COVER;
};

// set the speed of the animation
exports.setSlideMenuSpeed = function(value) {
	slideMenuSpeed = value || slideMenuSpeed;
};

exports.close = function() {

	if (currentController) {
		util.log("::CRUX:: Cleaning up controller: " + currentController.__controllerPath);

		if ( typeof currentController.cleanUp === "function") {
			currentController.cleanUp();
		}
		if (util.isWindow(currentController.getView())) {
			currentController.getView().close();
		} else {
			// remove the current controller from the global view
			if (currentController.getView().parent) {
				currentController.getView().parent.remove(currentController.getView());
			}
		}

		// destroy everything!
		currentController.off();
		currentController.destroy();
		currentController = null;
	}
};

// create some new functions if we're using the SlideMenu tag
exports.createRootView = function(args) {

	if (args.src) {
		rootView = getController(args.src).getView();
		rootView.applyProperties(args);
	} else {
		rootView = Ti.UI.createView(args);
	}

	// if it's a required view we need to get the subView.
	if (rootView.UI) {
		rootView = rootView.getView();
	}

	return rootView;
};

// rewrite the navigator.open function to use the TabGroup
exports.navigator.open = function(nameOrControllerOrView, args) {
	//setTimeout(function() {

	// create a controller instance
	var newController = getController(nameOrControllerOrView, args);

	util.log("Opening a " + newController.getView().getApiName());

	// if it's a window / tabgroup / navigtion window, open it
	if (util.isWindow(newController.getView()) || util.isNavWindow(newController.getView()) || util.isTabGroup(newController.getView())) {

		newController.getView().open();

	} else {

		//if (util.isWindow(newController.getView()) && rootWindow && (util.isNavWindow(rootWindow) || util.isTabGroup(rootWindow))) {

		//  exports.navigator.openWindow(newController);

		//} else {

		// if not then it's a view, so we need to add
		// it to our rootWindow

		if (rootView || rootWindow) {

			(rootView || rootWindow).add(newController.getView());

		} else {

			newController.getView().open();
		}

		exports.close();
		//}
	}

	// reassign the currentcontroller to the new one
	currentController = newController;

	exports.trigger("open", {
		controller : newController,
		view : newController.getView()
	});

	newController = null;

	// return it for any triggers / followups
	return currentController;

	//}, slideMenuSpeed);
};

exports.createSlideMenu = function(args) {

	exports.hideOpenMenu = hideOpenMenu;

	exports.createLeftMenu = function(args) {

		if (args.src) {
			menu.leftMenu = getController(args.src).getView();

		} else {
			menu.leftMenu = Ti.UI.createView();
		}

		// if it's a required view we need to get the subView.
		if (menu.leftMenu.UI) {
			menu.leftMenu = menu.leftMenu.getView();
		}

		if (slideMenuStyle == exports.SLIDEMENU_COVER) {
			menu.leftMenu.width = menu.leftMenu.width || defaultMenuWidth;
		}

		menu.leftMenu.left = 0;
		menu.leftMenu.visible = false;

		return menu.leftMenu;
	};

	exports.createRightMenu = function(args) {

		if (args.src) {
			menu.rightMenu = getController(args.src).getView();

		} else {
			menu.rightMenu = Ti.UI.createView();
		}

		if (menu.rightMenu.UI) {
			menu.rightMenu = menu.rightMenu.getView();
		}

		menu.rightMenu.left = device.width - 100;
		menu.rightMenu.setVisible(false);

		return menu.rightMenu;
	};

	exports.createBottomMenu = function(args) {

		if (args.src) {
			menu.bottomMenu = getController(args.src).getView();

		} else {
			menu.bottomMenu = Ti.UI.createView();
		}

		if (menu.bottomMenu.UI) {
			menu.bottomMenu = menu.bottomMenu.getView();
		}

		menu.bottomMenu.top = device.height;
		menu.bottomMenu.setVisible(false);

		return menu.bottomMenu;
	};

	exports.createTopMenu = function(args) {

		if (args.src) {
			menu.topMenu = getController(args.src).getView();

		} else {
			menu.topMenu = Ti.UI.createView();
		}

		if (menu.topMenu.UI) {
			menu.topMenu = menu.topMenu.getView();
		}

		menu.topMenu.top = 0;
		menu.topMenu.setVisible(false);

		return menu.topMenu;
	};

	// we have to return a view to Alloy
	menu = Ti.UI.createView(args);

	// if we're using a root Window on iOS then we need
	// to have a window underneath to host the menu views
	if (OS_IOS) {
		menuWindow = Ti.UI.createWindow({
			backgroundColor : "#555"
		});

		// open it, it'll appear UNDER the root window
		menuWindow.open();
	}

	menu.applyProperties({
		visible : false,
	});

	if (slideMenuStyle == exports.SLIDEMENU_COVER) {
		menu.setZIndex(1000);
	}

	menu.addEventListener("postlayout", postlayout = function() {

		// only run this once on startup
		menu.removeEventListener("postlayout", postlayout);

		menu.setVisible(true);

		if (rootWindow && slideMenuStyle == exports.SLIDEMENU_COVER) {
			[menu.leftMenu, menu.rightMenu, menu.bottomMenu, menu.topMenu].forEach(function(menuView) {
				if (menuView) {
					rootWindow.add(menuView);
				}
			});
		} else {

			[menu.leftMenu, menu.rightMenu, menu.bottomMenu, menu.topMenu].forEach(function(menuView) {
				if (OS_IOS && rootWindow) {
					menuWindow.add(menuView);
				}
			});
		}

		exports.slideMenu = menu;

	});

	function hideAllMenus() {
		menu.leftMenu && menu.leftMenu.setVisible(false);
		menu.rightMenu && menu.rightMenu.setVisible(false);
		menu.bottomMenu && menu.bottomMenu.setVisible(false);
		menu.topMenu && menu.topMenu.setVisible(false);
	}

	function showRightMenu() {

		if (!menu.rightMenu) {
			throw "No RightSlideMenu defined!";
			return;
		}

		hideAllMenus();

		menu.rightMenu.setVisible(true);

		if (slideMenuStyle == exports.SLIDEMENU_PUSH) {

			menu.rightMenu.left = null;
			menu.rightMenu.right = 0;
			menu.rightMenu.width = menu.rightMenu.width || device.width - 50;
			menu.rightMenu.opacity = 1;

			var anim = {
				left : -(menu.rightMenu.width == Ti.UI.FILL ? menu.rightMenu.width = defaultMenuWidth : menu.rightMenu.width || defaultMenuWidth),
				width : device.width,
				duration : slideMenuSpeed
			};

			if (rootWindow) {
				rootWindow.animate(anim);
			} else {
				rootView.animate(anim);
			}

		}

		if (slideMenuStyle == exports.SLIDEMENU_COVER) {

			menu.rightMenu.applyProperties({
				left : device.width,
				width : menu.rightMenu.width == Ti.UI.FILL ? menu.rightMenu.width = defaultMenuWidth : menu.rightMenu.width || defaultMenuWidth
			});

			menu.rightMenu.animate({
				left : device.width - (menu.rightMenu.width),
				duration : slideMenuSpeed
			});
		}

		menu.menuOpen = true;
		menu.openedMenu = "right";

		menu.rightMenu.addEventListener("click", open = function(e) {
			menu.rightMenu.removeEventListener("click", open);
			hideOpenMenu();
		});
	}

	function showLeftMenu() {
		Ti.API.info("$$$$$$$$$$$$ !menu.leftMenu $$$$$$$$$$$$" + !menu.leftMenu);
		if (!menu.leftMenu) {
			throw "No left SlideMenu is defined";
			return;
		}

		util.log("opening left menu");
		
		menu.rightMenu && menu.rightMenu.setVisible(false);
		menu.leftMenu && menu.leftMenu.setVisible(true);

		if (slideMenuStyle == exports.SLIDEMENU_PUSH) {

			var anim = {
				left : menu.leftMenu.width == Ti.UI.FILL ? menu.leftMenu.width = defaultMenuWidth : menu.leftMenu.width || defaultMenuWidth,
				width : device.width,
				duration : slideMenuSpeed
			};

			if (rootWindow) {
				rootWindow.animate(anim);
			} else {
				rootView.animate(anim);
			}

		}

		if (slideMenuStyle == exports.SLIDEMENU_COVER) {

			menu.leftMenu.applyProperties({
				left : 0 - device.width,
				width : menu.leftMenu.width == Ti.UI.FILL ? menu.leftMenu.width = defaultMenuWidth : menu.leftMenu.width || defaultMenuWidth
			});
			Ti.API.info("MENU $$$$$$$$$ " + JSON.stringify(menu.leftMenu));
			menu.leftMenu.animate({
				left : 0,
				duration : slideMenuSpeed
			});
		}

		menu.menuOpen = true;
		menu.openedMenu = "left";

		menu.leftMenu.addEventListener("click", open = function(e) {
			menu.leftMenu.removeEventListener("click", open);
			hideOpenMenu();
		});
	}

	function showTopMenu() {

		if (!menu.bottomMenu) {
			throw "No Top SlideMenu is defined";
			return;
		}

		util.log("opening top menu");

		menu.topMenu && menu.topMenu.setVisible(true);
		menu.bottomMenu && menu.bottomMenu.setVisible(false);
		menu.leftMenu && menu.leftMenu.setVisible(false);
		menu.rightMenu && menu.rightMenu.setVisible(false);

		if (slideMenuStyle == exports.SLIDEMENU_PUSH) {

			menu.topMenu.setTop(0);

			if (rootWindow) {
				rootWindow.setTop(1);
			} else {
				rootView.setTop(1);
			}

			var anim = {
				top : device.height - 20,
				height : device.height,
				duration : slideMenuSpeed
			};

			if (rootWindow) {
				rootWindow.animate(anim);
			} else {
				rootView.animate(anim);
			}

		}

		if (slideMenuStyle == exports.SLIDEMENU_COVER) {

			menu.topMenu.applyProperties({
				top : 0 - device.height,
				bottom : null,
				height : device.height,
				width : menu.topMenu.width
			});

			menu.topMenu.animate({
				top : 0,
				duration : slideMenuSpeed
			});
		}

		menu.menuOpen = true;
		menu.openedMenu = "top";

		menu.topMenu.addEventListener("click", open = function(e) {
			menu.topMenu.removeEventListener("click", open);
			hideOpenMenu();
		});
	}

	function showBottomMenu() {

		if (!menu.bottomMenu) {
			throw "No top SlideMenu is defined";
			return;
		}

		util.log("opening top menu");

		menu.bottomMenu && menu.bottomMenu.setVisible(true);
		menu.leftMenu && menu.leftMenu.setVisible(false);
		menu.rightMenu && menu.rightMenu.setVisible(false);

		if (slideMenuStyle == exports.SLIDEMENU_PUSH) {

			menu.bottomMenu.setTop(0);

			if (rootWindow) {
				rootWindow.setBottom(1);
			} else {
				rootView.setBottom(1);
			}

			var anim = {
				top : 20 - device.height,
				height : device.height,
				duration : slideMenuSpeed
			};

			if (rootWindow) {
				rootWindow.animate(anim);
			} else {
				rootView.animate(anim);
			}

		}

		if (slideMenuStyle == exports.SLIDEMENU_COVER) {

			menu.bottomMenu.applyProperties({
				top : device.height - 1,
				width : menu.bottomMenu.width
			});

			menu.bottomMenu.animate({
				top : 0,
				duration : slideMenuSpeed
			});
		}

		menu.menuOpen = true;
		menu.openedMenu = "bottom";

		menu.bottomMenu.addEventListener("click", open = function(e) {
			menu.bottomMenu.removeEventListener("click", open);
			hideOpenMenu();
		});
	}

	function hideOpenMenu() {
		if (slideMenuStyle == exports.SLIDEMENU_PUSH) {

			var anim = {
				left : 0,
				top : 0,
				duration : slideMenuSpeed
			};

			if (rootWindow) {
				rootWindow.animate(anim, hideAllMenus);
			} else {
				rootView.animate(anim, hideAllMenus);
			}
		}

		if (slideMenuStyle == exports.SLIDEMENU_COVER) {
			if (menu.openedMenu == "left") {
				menu.leftMenu.animate({
					left : 0 - device.width,
					duration : slideMenuSpeed
				});
			}

			if (menu.openedMenu == "right") {
				menu.rightMenu.animate({
					left : device.width,
					duration : slideMenuSpeed
				});
			}

			if (menu.openedMenu == "top") {
				menu.topMenu.animate({
					top : 0 - device.height,
					duration : slideMenuSpeed
				});
			}

			if (menu.openedMenu == "bottom") {
				menu.bottomMenu.animate({
					top : device.height,
					duration : slideMenuSpeed
				});
			}
		}

		menu.menuOpen = false;
		menu.openedMenu = null;

	}


	exports.navigator.toggleBottomMenu = function() {
		if (!menu.menuOpen) {
			showBottomMenu();
		} else {
			hideOpenMenu();
		}
	};

	exports.navigator.toggleTopMenu = function() {
		if (!menu.menuOpen) {
			showTopMenu();
		} else {
			hideOpenMenu();
		}
	};

	exports.navigator.toggleLeftMenu = function() {
		Ti.API.info("$$$$$$$$$$$$ toggleLeftMenu $$$$$$$$$$$$");
		if (!menu.menuOpen) {
			Ti.API.info("$$$$$$$$$$$$ !menu.menuOpen $$$$$$$$$$$$");
			showLeftMenu();
		} else {
			Ti.API.info("$$$$$$$$$$$$ menu.menuOpen $$$$$$$$$$$$");
			hideOpenMenu();
		}
	};

	exports.navigator.toggleRightMenu = function() {

		if (!menu.menuOpen) {
			showRightMenu();
		} else {
			hideOpenMenu();
		}
	};

	menu.hideMenu = function(i) {
		hideOpenMenu();
	};

	menu.showLeftMenu = function(i) {
		showLeftMenu();
	};

	menu.showRightMenu = function() {
		showRightMenu();
	};

	return menu;
};

// progress indicator
exports.showActivity = function(text, parent) {

	if (rootWindow) {
		parent = rootWindow;
	}

	var loadingIndicator,
	    blockerView;

	exports.hideActivity = function() {
		clearTimeout(timer);

		if (loadingIndicator) {
			loadingIndicator.hide();
			parent.remove(loadingIndicator);
			parent.remove(blockerView);
			blockerView = null;
			loadingIndicator = null;
		}
	};

	var timer = setTimeout(function() {

		blockerView = Ti.UI.createView({
			width : Ti.UI.FILL,
			height : Ti.UI.FILL,
			backgroundColor : "#000",
			opacity : 0.5,
			zIndex : 1000
		});

		loadingIndicator = Ti.UI.createActivityIndicator({
			color : "#fff",
			width : 150,
			height : 50,
			font : {
				fontSize : OS_IOS ? 14 : 16,
				fontFamily : OS_IOS ? "HelveticaNeue-light" : "helvetica",
				fontWeight : OS_IOS ? "light" : "normal"
			},
			borderRadius : 8,
			backgroundColor : OS_IOS ? "transparent" : "#333",
			message : " " + (text || "Processing"),
			style : OS_ANDROID ? Ti.UI.ActivityIndicatorStyle.DARK : null,
			zIndex : 10000
		});

		parent.add(blockerView);
		parent.add(loadingIndicator);

		loadingIndicator.show();

	}, 10);

};
